const ICrud = require('./base/iCrud');

class MongoDB extends ICrud {

  constructor(){ //When we extend a class, we need to call constructor
    super()
  }

  create(item) {
   console.log('item foi salvo em mongodb');
  }

  read(query) {
   
  }

  update(id, item) {
   
  }

  delete(id) {
   
  }
}

module.exports = MongoDB;