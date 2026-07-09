console.log("hello node js from typescript");

// function getName(name: String){
//     return name;
// }

// console.log(getName("Bell"))

// basic types

let isDone: boolean = false

let num:number = 100

let str: string = "bell"

let list: number[] = [1,2,3];

let product: string[] = ['Product1', 'Product2']
let products: Array<string> = ['Product1', 'Product2']

let ramdonVal: any = 4; // assign any type of variable use when we do not know the type at the time of defination

let xyz: undefined = undefined
let xy: null = null

enum Color { // enum
    Red,
    Green,
    Blue
}

let d: Color = Color.Blue

// tuple

let abc: [string, number] = ["hi", 500]

// interfaces

interface User {
    name: string;
    id: number;
    email?: string  // optional
    readonly createdAt: Date
}

const user1: User = {
    name: "Pankaj",
    id: 1,
    email: "p@",
    createdAt: new Date()
}

// types

type Product = {
    title: string;
    price: number;
}

const product1: Product = {
    title: "Product1",
    price: 22
} 

// functions with type annotations

function mul(a: number,b: number): number{
    return a*b
}

const add = (a:number, b:number): number => {
    return a+b
}

function greet(name: string, greeting?: string): string {
    return `${name} ${greeting}`
}

console.log("pankaj", "hello");