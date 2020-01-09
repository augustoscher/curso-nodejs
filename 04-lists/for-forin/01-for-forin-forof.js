const service = require('./service');

async function main() {
  try {
    const result = await service.getPeople('a');
    names = [];

    // console.time('for')
    // for (let i = 0; i <= result.results.length -1; i++) {
    //   names.push(result.results[i].name);
    // }
    // console.timeEnd('for')

    // console.time('forIn')
    // for (let i in result.results) {
    //   names.push(result.results[i].name);
    // }
    // console.timeEnd('forIn')

    //mais performático
    console.time('forOf')
    for (person of result.results) {
      names.push(person.name);
    }
    console.timeEnd('forOf')

    console.log(names);
  } catch(error) {
    console.error('internal error', error);
  }
}

main();
