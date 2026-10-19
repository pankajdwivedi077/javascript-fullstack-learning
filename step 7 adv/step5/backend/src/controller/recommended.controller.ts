import { Request, Response } from "express"

export async function recommendMovies(req: Request, res: Response){
    
    try{
       const { userPrompt = "Suggest movies for a rainy night",
               genre = "thriller",
               mood= "relaxed",
               count = 2
         } = req.body;

         

    }catch{

    }
}