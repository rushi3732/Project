const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (userData) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userData.password, salt);

      const newUser = new User({
        userName: userData.userName,
        email: userData.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User does not exist');
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ user }, 'hfdkjhsdflkksadfkwoqieuo', {
        expiresIn: '1h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  },
};
