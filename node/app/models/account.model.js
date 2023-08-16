// const mongoose = require('mongoose');

// const accountSchema = new mongoose.Schema({
//   userName: String,
//   businessName: String,
//   email: {
//     type: String,
//     lowercase: true,
//     required: [true, 'Please enter Email Address'],
//     unique: true,
//     dropDups: true
//   },
//   zip: String,
// },
// { timestamps: true });

// module.exports= mongoose.model('Account', accountSchema);

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const accountSchema = new mongoose.Schema({
  accountNumber: { type: Number, unique: true }, // Auto-incremented account number
  accountType: String,
  accountHolder: {
    firstName: String,
    lastName: String,
    contactInfo: {
      email: String,
      phone: String
    }
  },
  balance: Number,
});
accountSchema.plugin(AutoIncrement, {
  inc_field: 'accountNumber',
  start_seq: 36, // Start sequence from 1
});

module.exports = mongoose.model('Account', accountSchema);


