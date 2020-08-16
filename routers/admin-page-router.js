const express = require('express');
const { adminPage } = require('../controllers/admin-page-controller')();
const authAdmin = require('../middlewares/auth-admin');
const registerCustomerValidator = require('../middlewares/request_validators/register-customer-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const AdminsModel = require('../models/mongodb/admins-model');
const errResponse = require('../utils/error-response-handler');
const { registerAdmins } = require('../controllers/admins-controller')(errResponse, AuthsModel, AdminsModel);

const AdminPageRouter = express.Router();

AdminPageRouter
  .route('/')
  .get(adminPage)
  .post(authAdmin, registerCustomerValidator, registerAdmins);

module.exports = { AdminPageRouter };
