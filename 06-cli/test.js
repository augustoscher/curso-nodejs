const { deepEqual, ok } = require('assert');
const database = require('./database');


const DEFAULT_ITEM = { name: 'Flash', power: 'Speed', id: 1 };

describe('Suite de manipulação de herois', () => {

  it('Deve pesquisar heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM;

    //usa destructuring para pegar somente o primeiro elemento
    const [result] = await database.listar(expected.id);
    deepEqual(result, expected);
  });

  // it('Deve cadastrar heroi usando arquivos', () => {
  //   const expected = DEFAULT_ITEM;

  //   ok(null, expected);
  // });
});
