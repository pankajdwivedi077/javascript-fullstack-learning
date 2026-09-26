type InExample1 = {
    role: "InExample1",
    permissions: string[]
}

type InExample2 = {
    role: "InExample2",
    expiresAt: Date
}

type UserExample = InExample1 | InExample2

function describeUserExample(u: UserExample){
    if('permissions' in u){
        return `InExample1 ${u.permissions.join(',')}`
    }else{
        return `User ${u.expiresAt.toISOString()}`
    }
}

console.log(describeUserExample({role: "InExample1", permissions: ["A", "B"]}))

// avoid runtime crashes

// a -> b -> c -> d 
// ?? and ||
//  obj?.a

type Profile = {
    name: string;
    contact? : {
        email?: string
    }
}

const p1: Profile = {
    name: "John"
}

const p2: Profile = {
    name: "Ben",
    contact: {
        email: "Ben@g"
    }
}

const email = p1?.contact?.email

// ?? -> uses the right hand default only when the left is null or undefined
// || -> uses the default when the left is any falsy value (0,"", null, undefined,  NaN)

const countFromServerN3: number | null = 0;
const lableFromServerN3: string | undefined = ""

const aN3 = countFromServerN3 ?? 100 // keeps the 0
const bN3 = countFromServerN3 || 100