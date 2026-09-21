// value -> this or that

function printId(id: number | string){
  if(typeof id === "string"){
    id.toUpperCase()
  }else{
    id.toFixed(2)
  }
}

// object union
type Admin = {
    role: "admin";
    permission: string[];
}

type Customer = {
    role: "customer";
    loyaltyPoints: number;
}

function describeUser(u: Admin | Customer){
  if(u.role === "admin"){
    console.log(u.permission)
  }else{
     console.log(u.loyaltyPoints)
  }
}

function describeUserWithInOperator(u: Admin | Customer){
    if("permission" in u){
        console.log(u.role)
    }else{
        console.log(u.loyaltyPoints)
    }
}

// array of union and union of array
const arrOfUnion: (string | number)[] = ["a",1,"b",2] // both string and number

const unionOfArr: string[] | number[] = Math.random() > 0.1 ? ["x","y"] : [1,2] // can only be string or number

// unionOfArr.push(3) // will give error because don't know if it will be string or number