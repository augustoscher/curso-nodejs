const PostgreSQL = require('./db/strategies/postgreSQL');
const MongoDB = require('./db/strategies/mongodb'); 
const ContextStrategy = require('./db/strategies/base/contextStrategy');

const main = () => {
  const contextMongo = new ContextStrategy(new MongoDB());
  const contextPostgre = new ContextStrategy(new PostgreSQL());
  // contextMongo.create();
  // contextPostgre.create();
}

main();
