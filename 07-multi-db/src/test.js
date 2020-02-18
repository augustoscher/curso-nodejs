const {
  ContextStrategy,
  Postgres,
  MongoDB,
} = require('./strategy');

const main = () => {
  const contextMongo = new ContextStrategy(new MongoDB());
  const contextPostgres = new ContextStrategy(new Postgres());
  contextMongo.create();
  contextPostgres.create();
}

main();