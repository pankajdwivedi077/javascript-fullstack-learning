// Promise <T>
// nested Promise<Promise<T>>]
// Thenables -> then

// awaited<T>

type Promise1 = Awaited<Promise<number>> // return a number
type Promise2 = Awaited<Promise<Promise<string>>>

type Awaited1 = Awaited<string> // only string not a promise

type PromiseUnionExample = Awaited<Promise<string | number>>

async function fetchCount(){
    return 42 as const
}

type ResolvedFetchCountValue = Awaited<ReturnType<typeof fetchCount>>

async function getData(){
    return Promise.all([
        Promise.resolve(1 as const),
        Promise.resolve("x" as const)
    ] as const)
}

type DataTuplePromise = Awaited<ReturnType<typeof getData>> // [1, "x"]