// understand type paramter <T>
// how typescript infers <T> from your arguments automatically

// generics is a function where the types are blanks that filled later
// <T> is a placeholder 
// ts will try to understand what t should be

function id<T>(x: T):T{
    return x;
}

// infers T
// id(5) -> T is number
// id("id") -> T is string

const xy = id(5);
console.log(xy)

console.log(id("st"))

function firstGen<T>(arr: T[]): T | undefined{
    return arr[0]
}

console.log(firstGen([1,2]))
console.log(firstGen([]))

// without generics -> (x: unknown) -> unknown
// with generics: (x: T)=> T // keep the exact type
function wrap<T>(value: T): {value: T}{
    return {value}
}

console.log(wrap("st"))       // T = string  → returns {value: string}
console.log(wrap(42))         // T = number  → returns {value: number}
console.log(wrap({a: 1}))     // T = {a: number} → returns {value: {a: number}}