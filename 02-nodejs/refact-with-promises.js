/*
0- Obter usuário
1- Obter o número de telefone de um usuário a partir de seu ID
2- Obter o endereço do usuário pelo ID
*/

//Com lambda
// new Promise((resolve, reject) => {
// })

const getUser = () => {
  //function resolve recebe dois parâmetros:
  //quando der erro, chamaremos: reject(error)
  //quando sucesso, chamaremos: resolve()
  return new Promise(function resolvePromise(resolve, reject) {
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

getUser()
  .then(user => {
    return getPhone(user.id)
      .then(phone => {
        return {
          user: user,
          phone: phone
        }
      })
  })
  .then(result => {
    console.log('result:', result)
  }) 
  .catch(error => {
    console.error('Erro on getPhone:', error);
  })
  .catch(error => {
    console.error('Erro on getUser:', error);
  });

