//npm i hapi
//npm i vision inert hapi-swagger@9.1.3
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", 'Unknow ENV conf.');

const configPath = join(__dirname, '../config', `.env.${env}`);

config({
  path: configPath
})

const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const HeroSchema = require("./db/strategies/mongodb/schemas/heroSchema");
const HeroRoute = require("./routes/heroRoutes");
const AuthRoute = require("./routes/authRoutes");
const HapiJwt = require('hapi-auth-jwt2');

const Postgres = require('./db/strategies/postgres/postgreSQL')
const UserSchema = require('./db/strategies/postgres/schemas/userSchema')

const JWT_SECRET = process.env.JWT_KEY;

const HapiSwagger = require("hapi-swagger");
const Vision = require("vision");
const Inert = require("inert");

const mapRoutes = (instance, methods) => {
  return methods.map(method => instance[method]());
};

const app = new Hapi.Server({ port: process.env.PORT });

const main = async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));
  const connectionPostgres = await Postgres.connect();
  const model = await Postgres.defineModel(connectionPostgres, UserSchema);
  const contextPostgres = new Context(new Postgres(connectionPostgres, model));


  const swaggerOptions = {
    info: {
      title: "Hero API",
      version: "v1"
    },
    lang: "en"
  };

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // }
    validate: async (data, request) => {
      //verifica no banco se o usuário continua ativo.
      //verifica no banco se o usuario continua pagando.

      const [result] = await contextPostgres.read({
        username: data.username.toLowerCase()
      });

      if (!result) {
        return {
          isValid: false
        }
      }
      return {
        isValid: true
      }
    }
  });

  app.auth.default('jwt');

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
  ]);

  await app.start();
  console.log(`Server Running on port ${app.info.port}...`);

  return app;
};

module.exports = main();
