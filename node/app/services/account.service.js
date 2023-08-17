const Account = require('../models/account.model');
const AccountsTypes = require('../models/accountsTypes.model');

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


exports.deleteAccount = async (accountId) => {
    try {
        // Use Mongoose to find and remove the account by its ID
        const result = await Account.findByIdAndRemove(accountId);
        return result;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw new Error('Internal server error');
    }
};

exports.getAllAccountTypes = async () => {
    try {
        return await AccountsTypes.find({});
    } catch (error) {
        throw error;
    }
};


