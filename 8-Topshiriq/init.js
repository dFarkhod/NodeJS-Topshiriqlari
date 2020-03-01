const mongoose = require('mongoose');
const User = require('./models/user');

const connString = 'mongodb://FarkhodPC:27019/trans';
async function initDatabase() {

  // bazaga ulanamiz
  await mongoose.connect(connString, {
    replicaSet: 'rs',
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const senderAccountNumber = 'SA1002001';
  const receiverAccountNumber = 'SA3104215';

  // jo'natuvchini hisob raqami bo'yicha bazadan izlab ko'ramiz
  let sender = await User.findOne({ accountNumber: senderAccountNumber });

  // agar topilmasa, unda bazaga yangi hujjat qo'shamiz
  if (!sender) {
    sender = new User({
      accountNumber: senderAccountNumber, name: 'Ahmad', balance: 50000.00
    });
    await sender.save();
  }

  // oluvchini bazadan hisob raqami bo'yicha izlab ko'ramiz
  let receiver = await User.findOne({ accountNumber: receiverAccountNumber });

  // agar topilmasa, bazaga yangi hujjat qo'shamiz
  if (!receiver) {
    receiver = new User({
      accountNumber: receiverAccountNumber, name: 'Anvar', balance: 1200.00
    });
    await receiver.save();
  }
}

// initDatabase funktsiyasini modulimizda eksport qilamiz
module.exports = initDatabase;