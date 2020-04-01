//npm i hapi

const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const HeroSchema = require("./db/strategies/mongodb/schemas/heroSchema");

const app = new Hapi.Server({ port: 5000 });

const main = async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));
  app.route([
    {
      path: "/heroes",
      method: "GET",
      handler: (request, head) => {
        return context.read();
      }
    }
  ]);

  await app.start();
  console.log(`Server Running on port ${app.info.port}...`);
};

main();
