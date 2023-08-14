const { body } = require('express-validator');

exports.createAccountValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('businessName').notEmpty().withMessage('Business name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('zip').notEmpty().withMessage('ZIP code is required'),
];
