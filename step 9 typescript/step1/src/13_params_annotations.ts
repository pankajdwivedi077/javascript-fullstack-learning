function func1(a:number, b:number): number{
    return a+b
}

const num12 = [1,2,3]

const doubled = num12.map(n=>n*2) // (n:number)
console.log(doubled)

const times2 = (n: number) => n*2 // always prefer to give annoations

type Point = {
    x: number;
    y: number;
}

function distanceFromOrigin(p: Point): number{
    return Math.hypot(p.x,p.y)
}

console.log(distanceFromOrigin({x:2,y:3}))