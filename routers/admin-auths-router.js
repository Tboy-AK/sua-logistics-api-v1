const express = require('express');
const registerCustomerValidator = require('../middlewares/request_validators/user-login-validator');
const errResponse = require('../utils/error-response-handler');
const AuthsModel = require('../models/mongodb/auths-model');
const AdminModel = require('../models/mongodb/admins-model');
const { adminAccess } = require('../controllers/admin-page-controller')(errResponse, AuthsModel, AdminModel);

const AdminAuthsRouter = express.Router();

AdminAuthsRouter
  .route('/auths')
  .post(registerCustomerValidator, adminAccess);

module.exports = { AdminAuthsRouter };
