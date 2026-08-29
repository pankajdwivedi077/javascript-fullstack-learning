import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe,  Post,  Put,  Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/updatePost.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { UserRole } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { FindPostQueryDto } from './dto/find-posts-query.dto';
import { PaginatedResponse } from 'src/common/interface/paginated-response.interface';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService){}

  @Get()
  async findAll(): Promise<PostEntity[]>{
    return this.postService.findAll();
  }

  @Get("get")
  async findAll2(@Query() query: FindPostQueryDto): Promise<PaginatedResponse<PostEntity>> {
    return this.postService.findAll2(query)
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe, PostExistsPipe) id: number) : Promise<PostEntity> {
    return this.postService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  async create(@Body() createPostData: CreatePostDto, @CurrentUser() user: any): Promise<PostEntity>{
     return this.postService.create(createPostData, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@Param("id", ParseIntPipe)id: number, @Body() updatedPostData: UpdatePostDto, @CurrentUser() user: any): Promise<PostEntity>{
     return this.postService.update(id, updatedPostData, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param("id", ParseIntPipe)id: number):Promise<void> {
    await this.postService.deletePost(id);
  }

}
