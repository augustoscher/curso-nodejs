const ICrud = require("./base/iCrud");
const Mongoose = require("mongoose");

class MongoDB extends ICrud {
  constructor() {
    //When we extend a class, we need to call constructor
    super();
  }

  create(item) {}

  read(query) {}

  update(id, item) {}

  delete(id) {}

  async isConnected() {}

  async defineModel() {}

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
    connection.once("open", () => console.log("Database rodando!"));
    //0- Desconected | 1- Connected | 2- Conecting | 3- Desconecting
    // const state = connection.readyState;
    // console.log('state: ', state);
  }
}

module.exports = MongoDB;
