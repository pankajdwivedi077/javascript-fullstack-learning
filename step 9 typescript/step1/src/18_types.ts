// object shapes -> similar to interface
// union types (A | B)
// intersection type(A & B)

type Person1 = {
    id: string;
    address: string;
    salary: number;
}

const person1: Person1 = {
    id: "1",
    address: "home",
    salary: 2
}

type Status = 'new' | 'paid' | 'pendinding'

function nextActionCheck(s: Status): string{
    switch(s){
        case "new":
            return "new";
        case "paid":
            return "paid";
        case "pendinding":
            return "pending";
        default:
         return "zero";            
    }
}

type ToMerge1 = {
    price: number
}

type ToMerge2 = {
    stock: number
}

type MergeProduct = Person1 & ToMerge1 & ToMerge2

const mergeAll: MergeProduct = {
    id: "2",
    address: "gg",
    salary: 19,
    price: 10,
    stock: 2
}