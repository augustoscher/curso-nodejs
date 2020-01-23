const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

class Database {

  constructor(){
    this.FILE_NAME = 'heroes.json';
  }

  getData() {
    const file = await readFileAsync(this.FILE_NAME, 'utf8');
    
  }

  writeData() {

  }

  listar() {
    return null;
  }
}

module.exports = new Database();