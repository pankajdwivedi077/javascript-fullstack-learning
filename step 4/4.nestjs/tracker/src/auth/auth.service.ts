import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    // handle the new user registration
    async register(registerDto: RegisterDto){

        const { email, password } = registerDto

        // check if the user is exists
        
        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        })

        if(existingUser){
            throw new ConflictException("User already exists! please try with different email")
        }

        // hash the password

          const hanshedPassword = await bcrypt.hash(password, 10)

        // create new user

          const newlyCreatedUser = await this.prisma.user.create({
            data: {
                email, password: hanshedPassword
            }
          })

        // return password from the return object

        const { password: _, ...result } = newlyCreatedUser
        return result
    }

    async logic(logicDto: LoginDto){

       const { email, password } = logicDto

       // find the currect user by email as email is uniwue property
       const user = await this.prisma.user.findUnique({
        where: {
            email
        }
       })
        
       if(!user){
        throw new UnauthorizedException("Invalid credentials!")
       }

       // verify the password
       const isPasswordValid = await bcrypt.compare(password, user.password);

       if(!isPasswordValid){
        throw new UnauthorizedException("Invalid credentials!")
       }

       const token = this.jwtService.sign({userId: user.id})

       const { password: _, ...result } = user;

       return { ...result, token }

    }

}
