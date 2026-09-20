"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { asset, category, user } from "@/lib/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { title } from "process"
import * as z from "zod"

const AssertSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  categoryId: z.number().positive({error: "please select a category"}),
  fileUrl: z.string(),
  thumbnailUrl: z.string().optional()
})

export async function getAllCategories(){
   try {
    return db.select().from(category);
   } catch (error) {
     console.log(error)
     return []
   }
}

export async function uploadAsset(formData: FormData){
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(!session?.user){
    throw new Error("You must be logged in to upload asset")
  }
  try {
    const validateFileds = AssertSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      categoryId: Number(formData.get('categoryId')),
      fileUrl: formData.get('fileUrl'),
      thumbnailUrl: formData.get('thumbnailUrl') ||formData.get('fileUrl')
    })
    await db.insert(asset).values({
      title: validateFileds.title,
      description: validateFileds.description,
      fileUrl: validateFileds.fileUrl,
      thumbnailUrl: validateFileds.thumbnailUrl,
      isApproved: "pending",
      userId: session.user.id,
      categoryId: validateFileds.categoryId
    })
    revalidatePath("/dashbaord/asserts")
    return {
      success: true
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "failed"
    }
  }
}

export async function getUserAssets(userId: string){
  try {
    return await db.select().from(asset).where(eq(asset.userId, userId)).orderBy(asset.createdAt);
  } catch (error) {
    return []
  }
}

export async function getPublicAssetsAction(categoryId?: number){
   try {
     // and multiple condition
     let conditions = and(
      eq(asset.isApproved, 'approved')
     )
     if(categoryId){
      conditions = and(conditions, eq(asset.categoryId, categoryId))
     }
     const query = await db.select({
      asset: asset,
      categoryName: category.name,
      userName: user.name
     }).from(asset).leftJoin(category, eq(asset.categoryId, category.id)).leftJoin(user, eq(asset.userId, user.id)).where(conditions)

     return query;
   } catch (error) {
    console.log(error)
    return []
   }
}

export async function getAssetById(assetId: string){
  try {
    const [result] = await db.select({
      asset: asset,
      categoryName: category.name,
      userName: user.name,
      userImage: user.image,
      userId: user.id
    }).from(asset).leftJoin(category, eq(asset.categoryId, category.id)).leftJoin(user, eq(asset.userId, user.id)).where(eq(asset.id, assetId))
    
    return result;
  } catch (error) {
    return null;
  }
}