const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userName: String,
  businessName: String,
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Please enter Email Address'],
    unique: true,
    dropDups: true
  },
  zip: String,
},
{ timestamps: true });

module.exports= mongoose.model('Account', accountSchema);



