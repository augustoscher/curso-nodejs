const ICrud = require('./base/iCrud');
const Sequelize = require("sequelize");

class PostgreSQL extends ICrud {
  constructor(){
    super()
    this._driver = null;
    this._heroes = null;
    this._connect();
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

  async isConnected() {
    
  }

  defineModel() {
    this._heroes = driver.define(
      "heroes",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          required: true
        },
        power: {
          type: Sequelize.STRING,
          required: true
        }
      },
      {
        tableName: "heroes",
        freezeTableName: false,
        timestamps: false
      }
    );
  
    await heroes.sync();
  }

  _connect() {
    this._driver = new Sequelize("heroes", "augustoscher", "minhasenhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false
    });
  }
}

module.exports = PostgreSQL;
