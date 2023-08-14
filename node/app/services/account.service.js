const Account = require('../models/account.model');

exports.createAccount = async (accountData) => {
  try {
    const newAccount = new Account(accountData);
    return await newAccount.save();
  } catch (error) {
    throw error;
  }
};

exports.getAllAccounts = async () => {
  try {
    return await Account.find({});
  } catch (error) {
    throw error;
  }
};

