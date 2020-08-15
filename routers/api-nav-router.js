const express = require('express');
const { apiNav } = require('../controllers/api-nav-controller')();

const ApiNavRouter = express.Router();

ApiNavRouter.get('/', apiNav);

module.exports = { ApiNavRouter };
