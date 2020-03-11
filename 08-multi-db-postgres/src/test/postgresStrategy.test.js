const assert = require("assert");
const Postgres = require("../db/strategies/postgreSQL");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());
const MOCKED_HERO = { name: 'Iron Man', power: 'Money' };

describe("Postgres Strategy", function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    await context.connect();
  })

  it('Postgres Connection', async () => {
    const result = await context.isConnected()
    assert.equal(result, true)
  });

  it('Save heroes on Postgres', async () => {
    const res = await context.create(MOCKED_HERO);
    delete res.id;
    assert.deepEqual(res, MOCKED_HERO);
  });

  it('List heroes on Postgres', async () => {
    const [res] = await context.read({ name: MOCKED_HERO.name });
    delete res.id;
    assert.deepEqual(res, MOCKED_HERO);
  });

  it('Update heroes on Postgres', async () => {
    // const [res] = await context.read({ name: MOCKED_HERO.name });
    // delete res.id;
    // assert.deepEqual(res, MOCKED_HERO);
  });
});
