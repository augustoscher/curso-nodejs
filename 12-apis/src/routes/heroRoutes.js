const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/heroes",
      method: "GET",
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query;
          let query = name ? { name: {$regex: `(?i).*${name}*`} } : {};

          return this.db.read(query, skip, limit);
        } catch (e) {
          console.log("Deu ruim: ", e);
          return "Internal Error";
        }
      },
      options: {
        validate: {
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100),
          })
        }
      }
    };
  }

  create() {
    return {
      path: "/heroes",
      method: "POST",
      handler: (request, headers) => {
        // return this.db.create();
      }
    };
  }
}

module.exports = HeroRoutes;
