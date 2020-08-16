const express = require('express');
const registerCustomerValidator = require('../middlewares/request_validators/register-customer-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const CustomersModel = require('../models/mongodb/customers-model');
const errResponse = require('../utils/error-response-handler');
const { registerCustomers } = require('../controllers/customers-controller')(errResponse, AuthsModel, CustomersModel);

const CustomersRouter = express.Router();

CustomersRouter
  .route('/customers')
  .post(registerCustomerValidator, registerCustomers);

module.exports = { CustomersRouter };
