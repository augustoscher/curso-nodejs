const EventEmitter = require('events');

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter();
const eventName = 'user:click'

myEmitter.on(eventName, function(click) {
  console.log('user clicked', click);
})

myEmitter.emit(eventName, 'ok button')
myEmitter.emit(eventName, 'cancel button')

let count = 0;

//Loop de 1s
// setInterval(function(){
  // myEmitter.emit(eventName, 'ok button ' + (++count))
// }, 1000)

const stdin = process.openStdin();
stdin.addListener('data', function(value){
  console.log(`Digitou: ${value.toString().trim()}`)
});
