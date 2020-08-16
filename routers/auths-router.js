const express = require('express');
const authUser = require('../middlewares/auth-user');
const { unimplementedView } = require('../controllers/not-implemented-controller')();
const userLoginValidator = require('../middlewares/request_validators/user-login-validator');
const errResponse = require('../utils/error-response-handler');
const AuthsModel = require('../models/mongodb/auths-model');
const { userSignin } = require('../controllers/auths-controller')(errResponse, AuthsModel);

const AuthsRouter = express.Router();

AuthsRouter
  .route('/auths')
  .post(userLoginValidator, userSignin); // user login

AuthsRouter
  .route('/auths/:authId')
  .delete(authUser, unimplementedView); // user signout

module.exports = { AuthsRouter };
