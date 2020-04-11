const assert = require("assert");
const api = require("../api");

const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres/postgreSQL');
const UserSchema  = require('../db/strategies/postgres/schemas/userSchema');

let app = {};

const user = {
  username: 'xunda', //username deve ser minusculo
  password: 'Olokinho123'
};

const databaseUser = {
  ...user,
  password: '$2b$04$KitYT7wBxicTiJdEZJeOyewRGJEKrMuky55najciDVe1xnBMVdbDC'
};

describe("Heroes API - Auth JWT", function() {
  this.beforeAll(async () => {
    app = await api;

    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UserSchema);
    const postgres = new Context(new Postgres(connectionPostgres, model)); 
    await postgres.update(null, databaseUser, true);
  });

  it('Should take a token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: user
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(data.token.length > 10);
  });

  it('Should return 401 Unauthorized', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'oi',
        password: '123'
      }
    });

    assert.deepEqual(result.statusCode, 401);
  });
});
