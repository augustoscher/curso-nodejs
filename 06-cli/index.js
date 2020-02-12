const commander = require('commander');
const database = require('./database');
const Hero = require('./Hero');

//node index.js --help
//node index.js -V
//async function main(){}

//node index.js -s -n Flash -p Speed
const main = async() => {
  commander
      .version('v1')
      .option('-n, --name [value]', "Hero Name")
      .option('-p, --power [value]', "Hero Power")

      .option('-s, --save', "Save Hero")
      .parse(process.argv);
  
  const hero = new Hero(commander);
  console.log(hero);

  try {
    if (commander.save) {
      const resultado = await database.save(hero)
    }
    
  } catch(e) {
    console.error('Deu ruim', e)
  }
}

main();