const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/virtualdars', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            winston.debug('MongoDBga ulanish hosil qilindi...');
        });
    mongoose.set('useFindAndModify', false);
}