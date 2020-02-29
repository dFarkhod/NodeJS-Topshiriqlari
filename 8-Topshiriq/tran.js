const mongoose = require('mongoose');
const currency = require('currency.js');
const init = require('./init');

async function transferMoney(senderAccountId, receiveAccountId, amount) {
    // connect the DB and get the User Model
    const User = await init();

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // always pass session to find queries when the data is needed for the transaction session
        const sender = await User.findOne({ accountId: senderAccountId }).session(session);

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

        const receiver = await User.findOne({ accountId: receiverAccountId }).session(session);

        receive.balance = currency(receiver.balance).add(amount);

        await receiver.save();

        // commit the changes if everything was successful
        await session.commitTransaction();
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

transferMoney('SA1002001', 'SA3104215', 100);