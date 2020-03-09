const Sequelize = require("sequelize");
const driver = new Sequelize("heroes", "augustoscher", "minhasenhasecreta", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: false
});

const main = async () => {
  const heroes = driver.define(
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

  await heroes.create({
    name: 'Goku',
    power: 'Strenght'
  });
  let result = await heroes.findAll({ raw: true });
  console.log('result: ', result);
  console.log()
  result = await heroes.findAll({ raw: true, attributes: ['name'] });
  console.log('result2: ', result);
};

main();
