const { body } = require('express-validator');

exports.updateAccountValidation = [
    body('accountType').optional().isString(),
    body('accountHolder.firstName').optional().isString(),
    body('accountHolder.lastName').optional().isString(),
    body('accountHolder.contactInfo.email').optional().isEmail(),
    body('accountHolder.contactInfo.phone').optional().isMobilePhone(),
    body('balance').optional().isNumeric(),
];