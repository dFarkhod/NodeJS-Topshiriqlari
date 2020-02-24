const mongoose = require('mongoose');
let assert = require('assert');

mongoose.connect('mongodb://FarkhodPC:27019/transactions?replicaSet=rs&retryWrites=false', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDBga ulanish hosil qilindi...'))
  .catch((err) => console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err));

const Customer = mongoose.model('Customer', new mongoose.Schema({ name: String }));

let session = null;
return Customer.createCollection().
  then(() => mongoose.startSession()).
  then(_session => {
    session = _session;
    // Start a transaction
    session.startTransaction();
    return Customer.create([{ name: 'Collection1' }], { session: session });
  }).
  then(() => Customer.create([{ name: 'Collection2' }], { session: session })).
  then(() => session.abortTransaction()).
  then(() => Customer.countDocuments()).
  then(count => console.log('Docs count before commit:', count)).
  //then(() => session.commitTransaction()).
  then(() => Customer.countDocuments()).
  then(count => console.log('Docs count after commit:', count));