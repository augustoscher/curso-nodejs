const service = require('./service');

async function main() {
  try {
    const result = await service.getPeople('a');
    let names = [];

    console.time('for')
    for (let i = 0; i <= result.results.length -1; i++) {
      names.push(result.results[i].name);
    }
    console.timeEnd('for')
    console.log('for: ', names);
    console.log();

    names = [];
    console.time('forIn')
    for (let i in result.results) {
      names.push(result.results[i].name);
    }
    console.timeEnd('forIn')
    console.log('forIn: ', names);
    console.log();

    //mais performático
    names = [];
    console.time('forOf')
    for (person of result.results) {
      names.push(person.name);
    }
    console.timeEnd('forOf')
    console.log('forOf: ', names);
    console.log();

  } catch(error) {
    console.error('internal error', error);
  }
}

main();
