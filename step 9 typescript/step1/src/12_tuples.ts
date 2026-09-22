// tupuples means that you have fixed length and fixed types
// not same (string | number)[]
// optional tuples

const userEntry: [string, number, string] = ['Bell', 29, 'raju']

type ReponseRow = [status: number, message?: string]

const r11: ReponseRow = [200]

console.log(userEntry[2])

const corners: readonly [number, number] = [0,0]