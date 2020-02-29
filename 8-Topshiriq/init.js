const mongoose = require('mongoose');
const User = require('./models/user');

const connString = 'mongodb://FarkhodPC:27019/trans';
async function initDatabase() {
  await mongoose.connect(connString, {
    replicaSet: 'rs',
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const senderAccountNumber = 'SA1002001';
  const receiverAccountNumber = 'SA3104215';

  const sender = await User.findOne({ accountNumber: senderAccountNumber });
  if (!sender) {
    const sender = new User({
      accountNumber: senderAccountNumber, name: 'Ahmad', balance: 50000.00
    });
    await sender.save();
  }

  const receiver = await User.findOne({ accountNumber: receiverAccountNumber });
  if (!receiver) {
    receiver = new User({
      accountNumber: receiverAccountNumber, name: 'Anvar', balance: 1200.00
    });
    await receiver.save();
  }
}
module.exports = initDatabase;