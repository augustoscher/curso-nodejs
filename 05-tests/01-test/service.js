const axios = require('axios');
const URL = 'https://swapi.co/api/people';

const getPeople = async (name) => {
  try {
    const url = `${URL}/search=${name}&format=json`;
    const result = await axios.get(url);
    return result.data
  } catch(error) {
    console.error(`service error: `, error);
  }
}

module.exports = { getPeople }
