// common js module

const firstModule = require('./first-module')

console.log(firstModule.add(10,2));

try{
   console.log(firstModule.divide(10,0));
}catch (error){
  console.log("Caught error ", error.message)
}