const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            winston.debug('MongoDBga ulanish hosil qilindi...');
        });
    mongoose.set('useFindAndModify', false);
}