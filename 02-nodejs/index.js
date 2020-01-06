/*
0- Obter usuário
1- Obter o número de telefone de um usuário a partir de seu ID
2- Obter o endereço do usuário pelo ID
*/

const getUser = (callback) => {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      name: 'Aladin',
      birthDate: new Date(),
    });
  }, 1000)
}

const getPhone = (idUser, callback) => {
  setTimeout(() => {
    return callback(null, {
      phone: '110099002',
      ddd: 11,
    });
  }, 2000);
}

const getAddress = (idUser) => {

}

const resolvePhone = (error, phone) => {
  console.log('Phone:', phone);
}

// Declaramos a lambda diretamente no parâmetro de getUser
// const resolveUser = (error, user) => {
//   console.log('User:', user);
//   getPhone(user.id, resolvePhone)
// }

getUser((error, user) => {
  //null || "" || 0 === false
  if (error) {
    console.error('Erro on getUser:', error);
    return;
  }
  console.log('User:', user);
  getPhone(user.id, resolvePhone)
});






