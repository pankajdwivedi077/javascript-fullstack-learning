type UserN7 = {
    id: string;
    name: string;
    email?: string;  // T ['email]
}

function getUserN7<T, K extends keyof T>(objN6: T, keyN7: K): T[K]{
  return objN6[keyN7]
}

const uN7: UserN7 = {
    id: 'u1',
    name: 'bb' // change it value here
}

const idValOfN7 = getUserN7(uN7, "id")

function setUserPropN7<T, K extends keyof T>(objN7: T, keyN7: K, newVal: T[K]):void{
  objN7[keyN7] = newVal;
}

setUserPropN7(uN7, "name", "john")