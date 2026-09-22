// inference example
const doubleFunx = (n:number)=>n*n

// explicit return for exported/public function
export function toTitle(s:string):string{
    return `Hello ${s}`
}

function booleanToNumber(flag: boolean): number{
    if(flag){
        return 1
    }
    return 0
}

async function loadCountInfered(){
    return 42
}

loadCountInfered().then(n=>console.log(n))