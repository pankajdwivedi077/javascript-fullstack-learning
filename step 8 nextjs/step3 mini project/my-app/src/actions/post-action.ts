"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq, and, ne } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData){
    try {
        // get the current user
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if(!session || !session?.user){
            return {
                success: false,
                message: "you must be logged in to create a post"
            }
        }
        // get form data
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;

        // create the slug from post title
        const slug = slugify(title)
        
        // check if the slug already exists
       const [existingPost] = await db
            .select()
            .from(posts)
            .where(eq(posts.slug, slug))
            .limit(1);


         if(existingPost){
            return {
                success: false,
                message: "A post with same title already exists"
            }
         }
         const [newPost] = await db
               .insert(posts)
               .values({
                title, description, content, slug,
                authorId: session.user.id
               }).returning(); 
         
        //revalidate the data
        revalidatePath("/")
        revalidatePath(`/post/${slug}`)
        revalidatePath("/profile")
        
        return {
            success: true,
            message: "post created",
            slug
        }
    } catch (error) {
          return {
                success: false,
                message: "A post with same title already exists"
            }
    }
}

export async function updatePost(postId: number, formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session || !session.user) {
            return {
                success: false,
                message: "You must be logged in to edit"
            }
        }

        // get the post being edited first
        const [post] = await db
            .select()
            .from(posts)
            .where(eq(posts.id, postId))
            .limit(1);

        if (!post) {
            return {
                success: false,
                message: "Post not found"
            }
        }

        // make sure the current user owns this post
        if (post.authorId !== session.user.id) {
            return {
                success: false,
                message: "You are not authorized to edit this post"
            }
        }

        // get form data
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;

        const slug = slugify(title);

        // check if another post (not this one) already has this slug
        const [existingPost] = await db
            .select()
            .from(posts)
            .where(and(eq(posts.slug, slug), ne(posts.id, postId)))
            .limit(1);

        if (existingPost) {
            return {
                success: false,
                message: "A post with same title already exists"
            }
        }

        const [updatedPost] = await db
            .update(posts)
            .set({
                title,
                description,
                content,
                slug,
                updatedAt: new Date()
            })
            .where(eq(posts.id, postId))
            .returning();

        // revalidate the data
        revalidatePath("/");
        revalidatePath(`/post/${slug}`);
        revalidatePath("/profile");

        return {
            success: true,
            message: "post updated",
            slug
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong while updating the post"
        }
    }
}

export async function deletePost(postId: number){
    try {
            const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session || !session.user) {
            return {
                success: false,
                message: "You must be logged in to edit"
            }
        }

            const [post] = await db
            .select()
            .from(posts)
            .where(eq(posts.id, postId))
            .limit(1);

        if (!post) {
            return {
                success: false,
                message: "Post not found"
            }
        }

            if (post.authorId !== session.user.id) {
            return {
                success: false,
                message: "You are not authorized to edit this post"
            }
        }

           const [deletedPost] = await db
            .delete(posts)
            .where(eq(posts.id, postId))
            .returning();

        revalidatePath("/");
        revalidatePath("/profile");

        return {
            success: true,
            message: "post deleted",
            
        }

    } catch (error) {
          console.log(error)
        return {
            success: false,
            message: "Something went wrong while deleting the post"
        }
    }
}