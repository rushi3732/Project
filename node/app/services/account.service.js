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

exports.updateAccount = async (accountId, updatedAccountData) => {
    try {
        return await Account.findByIdAndUpdate(accountId, updatedAccountData, { new: true });
    } catch (error) {
        throw new Error('Error updating account');
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




