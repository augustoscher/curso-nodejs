const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

class Database {

  constructor(){
    this.FILE_NAME = 'heroes.json';
  }

  async getData() {
    const file = await readFileAsync(this.FILE_NAME, 'utf8');
    return JSON.parse(file.toString());
  }

  writeData() {

  }

  async listar(id) {
    const data = await this.getData();
    const result = data.filter(item => id ? (item.id === id) : true);
    return result;
  }
}

module.exports = new Database();