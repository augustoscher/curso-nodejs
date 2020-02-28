const Sequelize = require("sequelize");
const driver = new Sequelize("heroes", "augustoscher", "minhasenhasecreta", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: false,
});

const main = () => {

}


main();
