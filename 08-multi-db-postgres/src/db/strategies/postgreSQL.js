const ICrud = require('./base/iCrud');
const Sequelize = require("sequelize");

class PostgreSQL extends ICrud {
  constructor(){
    super()
    this._driver = null;
    this._heroes = null;
  }

  async create(item) {
    const { dataValues } = await this._heroes.create(item)
    return dataValues;
  }

  async read(item = {}) {
    return this._heroes.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return this._heroes.update(item, { where: { id: id } });
  }

  delete(id) {
   
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch(e) {
      console.log('fail: ', e)
    }
  }

  async defineModel() {
    this._heroes = this._driver.define(
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
  
    await this._heroes.sync();
  }

  async connect() {
    this._driver = new Sequelize("heroes", "augustoscher", "minhasenhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false
    });
    await this.defineModel();
  }
}

module.exports = PostgreSQL;
