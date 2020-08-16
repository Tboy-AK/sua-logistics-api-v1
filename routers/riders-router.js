const express = require('express');
const { unimplementedView } = require('../controllers/not-implemented-controller')();
const authAdmin = require('../middlewares/auth-admin');
const authUser = require('../middlewares/auth-user');
const registerCustomerValidator = require('../middlewares/request_validators/register-customer-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const RidersModel = require('../models/mongodb/riders-model');
const errResponse = require('../utils/error-response-handler');
const { registerRiders } = require('../controllers/riders-controller')(errResponse, AuthsModel, RidersModel);

const RidersRouter = express.Router();

RidersRouter
  .route('/riders')
  .post(registerCustomerValidator, registerRiders) // user can registeras a rider
  .get(authAdmin, unimplementedView); // admin can get all riders

RidersRouter
  .route('/riders/:riderId')
  .get(authUser, unimplementedView) // rider or admin can view rider profile
  .put(authUser, unimplementedView) // change user details
  .patch(authUser, unimplementedView)
  .delete(authUser, unimplementedView); // delete or deactivate rider account

module.exports = { RidersRouter };
