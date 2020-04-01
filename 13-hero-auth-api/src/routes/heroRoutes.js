const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');

const headers = Joi.object({
  authorization: Joi.string().required()
}).unknown();

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
          return Boom.internal();
        }
      },
      options: {
        tags: ['api'],
        description: 'List heroes',
        notes: 'Can paginate request and filter by name',
        validate: {
          headers,
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
      handler: async (request, headers) => {
        try {

          const { name, power } = request.payload;

          const result = await this.db.create({name, power});
          return { message: "Heroe sucessfully created", _id: result._id };
        } catch (e) {
          console.log("Deu ruim: ", e);
          return Boom.internal();
        }
      },
      options: {
        tags: ['api'],
        description: 'Create heroes',
        notes: 'Create new hero',
        validate: {
          headers,
          payload: Joi.object({
            name: Joi.string().required().min(3).max(100),
            power: Joi.string().required().min(3).max(15),
          })
        }
      }
    };
  }

  update() {
    return {
      path: "/heroes/{id}",
      method: "PATCH",
      handler: async (request) => {
        try {
          const { id } = request.params;
          const payload = request.payload;

          const aux = JSON.stringify(payload);
          const data = JSON.parse(aux);

          const result = await this.db.update(id, data);
          return {
            _id: id,
            message: "Hero successfully updated",
          };
        } catch (e) {
          console.log("Deu ruim: ", e);
          return Boom.internal();
        }
      },
      options: {
        tags: ['api'],
        description: 'Update hero by id',
        notes: 'Update an existing hero by id',
        validate: {
          headers,
          params: {
            id: Joi.string().required()
          },
          payload: Joi.object({
            name: Joi.string().min(3).max(100),
            power: Joi.string().min(3).max(15),
          })
        }
      }
    };
  }

  delete() {
    return {
      path: "/heroes/{id}",
      method: "DELETE",
      handler: async (request) => {
        try {
          const { id } = request.params;
          console.log('id', id)
          const result = await this.db.delete(id);

          if (result.n !== 1) {
            return Boom.notFound('Hero not found');
          }
          return {
            message: "Hero successfully deleted",
          };
        } catch (e) {
          console.log("Deu ruim: ", e);
          return Boom.internal();
        }
      },
      options: {
        tags: ['api'],
        description: 'Delete hero by id',
        notes: 'Delete an existing hero by id',
        validate: {
          headers,
          params: {
            id: Joi.string().required()
          },
        }
      }
    };
  }

}

module.exports = HeroRoutes;
