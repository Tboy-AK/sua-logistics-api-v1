const express = require('express');
const { mainPage } = require('../controllers/main-page-controller')();

const MainPageRouter = express.Router();

MainPageRouter.get('/', mainPage);

module.exports = { MainPageRouter };
