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

class ContextStrategy extends ICrud {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    this._database.create(item);
  }

  read(query) {
    this._database.read(query);
  }

  update(id, item) {
    this._database.update(id, item);
  }

  delete(id) {
    this._database.delete(id);
  }
}