const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const { createAccountValidation } = require('../validation/account.validation');
const { updateAccountValidation } = require('../validation/updateAccount.Validation');

router.post('/saveaccounts', createAccountValidation, accountController.createAccount);
router.get('/accounts', accountController.getAllAccounts);
router.get('/accountsType', accountController.getAllAccountTypes);
router.delete('/accountdeleteById/:accountId', accountController.deleteAccount);
router.put('/accountupdate/:accountId', updateAccountValidation, accountController.updateAccount);

module.exports = router;
3
