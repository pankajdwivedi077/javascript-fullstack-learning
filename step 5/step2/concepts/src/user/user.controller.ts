import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

  interface User {
    id: number,
    name: string
   }

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Get()
  getHelloUsers(): User[]{
    return this.userService.getAllUsers()
  }

  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number): User | undefined{
    return this.userService.getUserById(id);
  } 

  @Get(":id/welcome")
  getWelcomeMessage(@Param("id", ParseIntPipe) id: number): string{
    return this.userService.getWelcomeMessage(id);
  }
}
