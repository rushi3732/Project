const { body } = require('express-validator');

// exports.createAccountValidation = [
//   body('username').notEmpty().withMessage('Username is required'),
//   body('businessName').notEmpty().withMessage('Business name is required'),
//   body('email').isEmail().withMessage('Invalid email format'),
//   body('zip').notEmpty().withMessage('ZIP code is required'),
// ];

exports.createAccountValidation = [
  body('accountNumber').notEmpty().withMessage('Account number is required'),
  body('accountType').notEmpty().withMessage('Account type is required'),
  body('accountHolder.firstName').notEmpty().withMessage('First name is required'),
  body('accountHolder.lastName').notEmpty().withMessage('Last name is required'),
  body('accountHolder.contactInfo.email').isEmail().withMessage('Invalid email format'),
  body('accountHolder.contactInfo.phone').notEmpty().withMessage('Phone number is required'),
  body('balance').isFloat().withMessage('Invalid balance format'),
  // Add validation for other fields as needed
];
