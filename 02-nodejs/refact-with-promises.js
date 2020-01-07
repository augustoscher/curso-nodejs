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
  return new Promise(function resolve(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        name: 'Aladin',
        birthDate: new Date(),
      });
    }, 1000)
  })
}

const getPhone = (idUser, callback) => {
  setTimeout(() => {
    return callback(null, {
      phone: '110099002',
      ddd: 11,
    });
  }, 2000);
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
  .then(result => {
    console.log('resultado:', result)
  })
  .catch(error => {
    console.error('Erro on getUser:', error);
  })


// getUser((error, user) => {
//   //null || "" || 0 === false
//   if (error) {
//     console.error('Erro on getUser:', error);
//     return;
//   }
  
//   getPhone(user.id, (error1, phone) => {
//     if (error1) {
//       console.error('Erro on getPhone:', error1);
//       return;
//     }

//     getAddress(user.id, (error2, address) => {
//       if (error2) {
//         console.error('Erro on getAddress:', error2);
//         return;
//       }

//       console.log(`
//         Name: ${user.name},
//         Address: ${address.street}, ${address.number}, ${address.city},
//         Phone: ${phone.phone}
//       `);
//     })
//   });
// });






