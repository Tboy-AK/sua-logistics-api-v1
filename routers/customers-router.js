const express = require('express');
const { unimplementedView } = require('../controllers/not-implemented-controller')();
const authAdmin = require('../middlewares/auth-admin');
const authUser = require('../middlewares/auth-user');
const registerCustomerValidator = require('../middlewares/request_validators/register-customer-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const CustomersModel = require('../models/mongodb/customers-model');
const errResponse = require('../utils/error-response-handler');
const { registerCustomers } = require('../controllers/customers-controller')(errResponse, AuthsModel, CustomersModel);

const CustomersRouter = express.Router();

CustomersRouter
  .route('/customers')
  .post(registerCustomerValidator, registerCustomers) // customer signup
  .get(authAdmin, unimplementedView); // get all customers

CustomersRouter
  .route('/customers/:customerId')
  .get(authUser, unimplementedView) // rider or admin can view rider profile
  .put(authUser, unimplementedView)
  .patch(authUser, unimplementedView)
  .delete(authUser, unimplementedView); // delete or deactivate customer account

module.exports = { CustomersRouter };
