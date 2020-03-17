//genrating random array
const randomArray = (length, max) => 
  Array(length).fill().map(() => Math.round(Math.random() * max))

//random array with unique values
const randomSet = (length, max) => {
  const nums = new Set();
  while(nums.size < length) {
    nums.add(Math.floor(Math.random() * max) + 1);
  }
  return [...nums];
}

//map with self index
const series = ['Better Call Saul', 'Game of Thrones', 'Breaking Bad'];
const indexed = series.map((item, idx) => { return {id: idx, name: item} })
console.log(indexed);
console.log();

//call dinamic methods of instance and desctruct the results in array
class Test {
  static methods() {
    return Object.getOwnPropertyNames(this.prototype).filter(
      method => method !== "constructor" && !method.startsWith("_")
    );
  }

  list() {
    return {
      id: 'l',
      name: 'list'
    }
  }

  create() {
    return {
      id: 'c',
      name: 'create'
    }
  }
}

const mapMethods = (instance, methods) => {
  return methods.map(method => instance[method]())
}

const methods = Test.methods();
console.log('instance methods ', methods)


console.log('methods invoc ', mapMethods(new Test(), Test.methods()))
const result = [
  ...mapMethods(new Test(), Test.methods())
];
console.log('destruct on array ', result);
