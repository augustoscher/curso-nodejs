//npm i hapi
//npm i vision inert hapi-swagger@9.1.3
const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const HeroSchema = require("./db/strategies/mongodb/schemas/heroSchema");
const HeroRoute = require("./routes/heroRoutes");
const AuthRoute = require("./routes/authRoutes");
const HapiJwt = require('hapi-auth-jwt2');

const JWT_SECRET = 'MEU_SEGREDO_123';

const HapiSwagger = require("hapi-swagger");
const Vision = require("vision");
const Inert = require("inert");

const mapRoutes = (instance, methods) => {
  return methods.map(method => instance[method]());
};

const app = new Hapi.Server({ port: 5000 });

const main = async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));

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
    validate: (data, request) => {
      //verifica no banco se o usuário continua ativo.
      //verifica no banco se o usuario continua pagando.
      return {
        valid: true
      }
    }
  });

  app.auth.default('jwt');

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
  ]);

  await app.start();
  console.log(`Server Running on port ${app.info.port}...`);

  return app;
};

module.exports = main();
