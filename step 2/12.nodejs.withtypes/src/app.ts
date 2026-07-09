// console.log("hello node js from typescript");

// // function getName(name: String){
// //     return name;
// // }

// // console.log(getName("Bell"))

// // basic types

// let isDone: boolean = false

// let num:number = 100

// let str: string = "bell"

// let list: number[] = [1,2,3];

// let product: string[] = ['Product1', 'Product2']
// let products: Array<string> = ['Product1', 'Product2']

// let ramdonVal: any = 4; // assign any type of variable use when we do not know the type at the time of defination

// let xyz: undefined = undefined
// let xy: null = null

// enum Color { // enum
//     Red,
//     Green,
//     Blue
// }

// let d: Color = Color.Blue

// // tuple

// let abc: [string, number] = ["hi", 500]

// // interfaces

// interface User {
//     name: string;
//     id: number;
//     email?: string  // optional
//     readonly createdAt: Date
// }

// const user1: User = {
//     name: "Pankaj",
//     id: 1,
//     email: "p@",
//     createdAt: new Date()
// }

// // types

// type Product = {
//     title: string;
//     price: number;
// }

// const product1: Product = {
//     title: "Product1",
//     price: 22
// } 

// // functions with type annotations

// function mul(a: number,b: number): number{
//     return a*b
// }

// const add = (a:number, b:number): number => {
//     return a+b
// }

// function greet(name: string, greeting?: string): string {
//     return `${name} ${greeting}`
// }

// console.log("pankaj", "hello");

import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import { Iuser, User } from "./models/User.js";

const app :Express = express()

const port = 3000;

app.use(express.json());

interface CustomRequest extends Request{
    startTime?: number
}

// middleware -> add startime to request

app.use((req: CustomRequest, res: Response, next: NextFunction)=> {
   req.startTime = Date.now();
   next()
})

app.get("/", (req: Request,res: Response)=> {
    res.send("Typescript with nodejs")
})

// post route -> new user -> name, email -> req.body
// -> /user/:id?name -> request <{params}, {responsebody}, {requestbody}, {query}, {locals}>

interface User{
    name: string,
    email: string
}

app.post("/user", (req: Request<{},{},User>, res:Response) => {
    const {name, email} = req.body
    res.json({
        message: "User created"
    })
})

// get users based on id

app.get("/users/:id", (req: Request<{id: string}>,res:Response) => {
   const { id } = req.params
   res.json({
    userId: id
   })
})

app.get("/userP", async(req: Request,res: Response) => {
    try{
      const user: Iuser[] = await User.find({})
    }catch(e){
        res.status(400).json({message: "Some error occured"})
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})