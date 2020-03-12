const Mongoose = require("mongoose");

const main = async () => {
  const res = await model.create({
    name: "Batman",
    power: "Money"
  });
  console.log("Cadastrar: ", res);
  console.log();

  console.log("--- List ---");
  const list = await model.find();
  console.log(list);
};

main();
