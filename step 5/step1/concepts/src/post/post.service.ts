import { Injectable, NotFoundException } from '@nestjs/common';
import type { Posts } from './interfaces/post.interface';

@Injectable()
export class PostService {

   private posts: Posts[] = [
    {
        id: 1,
        title: "First",
        content: "First Post",
        authorName: "Bell",
        createdAt: new Date()
    },
   ];

   findAll(): Posts[] {
    return this.posts;
   }

   findOne(id: number): Posts{
    const singlePost = this.posts.find(post=> post.id === id);
    if(!singlePost){
        throw new NotFoundException(`Post with id ${id} is not present`);
    }
    return singlePost;
   }

   create(createPostData: Omit<Posts, "id" | "createdAt">): Posts{
    const newPost: Posts = {
        id: this.getNextId(),
        ...createPostData,
        createdAt: new Date()
    }
    this.posts.push(newPost)
    return newPost;
   }

   update(id: number, updatePostData: Partial<Omit<Posts, "id" | "createdAt">>): Posts{
     const currentPostIndex = this.posts.findIndex(post => post.id === id);
     if(currentPostIndex === -1){
        throw new NotFoundException(`Post not found`)
     }
     this.posts[currentPostIndex] = {
        ...this.posts[currentPostIndex],
        ...updatePostData,
        updatedAt: new Date()
     }
     return this.posts[currentPostIndex];
   }

   deletePost(id: number): {message: string}{
     const postIndex = this.posts.findIndex(post => post.id === id);
     if(postIndex === -1){
        throw new NotFoundException(`Post not found`);
     }
     this.posts.splice(postIndex,1)
     return {message: "post is deleted"}
   }

   private getNextId():number{
    return this.posts.length > 0 ?
    Math.max(...this.posts.map(post => post.id)) + 1: 1;
   }

}
