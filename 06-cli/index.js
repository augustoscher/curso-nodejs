const commander = require('commander');
const database = require('./database');
const Hero = require('./Hero');

//node index.js --help
//node index.js -V
//async function main(){}

//node index.js -s -n Flash -p Speed
//node index.js -l
//node index.js -r -i 1581478623768
const main = async() => {
  commander
      .version('v1')
      .option('-n, --name [value]', "Hero Name")
      .option('-p, --power [value]', "Hero Power")
      .option('-i, --id [value]', "Hero Id")

      .option('-s, --save', "Save Hero")
      .option('-l, --list', "List all Heros")
      .option('-r, --remove', "Remove Hero by id")
      .parse(process.argv);
  
  const hero = new Hero(commander);

  try {
    if (commander.save) {
      delete hero.id;
      const result = await database.save(hero);
      if (!result) {
        console.error('Error on saving new Hero');
        return;
      }
      console.log('Hero sucessfuly saved!')
    }

    if (commander.list) {
      const result = await database.list();
      console.log(result);
      return;
    }

    if (commander.remove) {
      const result = await database.remove(hero.id);
      if (!result) {
        console.error('Error while removing Hero!')
        return;
      }
      console.log('Hero sucessfuly removed!') 
    }
  } catch(e) {
    console.error('Deu ruim', e)
  }
}

main();