const EventEmitter = require('events');

const myFirstEmitter = new EventEmitter();

// register a listener
myFirstEmitter.on('greet', (name)=> {
    console.log(`hello ${name}`)
})

myFirstEmitter.emit('greet', 'pankaj')