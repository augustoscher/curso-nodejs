const PostgreSQL = require('../src/db/strategies/postgreSQL');
const MongoDB = require('../src/db/strategies/mongodb'); 
const ContextStrategy = require('../src/db/strategies/base/contextStrategy');

const main = () => {
  const contextMongo = new ContextStrategy(new MongoDB());
  const contextPostgre = new ContextStrategy(new PostgreSQL());
  contextMongo.create();
  contextPostgre.create();
}

main();
