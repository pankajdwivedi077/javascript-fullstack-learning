// timers -> pending callback -> idle -> prepare -> poll -> check -> close callback

const fs = require("fs");
const crypto = require("crypto");

console.log("script start") // 1

setTimeout(()=> {  //5
   console.log("2. this is macrotask")
}, 0)

setTimeout(()=> { // 6
   console.log("3. this is macrotask")
}, 0)

setImmediate(()=>{ // 7
    console.log("4. setImmediate (check)")
})

Promise.resolve().then(()=> { // 4
    console.log("5. promise resolve microtask")
})

process.nextTick(()=> { // 3
    console.log("6, microtask")
})

fs.readFile(__filename, ()=> { // 8
    console.log("7, input/out callback")
})

crypto.pbkdf2('secret', 'salt', 1000, 64, 'sha512', (err,key)=> { // 9
    if(err) throw err
    console.log("8 cpu intensive task")
})

console.log("9") // 2