const express = require('express');
const registerCustomerValidator = require('../middlewares/request_validators/register-customer-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const RidersModel = require('../models/mongodb/riders-model');
const errResponse = require('../utils/error-response-handler');
const { registerRiders } = require('../controllers/riders-controller')(errResponse, AuthsModel, RidersModel);

const RidersRouter = express.Router();

RidersRouter
  .route('/riders')
  .post(registerCustomerValidator, registerRiders);

module.exports = { RidersRouter };
