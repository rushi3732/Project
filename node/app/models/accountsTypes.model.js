const mongoose = require('mongoose');

const accountTypeSchema = new mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('AccountsType', accountTypeSchema);
