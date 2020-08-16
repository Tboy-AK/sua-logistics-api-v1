const express = require('express');
const { adminAccess } = require('../controllers/admin-page-controller')();

const AdminAuthsRouter = express.Router();

AdminAuthsRouter
  .route('/auths')
  .post(adminAccess);

module.exports = { AdminAuthsRouter };
