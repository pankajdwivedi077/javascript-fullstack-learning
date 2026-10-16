import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.ts";
import bcrypt from "bcrypt";
import { clearAuthCookies, requireCsrf, setAuthCookies } from "../utils/cookie.ts";
import { requireAccessAuth, requiredRole } from "../middleware/auth.ts";
import { AuthenticatedRequest, AuthTokenPayload } from "../utils/types.ts";
import { clearFailedLoginAttempts, isAccLocked, registerFailedLoginAttemp, validateBody } from "../utils/helpers.ts";
import { listUsersQuerySchema, loginSchema, registerSchema } from "../utils/schema.ts";

const router = express.Router();

const EXTRACT_SAFE_USER_SELECT_OPTIONS="-password"

// POST /api/auth/register
router.post("/register", validateBody(registerSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Register failed",
      error,
    });
  }
});

// POST /api/auth/login
router.post("/login", validateBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // only check with email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if(isAccLocked(user)){
      return res.status(429).json({
        message: 'Too many login attempts.'
      })
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){

      await registerFailedLoginAttemp(user)

      if(isAccLocked(user)){
      return res.status(429).json({
        message: 'Too many login attempts.'
      })
    }

      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    await clearFailedLoginAttempts(user)

    setAuthCookies(res, String(user._id), user.role)

    res.json({
      message: "Login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error,
    });
  }
});

// GET /api/auth/me
router.get("/me", requireAccessAuth ,async (req: AuthenticatedRequest, res) => {
  try {
   
   const user = await User.findById(req.authUser?.userId).select(EXTRACT_SAFE_USER_SELECT_OPTIONS);
   if(!user){
    return res.status(404).json({
      message: 'user not found'
    })
   }

   return res.json(user)

  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
});

router.post('/refresh', requireCsrf, async(req, res)=>{
  try {
    const refreshToken = req.cookies?.["refresh_token"]
    if(!refreshToken){
      return res.status(401).json({
        message: 'no refresh tokrn'
      })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as AuthTokenPayload

    if(decoded.type! == "refresh"){
        return res.status(401).json({
        message: 'invalid refresh token type provide'
      })
    }

    setAuthCookies(res, decoded.userId, decoded.role)

    return res.json({
      message: 'token refreshed'
    })

  } catch (error) {
      return res.status(401).json({
        message: 'refresh failed'
      })
  }
})

router.post('/logout', requireCsrf, (req, res)=>{
  clearAuthCookies(res)
  return res.json({
    message: 'logout successfull'
  })
})

router.get('/users', requireAccessAuth, requiredRole('admin'), async(req, res)=>{
  try {
    
    const parsedQuery = listUsersQuerySchema.safeParse(req.query);
    
    if(!parsedQuery.success){
      return res.status(400).json({
        message: 'Invalid query filters'
      })
    }

    const filters:Record<string, string> = {}

    if(parsedQuery.data.role){
      filters.role = parsedQuery.data.role
    }

    if(parsedQuery.data.name){
      filters.name = parsedQuery.data.name
    }

    if(parsedQuery.data.email){
      filters.email = parsedQuery.data.email
    }

    const extractUsersList = await User.find(filters).select(EXTRACT_SAFE_USER_SELECT_OPTIONS);

    return res.json({users: extractUsersList})

  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
})

export default router;
