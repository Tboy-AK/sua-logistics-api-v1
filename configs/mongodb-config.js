const mongoose = require('mongoose');

let dbConnectionString;

switch (process.env.NODE_ENV) {
  case 'development':
    dbConnectionString = process.env.MONGO_DEV_DATABASE_URL;
    break;

  case 'test':
    dbConnectionString = process.env.MONGO_TEST_DATABASE_URL;
    break;

  default:
    dbConnectionString = process.env.MONGO_DATABASE_URL;
    break;
}

mongoose.Promise = Promise;
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = { mongoose };
