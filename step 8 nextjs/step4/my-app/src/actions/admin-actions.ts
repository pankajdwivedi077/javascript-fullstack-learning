"use server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { asset, category, user } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import * as z from "zod"

const CategorySchema = z.object({
    name: z.string().min(2, {error: "Category name must be at least 2 characters" }).max(50, {error: "max 50 characters"})
})

export type CategoryFormValues = z.infer<typeof CategorySchema>

export async function addNewCategoryAction(formData: FormData){

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to add categories")
    }

    try {

        const name = formData.get("name") as string;

        const validateFields = CategorySchema.parse({name})

        const existingCategory  = await db.select().from(category).where(eq(category.name, validateFields.name)).limit(1)

        if(existingCategory.length > 0){
            return {
                success:false,
                message: "category already exists! please try with a different name"
            }
        }

        await db
            .insert(category).values({
                name: validateFields.name
            })

        revalidatePath("/admin/settings")    

          return {
                success:true,
                message: "category added"
            }

    } catch (error) {
        console.log(error)
           return {
                success:false,
                message: "falied to add category"
            }
    }

}

export async function getAllCategoryAction(){

       const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to access getAllCategories")
    }

    try {
        return await db.select().from(category).orderBy(category.name)
    } catch (error) {
        console.log(error)
           return [];
    }
}

export async function getTotalusersAction(){

       const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to get allUsers")
    }

    try {
        const result = await db.select({count: sql<number>`count(*)`}).from(user)
        return result[0]?.count || 0;
    } catch (error) {
        return 0;
    }

}

export async function deleteCategoryAction(id: number){
         const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to deleteCategory")
    }

    try {
        await db.delete(category).where(eq(category.id, id))
        revalidatePath("/admin/settings")    
        return {
            success: true,
            message: "category deleted"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "failed to delete category"
        }
    }
}

export async function getAssetsCountAction(){

       const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to get allAssetsCount")
    }

    try {
        const result = await db.select({count: sql<number>`count(*)`}).from(asset)
        return result[0]?.count || 0;
    } catch (error) {
        return 0;
    }

}

export async function approveAssetAction(assetid: string){
        const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to approve assest")
    }

    try {
        await db.update(asset).set({isApproved: "approved", updatedAt: new Date()}).where(eq(asset.id, assetid))
         revalidatePath("/admin/assert-approval")
         return {
            success: true
         }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}

export async function rejectAssetAction(assetid: string){
       const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to reject assest")
    }

    try {
         await db.update(asset).set({isApproved: "rejected", updatedAt: new Date()}).where(eq(asset.id, assetid))
         revalidatePath("/admin/assert-approval")
           return {
            success: true
         }
    } catch (error) {
        console.log(error)
         return {
            success: false
        }
    }
}

export async function getPendingAssetsAction(){
         const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user || session.user.role !== "admin"){
        throw new Error("You must be an admin to getPendingAssets")
    }

    try {
        const pendingAssets = await db.select({
            asset: asset,
            userName: user.name
        }).from(asset).leftJoin(user, eq(asset.userId, user.id)).where(eq(asset.isApproved, "pending"));
        return pendingAssets;
    } catch (error) {
        console.log(error)
        return []
    }
}