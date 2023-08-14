var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        required: true,
        unique: true, // Make sure this is set
        // ...
      },
    password: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
