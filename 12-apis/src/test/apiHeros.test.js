const assert = require('assert');
const api = require('../api');

describe.only('Heroes API', function() {
  this.beforeAll(async () => {
    app = await api;
  });

  it('', async()=>{
    const result = await app.inject({
      method: 'GET',
      url: '/heroes'
    })

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
  });

});