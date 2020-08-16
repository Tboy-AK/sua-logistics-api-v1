const express = require('express');
const { unimplementedView } = require('../controllers/not-implemented-controller')();
const authUser = require('../middlewares/auth-user');
const authOrder = require('../middlewares/auth-order');

const OrdersRouter = express.Router();

OrdersRouter
  .route('/orders')
  .post(authUser, unimplementedView) // user can create new order
  .get(authUser, unimplementedView); // user can get all orders

OrdersRouter
  .route('/orders/:orderId')
  .get(authOrder, unimplementedView) // user can track an order
  .put(authUser, unimplementedView) // change order status
  .patch(authUser, unimplementedView)
  .delete(authUser, unimplementedView); // delete or cancel order

module.exports = { OrdersRouter };
