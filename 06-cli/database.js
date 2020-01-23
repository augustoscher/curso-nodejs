const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

  constructor(){
    this.FILE_NAME = 'heroes.json';
  }

  async getData() {
    const file = await readFileAsync(this.FILE_NAME, 'utf8');
    return JSON.parse(file.toString());
  }

  async writeData(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
    return true;
  }

  async save(hero) {
    const data = await this.getData();
    const id = hero.id <= 2 ? hero.id : Date.now();
    const obj = { id, ...hero };
    const arr = [...data, obj];
    return await this.writeData(arr)
  }

  async list(id) {
    const data = await this.getData();
    const result = data.filter(item => id ? (item.id === id) : true);
    return result;
  }
}

module.exports = new Database();