// strick null check

// let title: string = "intro"
// title = undefined

let subtitle : string | undefined = undefined;  // union type

// void use when function doesn't return a useful value
function log(mss: string): void{
    console.log(mss)
}

// never returns
function fail(msg: string): never{
  throw new Error(msg)
}

// do not any use -> try to ignore as much as possible

const valueAny: any = JSON.parse('{"x": 1}')
valueAny.notThere.toFixed(2) // this compiles but can break/explode at runtime

