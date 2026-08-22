import { Injectable, NotFoundException } from '@nestjs/common';
import type { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {

   private posts: Post[] = [
    {
        id: 1,
        title: "First",
        content: "First Post",
        authorName: "Bell",
        createdAt: new Date()
    },
   ];

   findAll(): Post[] {
    return this.posts;
   }

   findOne(id: number): Post{
    const singlePost = this.posts.find(post=> post.id === id);
    if(!singlePost){
        throw new NotFoundException(`Post with id ${id} is not present`);
    }
    return singlePost;
   }

   

}
