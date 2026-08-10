import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter });

export async function addAuthor(name: string){
   try{
     const newlyCreatedAuthor = await prisma.author.create({
        data: {
            name
        }
     })
     return newlyCreatedAuthor;
   }catch(error){
      console.error("Error adding author:", error);
      throw error;
   }
}

export async function deleteAuthor(id: number){
    try{
       const deletedAuthor = await prisma.author.delete({
        where: { id },
        include: {
            books: true
        }

       })
       return deletedAuthor;
    }catch(error){
        console.error("Error deleting author:", error);
        throw error;
    }
}