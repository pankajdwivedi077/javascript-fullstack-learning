import { IsEmail, IsNotEmpty, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class RegisterDto{

    @IsEmail({}, {message: "Please provide a valid email"})
    email!: string

    @IsNotEmpty({message: "Name is required"})
    @IsString({message: "Name must be string"})
    @MinLength(3,{message: "name must be of 3 characters"})
    @MaxLength(30, {message: "not more than 30 characters"})
    name!: string

    @IsNotEmpty({message: "Name is required"})
    @MinLength(3,{message: "name must be of 3 characters"})
    password!: string

}