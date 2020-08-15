const express = require('express');
require('dotenv').config();

// Require routers
const { MainPageRouter } = require('./routers/main-page-router');
const { ApiNavRouter } = require('./routers/api-nav-router');
const { AdminPageRouter } = require('./routers/admin-page-router');

const server = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

server.use('/', [MainPageRouter]);
server.use('/api', [ApiNavRouter]);
server.use('/admin', [AdminPageRouter]);

server.listen(port, () => {
  console.log(`Listening on ${hostname}:${port}`);
});
