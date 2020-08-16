const express = require('express');
const { unimplementedView } = require('../controllers/not-implemented-controller')();
const authAdmin = require('../middlewares/auth-admin');
const authUser = require('../middlewares/auth-user');
const registerPartnerValidator = require('../middlewares/request_validators/register-partner-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const PartnersModel = require('../models/mongodb/partners-model');
const errResponse = require('../utils/error-response-handler');
const { registerPartners } = require('../controllers/partners-controller')(errResponse, AuthsModel, PartnersModel);

const PartnersRouter = express.Router();

PartnersRouter
  .route('/partners')
  .post(authAdmin, registerPartnerValidator, registerPartners) // admin can register new partner
  .get(authAdmin, unimplementedView); // admin can get all partners

PartnersRouter
  .route('/partners/:partnerId')
  .get(authUser, unimplementedView) // rider or admin can view rider profile
  .put(authUser, unimplementedView)
  .patch(authUser, unimplementedView)
  .delete(authUser, unimplementedView); // delete or deactivate partner account

module.exports = { PartnersRouter };
