const Mongoose = require("mongoose");

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
  console.log("Database rodando!");
});

//0- Desconected
//1- Connected
//2- Conecting
//3- Desconecting
// const state = connection.readyState;
// console.log('state: ', state);