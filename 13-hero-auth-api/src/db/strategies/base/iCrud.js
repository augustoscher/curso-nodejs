const NotImplementedException = require('./notImplementedException');

class ICrud {
  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  update(id, item, upsert = false) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }

  isConnected() {
    throw new NotImplementedException();
  }

  connect() {
    throw new NotImplementedException();
  }
}

module.exports = ICrud;
