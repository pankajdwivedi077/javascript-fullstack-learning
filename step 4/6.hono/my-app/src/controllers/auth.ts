import type { Context } from "hono";
import { Database } from "bun:sqlite";
import { User } from "../types";
import { password as bunPassword } from "bun";

export async function regsiterUser(c: Context, db: Database){

   const { username, password, role="user" } = await c.req.json();

   if(!username || !password){
    return c.json({
        error: "username and password are required"
    }, 400)
   }

   if(role !== "user" && role !== "admin"){
    return c.json({
        error: "invalid role"
    }, 400)
   }

   try{
     
     const existingUser = db.query(`SELECT * FROM users WHERE username= ?`).get(username) as User | undefined;

     if(existingUser){
        return c.json({
            error: "User already exists with same username"
        }, 400)
     }

     // hash the password
     const hashedPassword = await bunPassword.hash(password);

   }catch(e){
    console.error(e, " error in registerUser");
    return c.json({
        error: "internal server error. error in registerUser"
    }, 500)
   }

}