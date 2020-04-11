//npm i jsonwebtoken
//npm i hapi-auth-jwt2

const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const PasswordHelper = require('../helpers/passwordHelper');

const USER = {
  username: "xunda",
  password: "123"
};

const failAction = (request, headers, error) => {
  throw error;
}

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this._secret = secret;
    this._db = db;
  }

  login() {
    return {
      path: "/login",
      method: "POST",
      handler: async (request, headers) => {
        const { username, password } = request.payload;

        const [user] = await this._db.read({
          username: username.toLowerCase()
        });

        if (!user) {
          return Boom.unauthorized("Invalid user or password.")
        }

        const match = await PasswordHelper.comparePassword(password, user.password);

        if (!match){
          return Boom.unauthorized("Invalid user or password.")
        }

        const token = Jwt.sign({
          username,
          id: user.id
        }, this._secret);

        return {
          //nao colocar a senha do usuário, 
          //pq se alguem tiver acesso ao token, tb terá acessoa a senha
          token
        }
      },
      options: {
        auth: false,
        tags: ['api'],
        description: 'Login on hero API',
        notes: 'Authenticate user and return token',
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
          })
        }
      }
    };
  }

}

module.exports = AuthRoutes;
