import { NextFunction, Response } from "express";
import { AuthenticatedRequest, AuthTokenPayload } from "../utils/types.ts";
import jwt from "jsonwebtoken";

export function requireAccessAuth(
    req: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) {
    try {
        
   const accessToken = req.cookies?.['access_token']
     if(!accessToken){
          return response.status(401).json({
            message: 'Unauth user info'
        })
     }

     const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
     ) as AuthTokenPayload

     if(decoded.type !== 'access'){
           return response.status(401).json({
            message: 'Unauthorized'
        })
     }

     req.authUser = {
        userId: decoded.userId,
        role: decoded.role
     }

     next();

    } catch (error) {
        return response.status(401).json({
            message: 'Unauth user info'
        })
    }
}

export function requiredRole(role: 'admin'){
    return (req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
        if(!req.authUser || req.authUser.role !== role){
            return res.status(403).json({
                message: 'forbidden or you do not access to this route'
            })
        }
        next()
    }
}