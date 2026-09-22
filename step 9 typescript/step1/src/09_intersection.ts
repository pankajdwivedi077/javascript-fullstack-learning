// the value must be everything from a and from b

type Inter1 = {
    id: string;
}

type Inter2 = {
    createdAt: Date;
}

type Entity = Inter1 & Inter2; // must have both id and createdAt

const e: Entity = {
    id: "e",
    createdAt: new Date()
}

type NumberHolderUnique = {
    a: number;
}

type StringHolderUnique = {
    a: string;
}

// type NumberStringMix = NumberHolderUnique & StringHolderUnique  // will give error because a property can't have from both type
// const bad: NumberStringMix = {
//     a: "1"
// }

type Product = {
    id: string;
    title: string
}

type Priced = {
    price: number
}

type PricedProduct = Product & Priced

const prod: PricedProduct = {
    id: "1",
    title: "iphone18",
    price: 22
}