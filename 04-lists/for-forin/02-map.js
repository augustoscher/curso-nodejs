const service = require('./service');

async function main() {
  try {
    const result = await service.getPeople('a');

    // const names = [];
    // console.time('forEach')
    // result.results.forEach(element => {
    //   names.push(element.name)
    // });
    // console.timeEnd('forEach')
    // console.log('names: ', names)

    //map é mais performático
    console.time('map')
    // const names3 = result.results.map(item => {
    //   return item.name
    // })
    const names2 = result.results.map(item => item.name);
    console.timeEnd('map')
    
    console.log('names: ', names2)
  } catch(error) {
    console.error('Deu ruim: ', error);
  }
}

main();