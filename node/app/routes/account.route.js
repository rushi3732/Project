const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const { createAccountValidation } = require('../validation/account.validation');

router.post('/saveaccounts', createAccountValidation, accountController.createAccount);
router.get('/accounts', accountController.getAllAccounts);

module.exports = router;

