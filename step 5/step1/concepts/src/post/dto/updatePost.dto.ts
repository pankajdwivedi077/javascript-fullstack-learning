import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto {

   @IsOptional() 
   @IsNotEmpty({message: "Title is required"})
   @IsString({message: "title must be string"})
   @MinLength(3, {message: "title must be atleast 3 character long"})
   @MaxLength(50, {message: "title can not be longer than 50 characters"})
   title?: string

   @IsOptional() 
   @IsNotEmpty({message: "Title is required"})
    @IsString({message: "title must be string"})
   @MinLength(3, {message: "title must be atleast 5 character long"})
   content?: string

   @IsOptional() 
   @IsNotEmpty({message: "Title is required"})
   @IsString({message: "title must be string"})
   @MinLength(3, {message: "title must be atleast 5 character long"})
    @MaxLength(25, {message: "title can not be longer than 50 characters"})
   authorName?: string
   
}