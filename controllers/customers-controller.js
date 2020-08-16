/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { hash, genSaltSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const customersController = (errResponse, AuthsModel, CustomersModel) => {
  const registerCustomers = (req, res) => {
    // validate user request data
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return errResponse(res, 422, validationError
        .array({ onlyFirstError: true }));
    }

    // get request data for utilization purposes
    const reqBody = req.body;

    // hash user password
    return hash(reqBody.password, genSaltSync(10))
      .then(async (hashString) => {
        // overwrite password with its hash version
        reqBody.password = hashString;
        reqBody.userType = 'customer';

        // save auth data to database
        const newAuth = new AuthsModel(reqBody);
        newAuth.save((authErr, authResult) => {
          if (authErr) {
            switch (authErr.code) {
              case 11000:
                return errResponse(res, 403, 'User already exists');

              default:
                return errResponse(res, 500, authErr.message);
            }
          }

          reqBody.authId = authResult._id;
          reqBody.registered = true;

          // save customer data to database
          const newCustomer = new CustomersModel(reqBody);
          return newCustomer.save((customerErr, customerResult) => {
            if (customerErr) {
              switch (customerErr.code) {
                case 11000:
                  return errResponse(res, 403, 'User already exists');

                default:
                  return errResponse(res, 500, customerErr.message);
              }
            }

            // create user access token
            const userPayload = {
              uid: authResult._id,
              email: authResult.email,
            };
            const accessTokenOptions = {
              algorithm: 'HS256', audience: reqBody.userType, expiresIn: 600, issuer: 'SUA',
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
              path: '/api/v1.0.1/auth/refresh-user-session',
              domain: req.hostname !== 'localhost' ? `.${req.hostname}` : 'localhost',
            };

            return res
              .status(201)
              .header('Authorization', accessToken)
              .cookie('SUALogistics', refreshToken, cookieOptions)
              .json({
                message: 'User account successfully created',
                email: authResult.email,
                phone: authResult.phone,
                customerId: customerResult._id,
                firstName: customerResult.firstName,
                lastName: customerResult.lastName,
                accessExp: accessTokenOptions.expiresIn,
                refreshExp: refreshTokenOptions.expiresIn,
              });
          });
        });
      })
      .catch((err) => errResponse(res, 500, err.message));
  };

  return { registerCustomers };
};

module.exports = customersController;
