import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe,  Post,  Put,  Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import type { Posts } from './interfaces/post.interface';
import { CreatePostDto } from './dto/createPost.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService){}

  @Get()
  findAll(@Query("search") search?: string): Posts[]{

    const extractAllPosts = this.postService.findAll()

    if(search){
        return extractAllPosts.filter(singlePost => singlePost.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    }
    return extractAllPosts;
  }

  @Get(":id")
  findById(@Param("id", ParseIntPipe, PostExistsPipe) id: number) : Posts{
    return this.postService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  create(@Body() createPostData: CreatePostDto): Posts{
     return this.postService.create(createPostData);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe)id: number, @Body() updatedPostData: Partial<Omit<Posts, "id" | "createdAt">>): Posts{
     return this.postService.update(id, updatedPostData);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param("id", ParseIntPipe)id: number):void {
    this.postService.deletePost(id);
  }

}
