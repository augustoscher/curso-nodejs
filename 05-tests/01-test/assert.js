const assert = require('assert');

//Não precisamos de nenhum módulo de testes
//Próprio node já permite trabalhar com asserções.
assert.ok(true);
assert.ok(false);

const valuesErrors = [1];

if (valuesErrors === undefined || !valuesErrors.length) {
  console.log('valid');
} else {
  console.log('invalid')
}


const str = '';

if (str) {
  console.log('entrou');
} else {
  console.log('nm entrou');
}