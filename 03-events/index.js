const EventEmitter = require('events');

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter();
const eventName = 'user:click'

//Registra evento ouvindo "user:click"
myEmitter.on(eventName, (click) => {
  console.log('user clicked', click);
})

//Emite evento
myEmitter.emit(eventName, 'ok button')
myEmitter.emit(eventName, 'cancel button')

let count = 0;

//Loop de 1s
// setInterval(function(){
  // myEmitter.emit(eventName, 'ok button ' + (++count))
// }, 1000)

console.log('Digite algo e tecle enter...');
const stdin = process.openStdin();
stdin.addListener('data', function(value){
  console.log(`Digitou: ${value.toString().trim()}`)
});
