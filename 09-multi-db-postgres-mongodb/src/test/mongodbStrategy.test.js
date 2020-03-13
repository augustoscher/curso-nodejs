const assert = require("assert");
const Mongo = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Mongo());
const MOCKED_HERO = { name: 'Iron Man', power: 'Money' };
const MOCKED_HERO_DEF = { name: 'Batman', power: 'Money' };

describe("MongoDB Strategy", function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
      await context.connect();
      await context.delete();
      await context.create(MOCKED_HERO_DEF);
    });
  
    it('Mongo Connection', async () => {
      const result = await context.isConnected()
      assert.deepEqual(result, 'Connected')
    });
  
    it("Save heroes on Mongo", async () => {
      const { name, power } = await context.create(MOCKED_HERO);
      assert.deepEqual({ name, power }, MOCKED_HERO);
    });
  
    it("List heroes on Mongo", async () => {
      const [{name, power}] = await context.read({
        name: MOCKED_HERO_DEF.name
      });
      assert.deepEqual({name, power}, MOCKED_HERO_DEF);
    });
  
    // it('Update heroes on Mongo', async () => {
    // });
  
    // it('Delete heroe on Mongo', async () => {
    // });
  });
  