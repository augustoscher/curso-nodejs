const { getPeople } = require('./service');

async function main() {
  try {
    const { results } = await getPeople('a');

  } catch(error) {
    console.error('Deu ruim: ', error);
  }
}

main();
