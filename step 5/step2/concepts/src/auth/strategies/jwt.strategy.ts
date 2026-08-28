import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStragy extends PassportStrategy(Strategy){
  
   constructor(private readonly authService: AuthService){
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: "ACCESS_123"
      })
   }

   async validate(payload:any){
       try{
         const user = await this.authService.getUserById(payload.sub);
         return {
            ...user,
            role: payload.role
         }
       }catch(error){
        throw new UnauthorizedException("Invalid token")
       }
   }

}