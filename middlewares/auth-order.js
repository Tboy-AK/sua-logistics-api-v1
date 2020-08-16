const { verify } = require('jsonwebtoken');
const errResponse = require('../utils/error-response-handler');

const authAdmin = (req, res, next) => verify(
  req.query.order_token,
  process.env.RSA_PRIVATE_KEY,
  {
    algorithms: ['HS256'],
    issuer: 'SUA',
    audience: 'order',
    ignoreExpiration: true,
  },
  (err, payload) => {
    if (err) {
      if (err) return errResponse(res, 403);
      return errResponse(res, 500);
    }
    if (payload.status in ['delivered', 'returned', 'complete']) {
      return errResponse(res, 406, 'Ticket is no longer active');
    }
    req.headers.orderTokenPayload = payload;
    return next();
  },
);

module.exports = authAdmin;
