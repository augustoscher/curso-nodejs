const assert = require("assert");
const Mongo = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Mongo());
const MOCKED_HERO = { name: 'Iron Man', power: 'Money' };
const MOCKED_HERO_DEF = { name: 'Batman', power: 'Money' };
const MOCKED_HERO_UPD = { name: 'TestUpd', power: 'TestUpd' };
let MOCKED_ID = '';

describe("MongoDB Strategy", function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
      await context.connect();
      await context.create(MOCKED_HERO_DEF);
      const res = await context.create(MOCKED_HERO_UPD);
      MOCKED_ID = res._id;
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
  
    it('Update heroes on Mongo', async () => {
      const result = await context.update(MOCKED_ID, {
        name: 'SpiderMan',
        power: 'Nerd'
      });
      
      assert.deepEqual(result.nModified, 1);
    });
  
    it('Delete heroe on Mongo', async () => {
      const result = await context.delete(MOCKED_ID);
      assert.deepEqual(result.n, 1);
    });
  });
  