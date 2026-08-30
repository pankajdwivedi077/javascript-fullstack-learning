import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { FindPostQueryDto } from './dto/find-posts-query.dto';
import { PaginatedResponse } from 'src/common/interface/paginated-response.interface';


@Injectable()
export class PostService {

  private postListCacheKeys: Set<string> = new Set();

   constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>, @Inject(CACHE_MANAGER) private cacheManger: Cache ){}

   private generatePostListCacheKey(query: FindPostQueryDto) : string{
    const  { page=1, limit=10, title } = query
    return `posts_limit_page${page}_limit${limit}_title${title || "all"}`
   }


   async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: { authorName: true }
    });
   }

   async findAll2(query:FindPostQueryDto): Promise<PaginatedResponse<Post>> {
     const cacheKey = this.generatePostListCacheKey(query);
     this.postListCacheKeys.add(cacheKey);
     const getCachedData = await this.cacheManger.get<PaginatedResponse<Post>>(cacheKey);
     if(getCachedData){
      console.log(`cache hit`)
      return getCachedData;
     }
     console.log("cache miss")
     const { page=1, limit=10, title } = query 
     const skip1 = (page-1) * limit
     const queryBuilder = this.postRepository.createQueryBuilder("post").leftJoinAndSelect("post.authorName", "authorName").orderBy("post.createdDate", "DESC").skip(skip1).take(limit)
     if(title){
      queryBuilder.andWhere("post.title ILIKE :title", {title: `%${title}%`})
     }
     const [items, totalItems] = await queryBuilder.getManyAndCount()
     const totalPages = Math.ceil(totalItems/limit)
     const responseResult = {
      items,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages
      }
     }
     await this.cacheManger.set(cacheKey, responseResult, 30000)
     return responseResult
   }

   async findOne(id: number): Promise<Post>{
    const singlePost = await this.postRepository.findOne({
      where: {id},
      relations: { authorName: true }
    });
    if(!singlePost){
        throw new NotFoundException(`Post with id ${id} is not present`);
    }
    return singlePost;
   }

   async findOne2(id: number): Promise<Post>{

    const cacheKey = `post_${id}`
    const cachedPost = await this.cacheManger.get<Post>(cacheKey)

    if(cachedPost){
      console.log(`cache hit ${cacheKey}`)
      return cachedPost;
    }
    
    console.log(`cache miss`)

    const singlePost = await this.postRepository.findOne({
      where: {id},
      relations: { authorName: true }
    });
    if(!singlePost){
        throw new NotFoundException(`Post with id ${id} is not present`);
    }
    // store the post to cache
    await this.cacheManger.set(cacheKey, singlePost, 30000)
    return singlePost;
   }

   async create(createPostData: CreatePostDto, authorName: User): Promise<Post>{
    const newPost = this.postRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName
    })
    // invalidate the existing cache
    await this.invalidateAllExistingCache()
    return this.postRepository.save(newPost);
   }

   async update(id: number, updatePostData: UpdatePostDto, user: User): Promise<Post> {
     const findPostToUpdate = await this.findOne(id);
     if(findPostToUpdate.authorName.id !== user.id && user.role !== UserRole.ADMIN){
      throw new ForbiddenException("You can only update our own post")
     }
     if(updatePostData.title){
       findPostToUpdate.title = updatePostData.title
     }
     if(updatePostData.content){
       findPostToUpdate.content = updatePostData.content
     }
    
      // invalidate the existing cache
     const updatedPost = await this.postRepository.save(findPostToUpdate);
     await this.cacheManger.del(`post_${id}`)
   
    await this.invalidateAllExistingCache()

     return this.postRepository.save(findPostToUpdate);
   }

  async deletePost(id: number): Promise<void>{
       const findPostToDelete = await this.findOne(id);
       await this.postRepository.remove(findPostToDelete);
         // invalidate the existing cache
       await this.cacheManger.del(`post_${id}`)
      
         await this.invalidateAllExistingCache()
   }

   private async invalidateAllExistingCache(): Promise<void>{
     console.log(`invalidating ${this.postListCacheKeys.size} list cache entries`)
     for(const key of this.postListCacheKeys){
      await this.cacheManger.del(key)
     }
     this.postListCacheKeys.clear()
   }

}
