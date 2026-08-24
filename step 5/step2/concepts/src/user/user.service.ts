import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

   interface User {
    id: number,
    name: string
   }

@Injectable()
export class UserService {

   // injecting services from other module 
   // hello module must export helloservice
   // user module must import helloModule
   constructor(private readonly helloService: HelloService){}

   getAllUsers(): User[] {
    return [
        {
            id:1, name: "raj"
        },
        {
            id:2, name: "jaggu"
        },
    ]
   }

   getUserById(id: number): User | undefined{
    const user = this.getAllUsers().find(user => user.id === id);
    return user;
   }

   getWelcomeMessage(userId: number): string{
     const user = this.getUserById(userId)
     if(!user){
        return "User not found"
     }
     return this.helloService.getHelloWithName(user?.name);
   }

}
