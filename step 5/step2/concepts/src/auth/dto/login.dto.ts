import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto{

    @IsEmail({}, {message: "Please provide a valid email"})
    email!: string

    @IsNotEmpty({message: "Name is required"})
    @MinLength(3,{message: "name must be of 3 characters"})
    password!: string

}