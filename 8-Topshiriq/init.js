const mongoose = require('mongoose');
// the run-rs command will by default start the replica sets on the following ports
const connString = 'mongodb://FarkhodPC:27017,FarkhodPC:27018,FarkhodPC:27019?replicaSet=rs';
async function init() {
  // connecting the DB
  await mongoose.connect(connString, {
    replicaSet: 'rs',
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // a simple mongoose model
  const User = mongoose.model('User', new mongoose.Schema({
    accountNumber: String, name: String, balance: Number
  }));
  User.createCollection();

  // creating two users
  await User.create([
    { accountNumber: 'SA1002001', name: 'Ahmad', balance: 50000.00 },
    { accountNumber: 'SA3104215', name: 'Anvar', balance: 1200.00 }
  ]);
}
module.exports = init;