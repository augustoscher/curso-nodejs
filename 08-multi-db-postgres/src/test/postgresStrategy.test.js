const assert = require("assert");
const Postgres = require("../db/strategies/postgreSQL");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());

describe("Postgres Strategy", () => {
  // this.timeout(Infinity)

  it('Postgres Connection', async () => {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
});
