const fs = require('fs')

function address(){
    console.log("chile")
}

function person(name, callbackFn){
  console.log(`Hello ${name}`)
  callbackFn()
}


person('Bell', address)

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if(err){
        console.log('error reading file', err)
        return
    }
    console.log(data)
})