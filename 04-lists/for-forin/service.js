const axios = require('axios');
const URL = 'https://swapi.co/api/people';

const getPeople = async (name) => {
  try {
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url);
    return response.data;
  } catch(error) {
    console.error(`service error: `, error);
    const result = {
      results: [
        {name: "Luke Skywalker", age: 34},
        {name: "Akia Lars", age: 65}
      ]
    }
    return result;
  }
}

module.exports = {
  getPeople
}


// .getPeople('r2')
//   .then(result => {
//     console.log('result: ', result);
//   })
//   .catch(error => {
//     console.error('deu ruim: ', error)
//   })