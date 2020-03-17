//npm i hapi

const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const HeroSchema = require("./db/strategies/mongodb/schemas/heroSchema");
const HeroRoute = require('./routes/heroRoutes');

const mapRoutes = (instance, methods) => {
  return methods.map(method => instance[method]())
}

const app = new Hapi.Server({ port: 5000 });

const main = async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));
  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
  ]);

  await app.start();
  console.log(`Server Running on port ${app.info.port}...`);

  return app;
};

module.exports = main();
