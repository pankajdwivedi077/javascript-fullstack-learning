
type User = {
    id: string; // required property
    name: string;
    email?: string // optional property (could be absent)
    readonly createdAt: Date; // can not be reassigned 
}

const user1: User = {
    id: "u1",
    name: "raj",
    "createdAt": new Date()
}

const user2: User = {
    id: "u1",
    name: "bete",
    email: "bete@g",
    "createdAt": new Date()
}

// user2.createdAt = new Date() // can not reassig because this is read only

type User2 = {
    email?: string;
}

type User3 = {
    email: string | undefined;
}

type Count = { // index signature
    [k: string]: number
}

type Count1 = Record<"likes" | "views", number>

const coun1: Count = {
    "whatever": 1
}

const count2: Count1 = {
    likes: 1,
    views: 2
}