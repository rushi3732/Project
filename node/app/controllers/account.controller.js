const { validationResult } = require('express-validator');
const accountService = require('../services/account.service');

exports.createAccount = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const newAccount = await accountService.createAccount(req.body);
    res.status(201).json({
      success: true,
      data: newAccount,
      message: 'Account created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json({
      success: true,
      data: accounts,
      message: 'Accounts fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.deleteAccount = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const result = await accountService.deleteAccount(accountId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Account not found',
            });
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const updatedAccountData = req.body;
        const updatedAccount = await accountService.updateAccount(accountId, updatedAccountData);
        res.status(200).json({
            success: true,
            data: updatedAccount,
            message: 'Account updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.getAllAccountTypes = async (req, res) => {
    try {
        const accountTypes = await accountService.getAllAccountTypes();
        res.status(200).json({
            success: true,
            data: accountsTypes,
            message: 'Account Types fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};



