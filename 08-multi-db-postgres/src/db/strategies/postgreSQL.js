const ICrud = require('./base/iCrud');

class PostgreSQL extends ICrud {
  constructor(){
    super()
  }

  create(item) {
   console.log('item foi salvo em postgreSQL');
  }

  read(query) {
   
  }

  update(id, item) {
   
  }

  delete(id) {
   
  }

  isConnected() {
    
  }
}

module.exports = PostgreSQL;
