import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.schema";
import { User } from "../../models/user.model";
import { checkPassword, hashPassword } from "../../lib/hash";
import jwt from "jsonwebtoken";
import { sendMail } from "../../lib/email";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../../lib/token";

function getAppUrl(){
  return process.env.APP_URL || `http://localhost:${process.env.PORT}`
}

export async function registerHandler(req: Request, res: Response){

  try {

    const result = registerSchema.safeParse(req.body);

    if(!result.success){
      return res.status(400).json({
        message: 'Invalid data!'
      })
    }

     const { name, email, password } = result.data

     const normalizedEmail = email.toLocaleLowerCase().trim();

     const existingUser = await User.findOne({email: normalizedEmail})

     if(existingUser){
        return res.status(409).json({
            message: 'Email is already in use! Please try with a different email'
        })
     }

     const passwordHash = await hashPassword(password);

     const newlyCreatedUser = await User.create({
        email: normalizedEmail,
        passwordHash,
        role: 'user',
        isEmailVerified: false,
        name,
        twoFactorEnabled: false
     })

      // email verification part

      const verifyToken = jwt.sign(
        {
          sub: newlyCreatedUser.id
        },
        process.env.JWT_ACCESS_SECRET!,
        {
          expiresIn: '1d'
        }
      )

      const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verifyToken}`

      await sendMail(newlyCreatedUser.email, "Verify Email",  `<h1>Please verify your email by clicking this link: </h1>
       <p> <a href="${verifyUrl}" > ${verifyUrl} </a> </p> 
        `);

      return res.status(201).json({
        message: "User created",
        user: {
          id: newlyCreatedUser.id,
          email: newlyCreatedUser.email,
          role: newlyCreatedUser.role,
          isEmailVerified: newlyCreatedUser.isEmailVerified
        }
      })  


  } catch (error) {
    console.error('error ',error)
    return res.status(500).json({
      message: 'Internal server error in registerHandler'
    })
  }
}

export async function verifyEmailHandler(req: Request, res: Response){

  const token = req.query.token as string | undefined;

  if(!token){
    return res.status(400).json({
      message: 'verification token is missing'
    })
  }
  try {

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      sub: string;
    }

    const user = await User.findById(payload.sub);

    if(!user){
       return res.status(400).json({
      message: 'user not found'
    })
    }

    if(user.isEmailVerified){
      return res.json({
        message: 'Email is already verified'
      })
    }

    user.isEmailVerified = true;
    await user.save();

    return res.json({
      message: 'Email is verified'
    })

  } catch
   (error) {
    console.error('e ', error, )
    return res.status(500).json({
      message: 'Internal server in verifyEmialHandler'
    })
  }
}

export async function loginHandler(req: Request, res: Response){

  try {
    
    const result = loginSchema.safeParse(req.body);

    if(!result.success){
      return res.status(400).json({
        message: 'Invalid data!'
      })
    }

    const { email, password } = result.data;

    const normalizedEmail = email.toLocaleLowerCase().trim();

    const user = await User.findOne({email: normalizedEmail});

    if(!user){
      return res.status(400).json({
        message: 'Invalid email or password'
      })
    }

    const ok = await checkPassword(password, user.passwordHash);

    if(!ok){
        return res.status(400).json({
        message: 'Invalid email or password'
      })
    }

    if(!user.isEmailVerified){
        return res.status(403).json({
        message: 'please verify your email before logging in...'
      })
    }

    const accessToken = createAccessToken(user.id, user.role, user.tokenVersion);

    const refreshToken = createRefreshToken(user.id, user.tokenVersion);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      message: 'Login successfull',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        twoFactorEnabled: user.twoFactorEnabled
      }
    })

  } catch (error) {
    console.error('error ',error)
    return res.status(500).json({
      message: 'Internal server error in loginHandler'
    })
  }
}

export async function refreshHandler(req: Request, res: Response){

  try {
    
   const token = req.cookies?.refreshToken as string | undefined;

   if(!token){
    return res.status(401).json({
      message: 'Refresh token missing'
    })
   }

   const payload = verifyRefreshToken(token);

   const user = await User.findById(payload.sub);

   if(!user){
    return res.status(401).json({
      message: 'User not found'
    })
   }

   if (user.tokenVersion !== payload.tokenVersion){
      return res.status(401).json({
      message: 'Refresh Token invalidated'
    })
   }

   const newAccessToken = createAccessToken(user.id, user.role, user.tokenVersion);

   const newRefreshToken = createRefreshToken(user.id, user.tokenVersion);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

      return res.status(200).json({
      message: 'Token refreshed',
      accessToken: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        twoFactorEnabled: user.twoFactorEnabled
      }
    })

  } catch (error) {
    console.error('error ',error)
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
}