import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService){}

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

}
