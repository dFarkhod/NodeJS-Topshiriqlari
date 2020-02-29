const mongoose = require('mongoose');
const currency = require('currency.js');
const initDatabase = require('./init');
const User = require('./models/user');
const Journal = require('./models/journal');

async function transferMoney(senderAccountNumber, receiverAccountNumber, amount) {
    // connect the DB and get the User Model
    await initDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // always pass session to find queries when the data is needed for the transaction session
        const sender = await User.findOne({ accountNumber: senderAccountNumber }).session(session);
        if (!sender)
            throw new Error('Sender not found');

        // calculate the updated sender balance
        sender.balance = currency(sender.balance).subtract(amount);

        // if funds are insufficient, the transfer cannot be processed
        if (sender.balance < 0) {
            throw new Error(`User - ${sender.name} has insufficient funds`);
        }

        // save the sender updated balance
        // do not pass the session here
        // mongoose uses the associated session here from the find query return
        // more about the associated session ($session) later on
        await sender.save();

        const debitJournal = new Journal({
            accountNumber: sender.accountNumber, operation: 'Debit', amount: amount
        })
        await debitJournal.save();

        const receiver = await User.findOne({ accountNumber: receiverAccountNumber }).session(session);
        if (!receiver)
            throw new Error('Receiver not found');

        receiver.balance = currency(receiver.balance).add(amount);
        await receiver.save();

        const creditJournal = new Journal({
            accountNumber: receiver.accountNumber, operation: 'Credit', amount: amount
        })
        await creditJournal.save();

        // commit the changes if everything was successful
        await session.commitTransaction();
        console.log('Transaction has been completed successfully!');
    } catch (error) {
        // if anything fails above just rollback the changes here

        // this will rollback any changes made in the database
        await session.abortTransaction();

        // logging the error
        console.error(error);

        // rethrow the error
        throw error;
    } finally {
        // ending the session
        session.endSession();
    }
}

module.exports = transferMoney;