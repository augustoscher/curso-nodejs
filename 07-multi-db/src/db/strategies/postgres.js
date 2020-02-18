const { ICrud } = require('./base/iCrud');

class Postgres extends ICrud {
  constructor(){
    super()
  }

  create(item) {
   console.log('item foi salvo em postgres');
  }

  read(query) {
   
  }

  update(id, item) {
   
  }

  delete(id) {
   
  }
}

module.exports = { Postgres };
