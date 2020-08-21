const { body } = require('express-validator');

const validators = [
  body('email')
    .trim(' ')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Not a valid email')
    .normalizeEmail({ all_lowercase: true }),
  body('password')
    .trim(' ')
    .notEmpty()
    .withMessage('Password is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9a-zA-Z]).{8,24}$/)
    .withMessage('Use a strong password')
    .custom((password, { req }) => password === req.body.confirmPassword)
    .withMessage('Passwords must match')
    .escape(),
  body('phone')
    .trim(' ')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any', { strictMode: true })
    .withMessage('Phone number must include country code'),
  body('businessName')
    .trim(' ')
    .notEmpty()
    .withMessage('Business name is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Business name must be greater than 5 characters')
    .escape(),
  body('address')
    .trim(' ')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 10, max: 100 })
    .withMessage('Address must be greater than 10 characters')
    .escape(),
];

module.exports = validators;
