import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import type { Post } from './interfaces/post.interface';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService){}

  @Get()
  findAll(@Query("search") search?: string): Post[]{

    const extractAllPosts = this.postService.findAll()

    if(search){
        return extractAllPosts.filter(singlePost => singlePost.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    }
    return extractAllPosts;
  }

  @Get(":id")
  findById(@Param("id", ParseIntPipe) id: number) : Post{
    return this.postService.findOne(id)
  }

}
