import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

   constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,
                                       private readonly jwtService: JwtService ){}

   async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
        where: {email: registerDto.email}
    })

    if(existingUser){
        throw new ConflictException("Email already in use please try with different email")
    }

    const hashedPassword = await this.hashPassword(registerDto.password);

    const newlyCreatedUser = this.userRepository.create({
        email: registerDto.email,
        name: registerDto.name,
        password: hashedPassword,
        role: UserRole.USER
    })

    const saveUser = await this.userRepository.save(newlyCreatedUser);

    const { password, ...result } = saveUser;
    return {
        user: result,
        message: "Registration successfull"
    }

   }

   async createAdmin(registerDto: RegisterDto){
     const existingUser = await this.userRepository.findOne({
        where: {email: registerDto.email}
    })

    if(existingUser){
        throw new ConflictException("Email already in use please try with different email")
    }

    const hashedPassword = await this.hashPassword(registerDto.password);

    const newlyCreatedUser = this.userRepository.create({
        email: registerDto.email,
        name: registerDto.name,
        password: hashedPassword,
        role: UserRole.ADMIN
    })

    const saveUser = await this.userRepository.save(newlyCreatedUser);

    const { password, ...result } = saveUser;
    return {
        user: result,
        message: "Admin Registration successfull"
    }

   }

   async login(loginDto: LoginDto){

      const user = await this.userRepository.findOne({
        where: {email: loginDto.email}
      })

      if(!user || !(await this.verifyPassword(loginDto.password, user.password))){
        throw new UnauthorizedException("Invalid credentials or account does not exists")
      }

      // generate token
      const token = this.generateToken(user)

      const { password, ...result } = user

      return{
        user: result,
        ...token
      }

   }

   async refreshToken(refreshToken: string){

    try{

         const payload = this.jwtService.verify(refreshToken, {
            secret: "REFRESH_123"
         })

         const user = await this.userRepository.findOne({
            where: { id: payload.sub }
         })

         if(!user){
            throw new UnauthorizedException("invalid token")
         }

         const accessToken = this.generateAccessToken(user)

         return { accessToken };

    }catch(e){
        throw new UnauthorizedException("invalid token")
    }
   }

  private async hashPassword(password: string): Promise<string>{
    return bcrypt.hash(password, 10);
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
     return bcrypt.compare(plainPassword, hashedPassword)
  }

  private generateToken(user: User){
    return {
        accessToken: this.generateAccessToken(user),
        refreshToken: this.generateRefreshToken(user)
    }
  }

  private generateAccessToken(user: User): string{
    const payload = {
        email: user.email,
        sub: user.id,
        role: user.role
    }
    return this.jwtService.sign(payload, {
        secret: "ACCESS_123",
        expiresIn: "15m"
    })
  }

  private generateRefreshToken(user: User): string{
        const payload = {
        sub: user.id,
    }
    return this.jwtService.sign(payload, {
        secret: "REFRESH_123",
        expiresIn: "7d"
    })
  }

}


