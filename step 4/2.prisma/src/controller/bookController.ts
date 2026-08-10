import { addBook, getAllBooks, getBookById, updateBook, deleteBook } from "../services/bookService";

export async function add(req:any, res: any){

    try{

       const { title, publishedDate, authorId } = req.body;
       const body = await addBook(title, new Date(publishedDate), authorId);
       res.status(201).json(body);

    }catch(error){

        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}
export async function deleteById(req:any, res: any){

    try{

       const { id } = req.params;
       await deleteBook(parseInt(id));
       res.status(200).json({ message: "Book deleted successfully" });

    }catch(error){

        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}
export async function get(req:any, res: any){

    try{

       const books = await getAllBooks();
       res.status(200).json(books);

    }catch(error){

        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}
export async function getById(req:any, res: any){

    try{

      const { id } = req.params;
      const book = await getBookById(parseInt (id));
      if(book){
           res.status(200).json(book);
      }else{
        res.status(404).json({ error: "Book not found" });
      }
     
    }catch(error){

        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}
export async function updateById(req:any, res: any){

    try{

       const { id } = req.params;
       const { title } = req.body;
       const book = await updateBook(parseInt(id), title);
       res.status(200).json(book);

    }catch(error){

        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}