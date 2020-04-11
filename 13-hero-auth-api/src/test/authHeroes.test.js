const assert = require("assert");
const api = require("../api");

const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres/postgreSQL');
const UserSchema  = require('../db/strategies/postgres/schemas/userSchema');

let app = {};

const user = {
  username: 'xunda',
  password: '123'
};

const databaseUser = {
  ...user,
  password: ''
};

describe("Heroes API - Auth JWT", function() {
  this.beforeAll(async () => {
    app = await api;

    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UserSchema);
  });

  it('Should take a token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'xunda',
        password: '123'
      }
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
