import { addAuthor, deleteAuthor } from "../services/authorService";

export async function add(req: any, res: any){
    try{
        const { name } = req.body;
        const author = await addAuthor(name);
        res.status(201).json(author);

    }catch(error){
        console.error("Error adding author:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function deleteById(req: any, res: any){
    try{
        const { id } = req.params;
        const author = await deleteAuthor(parseInt(id));
        res.status(200).json(author);

    }catch(error){
        console.error("Error adding author:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}