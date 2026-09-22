const xss = [1,12]

const ys: readonly number[] = [1,2,3]

const yss: ReadonlyArray<number> = [1,2,3]

xss[1] = 9; // mutable

function sum(nums: readonly number[]): number{
    let sum = 0;
    for(const n of nums) sum += n;
    return sum;
}

console.log(sum(xss)) // passing mutable array in readonly params is allowed

const res = yss.map(n=>n*8);