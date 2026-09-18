import { desc, eq } from "drizzle-orm"
import { db } from "."
import { posts } from "./schema"

// get all posts
export async function getAllPosts(){
    try {
        const fetchAllPosts = await db.query.posts.findMany({
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
            with: {
                author: true
            }
        })
        return fetchAllPosts;
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getPostBySlug(slug:string){
  try {
    const post = await db.query.posts.findFirst({
       where: {
        slug: slug
      },
        with: {
            author: true
        }
    })
    return post
  } catch (error) {
    console.log(error)
    return null;
  }
}