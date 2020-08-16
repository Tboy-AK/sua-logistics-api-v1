/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();

// Require routers
const { MainPageRouter } = require('./routers/main-page-router');
const { ApiNavRouter } = require('./routers/api-nav-router');
const { AdminPageRouter } = require('./routers/admin-page-router');
const { AdminAuthsRouter } = require('./routers/admin-auths-router');
const { CustomersRouter } = require('./routers/customers-router');
const { RidersRouter } = require('./routers/riders-router');
const { PartnersRouter } = require('./routers/partners-router');
const { AuthsRouter } = require('./routers/auths-router');
const { OrdersRouter } = require('./routers/orders-router');

const { urlencoded, json } = express;

const server = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

server.use([urlencoded({ extended: false }), json()]);

server.use('/', [MainPageRouter]);
server.use('/api', [
  ApiNavRouter,
  CustomersRouter,
  RidersRouter,
  PartnersRouter,
  AuthsRouter,
  OrdersRouter,
]);
server.use('/admin', [AdminPageRouter, AdminAuthsRouter]);

server.listen(port, () => {
  console.log(`Listening on ${hostname}:${port}`);
});
