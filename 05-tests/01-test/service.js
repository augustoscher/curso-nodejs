const axios = require('axios');
const URL = 'https://swapi.co/api/people';

const getPeople = async (name) => {
  try {
    const url = `${URL}/?search=${name}&format=json`;
    const result = await axios.get(url);
    return result.data.results.map(mapPerson);
  } catch(error) {
    console.error(`service error: `, error);
  }
}

const mapPerson = (item) => {
  return {
    name: item.name,
    weight: item.mass,
    height: item.height,
  }
}

module.exports = { getPeople }
