const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const accountSchema = new mongoose.Schema({
    accountType: String,
    accountNumber: { type: Number, unique: true },
    accountHolder: {
        firstName: String,
        lastName: String,
        contactInfo: {
            email: {
                type: String,
                required: true,
                unique: true, // Make sure this is set
            },
            phone: String,
        },
    },
    balance: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

accountSchema.plugin(AutoIncrement, {
    inc_field: 'accountNumber',
    start_seq: 1, // Start sequence from 1
});

module.exports = mongoose.model('Account', accountSchema);