const BaseRoute = require('./base/baseRoute');

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
          return this.db.read();
        } catch(e) {
          console.log('Deu ruim: ', e);
          return "Internal Error"
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
