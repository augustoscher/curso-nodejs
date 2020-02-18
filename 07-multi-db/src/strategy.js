class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  update(id, item) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }
}

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

class ContextStrategy extends ICrud {
  constructor(strategy) {
    super();
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(query) {
    return this._database.read(query);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

module.exports = {
  NotImplementedException,
  ICrud,
  Postgres,
  MongoDB,
  ContextStrategy
};
