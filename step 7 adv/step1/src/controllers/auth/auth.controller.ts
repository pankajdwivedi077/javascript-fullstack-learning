import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.schema";
import { User } from "../../models/user.model";
import { checkPassword, hashPassword } from "../../lib/hash";
import jwt from "jsonwebtoken";
import { sendMail } from "../../lib/email";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../../lib/token";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { generateSecret, generate, verify, generateURI, createGuardrails } from "otplib";
import QRCode from "qrcode";

function getAppUrl(){
  return process.env.APP_URL || `http://localhost:${process.env.PORT}`
}

function getGoogleClient(){
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if(!clientId || !clientSecret){
    throw new Error('Google client id and secret both are missing')
  }
  return new OAuth2Client({
    client_id: clientId,
    client_secret : clientSecret,
    redirectUri
  })
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

    const { email, password, twoFactorCode } = result.data;

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

    //
    if(user.twoFactorEnabled){
        if(!twoFactorCode || typeof twoFactorCode !== 'string'){
          return res.status(400).json({
            message: 'Two factor code is required'
          })
        }
        if(!user.twoFactorSecret){
          return res.status(400).json({
            message: 'Two factor misconfigured for this account'
          })
        }
        // verify the code using otplib
        const twoFA = await verify({
        secret: user.twoFactorSecret,
        token: twoFactorCode,
        epochTolerance: 30,
      });
       if (!twoFA.valid) {
     return res.status(400).json({ message: "Invalid two factor code" });
    }

    
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

export async function logoutHandler(req: Request, res: Response){
  res.clearCookie("refreshToken", {path: '/'})
  return res.status(200).json({
    message: 'Logged out'
  })
}

export async function forgotPasswordHandler(req: Request, res: Response){

  const {email} = req.body as {email?: string}

  if(!email){
    return res.status(400).json({
      message: 'email is required'
    })
  }

    const normalizedEmail = email.toLocaleLowerCase().trim();

    try {

      const user = await User.findOne({email: normalizedEmail});

      if(!user){
        return res.json({
          message: 'If an account with this email exists, we will send you a reset link'
        })
      }

      const rawToken = crypto.randomBytes(32).toString('hex');

      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

      user.resetPasswordToken = tokenHash;
      user.resetPasswordExpres = new Date(Date.now() + 15 * 60 * 1000);
      
      await user.save();

      const resetUrl = `${getAppUrl()}/auth/reset-password?token=${rawToken}`;

      await sendMail(
        user.email,
        'Reset your password',
        `
        <p>You requested password reset. Click on the below link to reset the password</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        `
      )

      return res.json({
         message: 'If an account with this email exists, we will send you a reset link'
      })

    } catch (error) {
      console.error('error ',error)
      return res.status(500).json({ message: "Error in forgoutPasswordHandler" });
    }

}

export async function resetPasswordHandler(req: Request, res: Response){

  const { token, password } = req.body as {token?: string; password?: string}

   if(!token){
    return res.status(400).json({
      message: 'reset token is missing'
    })
   }

   if(!password || password.length < 6){
    return res.status(400).json({
      message: 'password must be atleast 6 characters long'
    })
   }

   try {
    
     const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

     const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpres: {$gt: new Date()}
     })

     if(!user){
      return res.status(400).json({
        message: 'Invalid or expired token'
      })
     }

     const newPasswordHash = await hashPassword(password);
     user.passwordHash = newPasswordHash;

     user.resetPasswordToken = undefined;
     user.resetPasswordExpres = undefined;

     user.tokenVersion = user.tokenVersion + 1;

     await user.save();

     return res.json({
      message: 'Password reset successfull'
     })

   } catch (error) {
      console.error('error ',error)
      return res.status(500).json({ message: "Error in resetPasswordHandler" });
   }

}

export async function googleAuthStartHandler(req: Request, res: Response){

  try {
    
   const client = getGoogleClient();

   const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['openid', 'email', 'profile']
   })

   return res.redirect(url);

  } catch (error) {
     console.error('error ',error)
     return res.status(500).json({ message: "Error in googleAuthStartHandler" });
  }
}

export async function googleAuthCallbackHandler(req: Request, res: Response){

  const code = req.query.code as string | undefined;

  if(!code){
    return res.status(400).json({
      message: 'Missing code in callback'
    })
  }

  try {
    
    const client = getGoogleClient();

    const {tokens} = await client.getToken(code)

    if(!tokens.id_token){
      return res.status(400).json({
        message: 'No id_token is present'
      })
    }

    // verify id token and read the user info from it
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID as string
    })

    const payload = ticket.getPayload();

    const email = payload?.email;
    const emailVerified = payload?.email_verified;

    if(!email || !emailVerified){
      return res.status(400).json({
        message: 'Google email account is not verified'
      })
    }

    const normalizedEmail = email.toLocaleLowerCase().trim();

    let user = await User.findOne({email: normalizedEmail});

    if(!user){
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const passwordHash = await hashPassword(randomPassword);

      user = await User.create({
        email: normalizedEmail,
        passwordHash,
        role: 'user',
        isEmailVerified: true,
        twoFactorEnabled: false
      })
    }else{
      if(!user.isEmailVerified){
        user.isEmailVerified = true;
        await user.save()
      }
    }

    const accessToken = createAccessToken(
      user.id,
      user.role as "user" | "admin",
      user.tokenVersion
    )

    const refreshToken = createRefreshToken(
      user.id,
      user.tokenVersion
    )

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({
      message: 'Gooogle login successfull',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    })

  } catch (error) {
     console.error('error ',error)
     return res.status(500).json({ message: "Error in googleAuthCallbackHandler" });
  }
}

export async function twoFASetupHandler(req: Request, res: Response){

  const authReq = req as any;
  const authUser = authReq.user;

  if(!authUser){
    return res.status(401).json({
      message: 'Not authenticated'
    })
  }

  try {
    
    const user = await User.findById(authUser.id);
    if(!user){
        return res.status(404).json({
      message: 'user not found'
    })
    }

     if (user.twoFactorEnabled) {
      return res.status(400).json({ message: "2FA is already enabled" });
    }

    const secret = generateSecret();

    const otpAuthUri = generateURI({
      issuer: "NodeAuth",
      label: user.email,
      secret,
    });

    user.twoFactorSecret = secret;
    await user.save();

    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUri);

     return res.json({
      message: "Scan the QR code with Google Authenticator, then verify a code",
      qrCodeDataUrl, // use as <img src={qrCodeDataUrl} />
      manualKey: secret, // fallback if they can't scan
    });


  } catch (error) {
    console.error('error ',error)
     return res.status(500).json({ message: "Error in twoFASetupHandler" });
  }

}

export async function twoFAVerifyHandler(req: Request, res: Response) {
  const authUser = (req as any).user;
  if (!authUser) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { code } = req.body as { code?: string };
  if (!code || typeof code !== "string") {
    return res.status(400).json({ message: "code is required" });
  }

  try {
    const user = await User.findById(authUser.id);
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: "Run 2FA setup first" });
    }

    const result = await verify({
      secret: user.twoFactorSecret,
      token: code,
      epochTolerance: 30,
    });

    if (!result.valid) {
      return res.status(400).json({ message: "Invalid code" });
    }

    user.twoFactorEnabled = true;
    await user.save();

    return res.json({ message: "2FA enabled" });
  } catch (error) {
    console.error("error ", error);
    return res.status(500).json({ message: "Error in twoFAVerifyHandler" });
  }
}