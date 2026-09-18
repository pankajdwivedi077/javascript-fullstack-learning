"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { category, user } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import * as z from "zod"

export async function getAllCategories(){
   try {
    return db.select().from(category);
   } catch (error) {
     console.log(error)
     return []
   }
}