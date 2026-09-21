// goal understand when to let typescript infer type
// when typscript will automatically write type and when i write types

let count = 0; // ts see this as number
const site = "dev"; // ts sees the exact liternal "dev"
const scores = [10,20,30]

// over annonation isnt bad -> just noisy

export function add(a:number,b:number) : number{
    return a+b
}

console.log(add(2,3))

// you should also annotate when the type is not obvious
let maybe: string | number; // union type
maybe = Math.random()>0.5 ? "test": 10