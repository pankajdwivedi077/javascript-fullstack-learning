import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter });

export async function addBook(title: string, publishedDate: Date, authorId: number) {
    try{
       const newlyCreatedBook = await prisma.book.create({
        data: {
            title,
            publishedDate,
            authorId
        },
        include: {
            author: true
        }
       })

       return newlyCreatedBook;
    }catch(error){
        console.error("Error adding book:", error);
        throw error;
    }
}

export async function getAllBooks(){
    try{
        const books = await prisma.book.findMany({
            include: {
                author: true
            }
        });
        return books;
    }catch(error){
        console.error("Error fetching all books:", error);
        throw error;
    }
}

export async function getBookById(id: number){
    try{
        const book = await prisma.book.findUnique({
            where: { id },
            include: {  author: true}
        });
        if(!book){
            throw new Error("Book not found");
        }
        return book;
    }catch(error){
        console.error("Error fetching book by Id:", error);
        throw error;
    }
}

export async function updateBook(id: number, newTitle: string){
  try{
     const updatedBook = await prisma.book.update({
        where: { id },
        data: { title: newTitle },
        include: { author: true }
     })
     if(!updatedBook){
            throw new Error("Book not found");
        }
     return updatedBook;
  }catch(error){
     console.error("Error updating book:", error);
     throw error;
  }
}

export async function deleteBook(id: number){
    try{
       const deletedBook = await prisma.book.delete({
        where: { id },
        include: { author: true }
       })
       return deletedBook;
    }catch(error){
        console.error("Error deleting book", error);
        throw error;
    }
}