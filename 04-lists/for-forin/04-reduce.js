const { getPeople } = require('./service');

Array.prototype.myReduce = function(callback, initialValue) {
  let finalValue = typeof initialValue !== undefined ? initialValue : this[0];
  for (let i = 0; i <= this.length; i++){
    finalValue = callback(finalValue, this[i], this);
  }
  return finalValue;
}

async function main() {
  try {
    const { results } = await getPeople('a');
    const heights = results.map(item => parseInt(item.height))
    const sum = heights.reduce((prev, next) => {
      return prev + next;
    }, 0);

    console.log('sum: ', sum);
    console.log();

    const myList = [
      ['Augusto', 'Scher'],
      ['Node', 'Javascript']
    ]
    let total = myList.myReduce((ant, prox) => {
      return ant.concat(prox)
    }, [])

    console.log('total: ', total);
    total = total.join(', ');
    console.log('total: ', total);
  } catch(error) {
    console.error('Deu ruim: ', error);
  }
}

main();
