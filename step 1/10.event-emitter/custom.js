const EventEmitter = require('events');

class MyCustomeEmitter extends EventEmitter{
       constructor(){
        super()
        this.greetig  = 'hello'
       }
       greet(name){
         this.emit('greeting', `${this.greetig}, ${name}`)
       }
}

const myCustomEmitter = new MyCustomeEmitter();
myCustomEmitter.on('greeting', (input) => {
    console.log(`greeting event`, input)
});

myCustomEmitter.greet('pankaj')