import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe,  Post,  Put,  Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService){}

  @Get()
  async findAll(): Promise<PostEntity[]>{
    return this.postService.findAll();
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe, PostExistsPipe) id: number) : Promise<PostEntity> {
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
  async create(@Body() createPostData: CreatePostDto): Promise<PostEntity>{
     return this.postService.create(createPostData);
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe)id: number, @Body() updatedPostData: UpdatePostDto): Promise<PostEntity>{
     return this.postService.update(id, updatedPostData);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param("id", ParseIntPipe)id: number):Promise<void> {
    await this.postService.deletePost(id);
  }

}
