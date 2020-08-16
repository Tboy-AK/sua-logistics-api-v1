/* eslint-disable no-underscore-dangle */
const { hash, genSaltSync } = require('bcryptjs');
const { validationResult } = require('express-validator');

const customersController = (errResponse, AuthsModel, RidersModel) => {
  const registerRiders = (req, res) => {
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
        reqBody.userType = 'rider';

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

          // save customer data to database
          const newRider = new RidersModel(reqBody);
          return newRider.save((customerErr) => {
            if (customerErr) {
              switch (customerErr.code) {
                case 11000:
                  return errResponse(res, 403, 'User already exists');

                default:
                  return errResponse(res, 500, customerErr.message);
              }
            }

            return res
              .status(201)
              .json({
                message: 'Account successfully registered. You will be informed via email once your account has been verified',
              });
          });
        });
      })
      .catch((err) => errResponse(res, 500, err.message));
  };

  return { registerRiders };
};

module.exports = customersController;
