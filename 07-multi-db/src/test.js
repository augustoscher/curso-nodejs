const {
  ContextStrategy,
  Postgres,
  MongoDB,
} = require('./strategy');

const main = () => {
  const postgres = new Postgres();
  const mongo = new MongoDB();
  let context = new ContextStrategy(mongo);
  context.create();
  context = new ContextStrategy(postgres);
  context.create();
}

main();