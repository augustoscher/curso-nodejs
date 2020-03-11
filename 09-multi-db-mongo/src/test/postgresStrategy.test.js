const assert = require("assert");
const Mongo = require("../db/strategies/Mongo");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Mongo());
const MOCKED_HERO = { name: 'Iron Man', power: 'Money' };
const MOCKED_HERO_UPD = { name: 'Batman', power: 'Money' };

describe("Mongo Strategy", function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
  });

  it('Postgres Connection', async () => {
    const result = await context.isConnected()
    assert.equal(result, true)
  });
});
