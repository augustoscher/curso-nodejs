/*
  Executar:
    mocha test.js
    mocha test.js --reporter=nyan

*/

const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM = { name: 'Flash', power: 'Speed', id: 1 };

describe('Suite de manipulação de herois', () => {

  before(async() => {
    await database.save(DEFAULT_ITEM);
  })

  it('Deve pesquisar heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM;

    //usa destructuring para pegar somente o primeiro elemento
    const [result] = await database.list(expected.id);
    deepEqual(result, expected);
  });

  it('Deve cadastrar heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM;
    const result = await database.save(DEFAULT_ITEM);
    const [actual] = await database.list(DEFAULT_ITEM.id)
    deepEqual(actual, expected);
  });

  it('Deve remover heroi por id', async () => {
    const expected = true;
    const result = await database.remove(DEFAULT_ITEM.id);
    deepEqual(result, expected);
  });
});
