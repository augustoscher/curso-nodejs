const commander = require('commander');
const database = require('./database');


//node index.js --help
//async function main(){}
const main = async() => {
    commander
        .version('v1')
        .parse(process.argv);
}

main();