const { body } = require('express-validator');

exports.createAccountValidation = [
    body('accountType').notEmpty().withMessage('Account type is required'),
    body('accountHolder.firstName').notEmpty().withMessage('First name is required'),
    body('accountHolder.lastName').notEmpty().withMessage('Last name is required'),
    body('accountHolder.contactInfo.email').isEmail().withMessage('Invalid email format'),
    body('accountHolder.contactInfo.phone').notEmpty().withMessage('Phone number is required'),
    body('balance').isFloat().withMessage('Invalid balance format'),
    // Add validation for other fields as needed
];
