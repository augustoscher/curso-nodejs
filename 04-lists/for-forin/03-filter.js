const { getPeople } = require('./service');

//Criando um filter customizado
Array.prototype.myGreatFilter = function (callback) {
  const list = []
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue
    list.push(item)
  }
  return list;
}


async function main() {
  try {
    const { results } = await getPeople('a');

    //usando o filter customizado
    const larsFamily = results.myGreatFilter((item, index, list) => {
      // console.log(`index: ${index}, list: ${list.length}`)
      return item.name.toLowerCase().indexOf(`lars`) !== -1
    });

    // const larsFamily = results.filter(item => {
    //   //Retornar boolean para cada item: true será considerado, false será removido

    //   //Não encontrou: retora -1
    //   //Encontrou: retorna a posição do item no array
    //   return item.name.toLowerCase().indexOf(`lars`) !== -1
    // });

    const names = larsFamily.map(item => item.name);
    
    console.log(`lars family: `, larsFamily);
    console.log('lars names: ', names);
  } catch(error) {
    console.error('Deu ruim: ', error);
  }
}

main();


