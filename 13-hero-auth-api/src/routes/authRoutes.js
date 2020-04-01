//npm i jsonwebtoken
//npm i hapi-auth-jwt2

const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const failAction = (request, headers, error) => {
  throw error;
}

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this._secret = secret;
  }

  login() {
    return {
      path: "/login",
      method: "POST",
      handler: async (request, headers) => {
        const { username, password } = request.payload;
        if (username.toLowerCase() !== 'xunda') {
          return Boom.unauthorized()
        }

        const token = Jwt.sign({
          username,
          id: 1
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
