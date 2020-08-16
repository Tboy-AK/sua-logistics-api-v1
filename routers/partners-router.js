const express = require('express');
const authAdmin = require('../middlewares/auth-admin');
const registerPartnerValidator = require('../middlewares/request_validators/register-partner-validator');
const AuthsModel = require('../models/mongodb/auths-model');
const PartnersModel = require('../models/mongodb/partners-model');
const errResponse = require('../utils/error-response-handler');
const { registerPartners } = require('../controllers/partners-controller')(errResponse, AuthsModel, PartnersModel);

const PartnersRouter = express.Router();

PartnersRouter
  .route('/partners')
  .post(authAdmin, registerPartnerValidator, registerPartners);

module.exports = { PartnersRouter };
