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
      .option('-l, --list', "List all Heros")
      .parse(process.argv);
  
  const hero = new Hero(commander);

  try {
    if (commander.save) {
      const resultado = await database.save(hero);
      if (!resultado) {
        console.error('Error on saving new Hero');
        return;
      }
    }

    if (commander.list) {
      const resultado = await database.list();
      console.log(resultado);
      return;
    }
    
  } catch(e) {
    console.error('Deu ruim', e)
  }
}

main();