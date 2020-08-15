const express = require('express');
const { adminPage, adminEntry } = require('../controllers/admin-page-controller')();

const AdminPageRouter = express.Router();

AdminPageRouter
  .route('/')
  .get(adminPage)
  .post(adminEntry);

module.exports = { AdminPageRouter };
