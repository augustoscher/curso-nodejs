const assert = require("assert");
const api = require("../api");

let app = {};
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1bmRhIiwiaWQiOjEsImlhdCI6MTU4NTcxMjkwOH0.WTBAoRZ8f3Ut3-MBjs-1fbMTrJkwgt3tf2K1-AOfZ_E";

describe("Heroes API - Auth JWT", function() {
  this.beforeAll(async () => {
    app = await api;
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
