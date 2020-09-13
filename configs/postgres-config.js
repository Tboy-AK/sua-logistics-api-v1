const { Pool } = require('pg');
require('dotenv').config();

const connObj = {};

switch (process.env.NODE_ENV) {
  case 'development':
    connObj.connectionString = process.env.PG_DEV_DATABASE_URL;
    break;
  case 'test':
    connObj.user = process.env.PG_TEST_USER;
    connObj.password = process.env.PG_TEST_PASSWORD;
    connObj.host = process.env.PG_TEST_HOST;
    connObj.port = process.env.PG_TEST_PORT;
    connObj.database = process.env.PG_TEST_DATABASE;
    break;
  default:
    connObj.connectionString = process.env.PG_DATABASE_URL;
    break;
}

module.exports = new Pool(connObj);
