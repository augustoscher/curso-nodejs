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

const series = ['Better Call Saul', 'Game of Thrones', 'Breaking Bad'];
const indexed = series.map((item, idx) => { return {id: idx, name: item} })
console.log(indexed);