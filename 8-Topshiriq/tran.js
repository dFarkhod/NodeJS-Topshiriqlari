const mongoose = require('mongoose');
const currency = require('currency.js');
const initDatabase = require('./init');
const User = require('./models/user');
const Journal = require('./models/journal');

async function transferMoney(senderAccountNumber, receiverAccountNumber, amount) {
    // ma'lumotlar omboriga ulanib olib, unda bizga kerakli bo'lgan
    // boshlang'ich ma'lumot yozib qo'yamiz
    await initDatabase();

    // sessiyani boshlaymiz
    const session = await mongoose.startSession();

    // sessiyamiz ichida tranzaktsiya ochamiz
    session.startTransaction();
    try {
        // jo'natuvchini bazadan izlab topamiz, bunda bazaga so'rov berilyapti, shuning uchun
        // tranzaktsiya ichida bajariladigan barcha so'rovlarga sessiyani ham
        // berib yuborishimiz kerak
        let sender = await User.findOne({ accountNumber: senderAccountNumber }).session(session);
        if (!sender)
            throw new Error('Sender not found');

        // jo'natuvchining hisobidan tranzaktsiya miqdoricha pulni ayrib tashlaymiz
        sender.balance = currency(sender.balance).subtract(amount);

        // agarda uning hisobidagi pul yetarli bo'lmasa, xato qaytaramiz
        if (sender.balance < 0) {
            throw new Error(`User - ${sender.name} has insufficient funds`);
        }

        // jo'natuvchiga qilingan o'zgarishlarni bazaga yozib qo'yamiz
        // bu yerda sessiya obyektini berishni keragi yo'q.
        await sender.save();

        // throw new Error('Bu allaqanday bir xato!!! Ajjab bo\'lsin!');
        // jo'natuvchining hisobidan pul yechib olingan amal haqida
        // jurnal yozamiz
        let debitJournal = new Journal({
            accountNumber: sender.accountNumber, operation: 'Debit', amount: amount
        })
        await debitJournal.save();

        // oluvchini bazadan izlab topamiz va agar u topilmasa xato qaytaramiz
        let receiver = await User.findOne({ accountNumber: receiverAccountNumber }).session(session);
        if (!receiver)
            throw new Error('Receiver not found');

        // oluvchining hisobiga tranzaktsiya miqdoricha pulni qo'shamiz
        // va uni bazaga yozib qo'yamiz
        receiver.balance = currency(receiver.balance).add(amount);
        await receiver.save();

        // oluvchining hisobiga pul qo'shilganlik amalini jurnalga yozib qo'yamiz
        let creditJournal = new Journal({
            accountNumber: receiver.accountNumber, operation: 'Credit', amount: amount
        })
        await creditJournal.save();

        // agarda shu joygacha hammasi muvaffaqqiyatli o'tgan bo'lsa, sessiyani commit qilamiz
        await session.commitTransaction();
        console.log('Transaction has been completed successfully!');
    } catch (error) {
        // agarda yuqorida try block ichida bironta xato chiqqan bo'lsa
        // unda barcha qilingan o'zgarishlar bekor qilinadi va 
        // ma'lumotlar omboriga hech narsa yozilmaydi
        await session.abortTransaction();

        console.error(error);
        throw error;
    } finally {
        // har qanday xolatda ham ishimiz so'ngida sessiyani yopamiz
        session.endSession();
    }
}

module.exports = transferMoney;