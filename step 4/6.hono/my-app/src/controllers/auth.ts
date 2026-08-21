import type { Context } from "hono";
import { Database } from "bun:sqlite";
import { User } from "../types";
import { password as bunPassword } from "bun";
import { sign } from "hono/jwt";

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

     db.run(`INSERT INTO users (username, password, role) VALUES (?,?,?)`, [username, hashedPassword, role]);

     return c.json({
        message: "user registered successfully"
     }, 201)

   }catch(e){
    console.error(e, " error in registerUser");
    return c.json({
        error: "internal server error. error in registerUser"
    }, 500)
   }

}

export async function loginUser(c: Context, db: Database){
  
   const { username, password } = await c.req.json();

      if(!username || !password){
    return c.json({
        error: "username and password are required"
    }, 400)
   }

   try{
     
     const user = db.query(`SELECT * from users WHERE username=?`).get(username) as User | undefined;

     if(!user){
         return c.json({
            error: "User does not exists with this username"
        }, 401)
     }

    // verify the password
    const isPasswordValid = await bunPassword.verify(password, user.password);
    if(!isPasswordValid){
            return c.json({
            error: "invalid password"
        }, 401)
    }

    const token = await sign({
        userId: user.id,
        role:  user.role
    }, process.env.JWT_SECRET || "JWT_SECRET", "HS256")

    return c.json({token})

   }catch(error){
      console.error(error, " error in loginUser");
    return c.json({
        error: "internal server error. error in loginUser"
    }, 500)
   }

}