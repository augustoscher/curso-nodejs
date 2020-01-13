const { getPeople } = require('./service');

async function main() {
  try {
    const { results } = await getPeople('a');

    const larsFamily = results.filter(item => {
      //Retornar boolean para cada item: true será considerado, false será removido

      //Não encontrou: retora -1
      //Encontrou: retorna a posição do item no array
      return item.name.toLowerCase().indexOf(`lars`) !== -1
    });

    const names = larsFamily.map(item => item.name);
    
    console.log(`lars family: `, larsFamily);
    console.log('lars names: ', names);
  } catch(error) {
    console.error('Deu ruim: ', error);
  }
}

main();


