const mongoose = require('mongoose');

const Journal = mongoose.model('Journal', new mongoose.Schema({
    accountNumber: String, operation: String, amount: Number
}));

module.exports = Journal;