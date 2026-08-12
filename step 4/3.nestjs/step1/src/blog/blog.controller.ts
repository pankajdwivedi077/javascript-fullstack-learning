import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.service';

@Controller('blog')
export class BlogController {

    constructor(private readonly blogService: BlogService){}

   @Get()
   findAll() : Blog[] {
    return this.blogService.findAll();
   } 

   @Get(":id")
   findById(@Param("id") id: string) : Blog | undefined {
    return this.blogService.findById(+id);
   }

   @Get("unique/:key")
   findByKey(@Param("key") key: string) : Blog | undefined {
    return this.blogService.findByUniqueKey(key);
   }

}
