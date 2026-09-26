// <T> -> constraint T so that only certain shapes are allowed
// <T extends x>
// key constraints -> <K extends keyof T> k must be a key t
// .length will break

function lenN4<T extends {length: number}>(x: T): number{
    return x.length
}

console.log(lenN4('hello'))
console.log(lenN4([1,2]))

console.log(lenN4({length: 10, tag: 'ok'}));
// console.log(lenN4(123))  // error number does not have length

type User22 = {
    id: string;
    name: string;
    age?: number;
}

function userN6<T, K extends keyof T>(arr: T[], Key: K):Array<T[K]>{
    return arr.map(item => item[Key])
}

const usersN6: User22[] = [
    {
        id: "1",
        name: "raj"
    },
    {
        id: "2",
        name: "raju",
        age: 3
    },
] 

console.log(userN6(usersN6, "id"))