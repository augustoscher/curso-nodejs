const ICrud = require("./base/iCrud");
const Mongoose = require("mongoose");
const STATUS = {
  0: 'Desconected',
  1: 'Connected',
  2: 'Conecting',
  3: 'Desconecting'
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._heroes = null;
    this._connection = null;
  }

  async create(item) {
    return await model.create(item);
  }

  read(query) {}

  update(id, item) {}

  delete(id) {}

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === 'Conected') return state;

    if (state !== 'Conecting') return state;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._connection.readyState];
  }

  async defineModel() {
    const heroeSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      power: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: new Date()
      }
    });

    this._heroes = Mongoose.model("heroe", heroeSchema);
  }

  async connect() {
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
    this._connection = connection;
  }
}

module.exports = MongoDB;
