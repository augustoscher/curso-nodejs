const { getPeople } = require('./service');

async function main() {
  try {
    const { results } = await getPeople('a');
    const heights = results.map(item => parseInt(item.height))
    const sum = heights.reduce((prev, next) => {
      return prev + next;
    });
    console.log('sum: ', sum);
  } catch(error) {
    console.error('Deu ruim: ', error);
  }
}

main();
