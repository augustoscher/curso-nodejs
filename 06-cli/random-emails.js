const faker = require('faker');

const main = () => {
  const mails = [];
  for(let i = 0; i <= 14; i++) {
    mails.push(faker.internet.exampleEmail());
  }
  console.log(mails);
  console.log()

  //Get random items of an array
  for(let i = 0; i <= 10; i++) {
    console.log(mails[Math.floor(Math.random() * mails.length)]);
  }

  switch (process.env.LEAD_STRATEGY) {
    case 'multiple_leads':
      console.log('multiple');
      break;
    case 'specific_random_leads':
      console.log('specific_random_leads')
      break;
    default:
      console.log('single')
  }
}

main();
