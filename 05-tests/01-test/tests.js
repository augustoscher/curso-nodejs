/*
  Para executar:
  mocha nome-do-arquivo.js
  Ex: mocha tests.js
*/

const assert = require('assert');
const { getPeople } = require('./service');

describe('Star Wars Tests', () => {
  it('Buscar R2D2 com o formato correto', async () => {
    const expected = [{ name: 'R2-D2', weight: '96' }];
    const baseName = 'r2-d2';
    const result = await getPeople(baseName);
    assert.deepEqual(result, expected);
  });
})