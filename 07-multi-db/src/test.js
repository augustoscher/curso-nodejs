const { Postgres } = require('../src/db/strategies/postgres');
const { MongoDB } = require('../src/db/strategies/mongodb'); 
const { ContextStrategy } = require('../src/db/strategies/base/contextStrategy');

const main = () => {
  const contextMongo = new ContextStrategy(new MongoDB());
  const contextPostgres = new ContextStrategy(new Postgres());
  contextMongo.create();
  contextPostgres.create();
}

main();
