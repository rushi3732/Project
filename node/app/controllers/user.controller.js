const { validationResult } = require('express-validator');
const userService = require('../services/user.service');

module.exports = {
  createUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: 0, errors: errors.array() });
      }

      const savedUser = await userService.createUser(req.body);

      res.status(200).json({
        status: 200,
        success: true,
        data: savedUser,
        message: 'User details saved',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        success: false,
        data: [],
        message: 'Internal server error',
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: 0, errors: errors.array() });
      }

      const { email, password } = req.body;
      const token = await userService.loginUser(email, password);

      res.status(200).json({
        status: 200,
        success: true,
        token: token,
        message: 'User token details',
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    }
  },
};
