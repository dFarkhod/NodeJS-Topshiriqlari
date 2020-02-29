const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    accountNumber: String, name: String, balance: Number
}));

module.exports = User;