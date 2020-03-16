const ICrud = require("../base/iCrud");
const Mongoose = require("mongoose");
const STATUS = {
  0: 'Desconected',
  1: 'Connected',
  2: 'Conecting',
  3: 'Desconecting'
};

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  create(item) {
    return this._schema.create(item);
  }

  read(query, skip, limit) {
    return this._schema.find(query).skip(skip).limit(limit);
  }

  update(id, item) {
    console.log('id ', id)
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === 'Conected') return state;

    if (state !== 'Conecting') return state;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._connection.readyState];
  }

  static connect() {
    Mongoose.connect(
      "mongodb://augustoscher:minhasenhasecreta@localhost:27017/heroes",
      { useNewUrlParser: true },
      error => {
        if (error) {
          console.log("Connection Error: ", error);
        }
      }
    );

    const connection = Mongoose.connection;
    connection.once("open", () => {
      console.log("Database rodando!")
    });
    return connection;
  }
}

module.exports = MongoDB;
