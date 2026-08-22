import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

// incoming request and returning response
// get, post, put, delete
@Controller('hello')
export class HelloController {

   // dependency imjection 
   constructor(private readonly helloService: HelloService){}

   @Get()
   getHello(): string{
    return this.helloService.getHello();
   }

   @Get('user/:name')
   getHelloWithName(@Param("name") name: string): string{
    return this.helloService.getHelloWithName(name);
   }

   @Get("query")
    getHelloWIthQuery(@Query("name") name: string): string{
        return this.helloService.getHelloWithName(name)
    }
   

}
