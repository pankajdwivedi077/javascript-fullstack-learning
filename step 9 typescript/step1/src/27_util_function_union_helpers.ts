// ReturnType<F>
// Parameters<F>
// InstanceType<Ctor>
// ConstructorParamters<C>

function ExtractUserInfo(id: string, IsextractInfo: boolean){
    return {
        id,
        name: 'be',
        log: IsextractInfo? "details": (undefined as string | undefined) 
    }
}

type GetUserReturnInfo = ReturnType<typeof ExtractUserInfo>
type GetUserParamsInfo = Parameters<typeof ExtractUserInfo>

const argsInfo: GetUserParamsInfo = ["u1", true]
const resultInfo: GetUserReturnInfo = ExtractUserInfo(...argsInfo)


class PersonN1{
    constructor(public name: string, public age: number){}

    greet(){
        return `Hi ${this.name}`
    }
}

type PersonInstanceN1 = InstanceType<typeof PersonN1>
type PersonCArgs = ConstructorParameters<typeof PersonN1>

const resultInfo1: PersonCArgs = ["sangam", 29]
const abc: PersonInstanceN1 = new PersonN1(...resultInfo1)

console.log(abc.age)