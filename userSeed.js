const { User } = require('./db/connection.js');

const exampleData = require('./exampleData.json');

User.deleteMany({})
  .then(() => Promise.all(exampleData.map((item) => User.create(item))))
  .then(() => {
    console.log('The database has been seeded!');
  })
  .catch((err) => console.error('Error resetting the database: ', err))
  .then(() => process.exit());