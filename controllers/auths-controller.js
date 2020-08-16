/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const authsController = (errResponse, AuthModel) => {
  const userSignin = (req, res) => {
    // validate user request data
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return errResponse(res, 422, validationError
        .array({ onlyFirstError: true }));
    }

    const reqBody = req.body;

    // check that user exists
    return AuthModel.findOne({ email: reqBody.email })
      .then((result) => {
        if (!result) return errResponse(res, 401);

        // compare user password
        return compare(reqBody.password, result.password)
          .then(async (isPasswordValid) => {
            if (!isPasswordValid) return errResponse(res, 401, 'Incorrect password');

            // create user access token
            const userPayload = {
              uid: result._id,
              email: result.email,
            };
            const accessTokenOptions = {
              algorithm: 'HS256', audience: result.userType, expiresIn: 600, issuer: 'SUA',
            };
            const accessToken = sign(userPayload, process.env.RSA_PRIVATE_KEY, accessTokenOptions);
            const refreshTokenOptions = { ...accessTokenOptions, expiresIn: 30 * 24 * 3600 };
            const refreshToken = sign(
              userPayload,
              process.env.RSA_PRIVATE_KEY,
              refreshTokenOptions,
            );
            const cookieOptions = {
              maxAge: 30 * 24 * 3600000,
              secure: false,
              sameSite: 'none',
              httpOnly: false,
              path: '/api/v1.0.1/auths/auth/refresh-user-session',
              domain: req.hostname !== 'localhost' ? `.${req.hostname}` : 'localhost',
            };

            return res
              .status(200)
              .header('Authorization', accessToken)
              .cookie('SUALogistics', refreshToken, cookieOptions)
              .json({
                message: 'Successfully logged in',
                accessExp: accessTokenOptions.expiresIn,
                refreshExp: refreshTokenOptions.expiresIn,
              });
          })
          .catch((err) => errResponse(res, 500, err.message));
      })
      .catch((err) => errResponse(res, 500, err.message));
  };

  return { userSignin };
};

module.exports = authsController;
