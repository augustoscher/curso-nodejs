/*

=== REFACT CALLBACKS PATTERN WITH PROMISES === 

0- Obter usuário
1- Obter o número de telefone de um usuário a partir de seu ID
2- Obter o endereço do usuário pelo ID
*/

//importando um módulo do node.js
const util = require('util');

const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // return reject(new Error('Deu ruim de verdade!'));
      return resolve({
        id: 1,
        name: 'Aladin',
        birthDate: new Date(),
      });
    }, 1000)
  })
}

const getPhone = (idUser) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        phone: '110099002',
        ddd: 11,
      });  
    }, 2000);
  })
}

const getAddress = (idUser, callback) => {
  setTimeout(() => {
    return callback(null, {
      street: 'Rua dos bobos',
      number: 45,
      city: 'Knowhere'
    });
  }, 2000);
}

const getAddressAsync = util.promisify(getAddress)


// ----- EXECUTION ----- 

//1- Adicionar async na function e automaticamente ela retornará uma promise
async function main() {
  try {

    console.time('execution-time')
    const user = await getUser();
    // const phone = await getPhone(user.id)
    // const address = await getAddressAsync(user.id)

    const result = await Promise.all([
      getAddressAsync(user.id),
      getPhone(user.id)
    ]);

    //Indexado pela ordem do Promise.all
    const phone = result[1];
    const address = result[0];

    console.log(`
      Name: ${user.name},
      Phone: (${phone.ddd}) ${phone.phone},
      Address: ${address.street}, ${address.number}, ${address.city}
    `);

    console.timeEnd('execution-time')

  } catch(error) {
    console.error('Deu ruim', error);
  }
}

main();
