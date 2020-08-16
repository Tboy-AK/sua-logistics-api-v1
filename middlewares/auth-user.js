const { verify, TokenExpiredError } = require('jsonwebtoken');
const errResponse = require('../utils/error-response-handler');

const authAdmin = (req, res, next) => verify(
  req.headers.authorization,
  process.env.RSA_PRIVATE_KEY,
  {
    algorithms: ['HS256'],
    issuer: 'SUA',
  },
  (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) return errResponse(res, 403, 'Session expired');
      if (err) return errResponse(res, 403);
      return errResponse(res, 500);
    }
    req.headers.accessTokenPayload = payload;
    return next();
  },
);

module.exports = authAdmin;
