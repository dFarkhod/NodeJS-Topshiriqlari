const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
    });

const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})

const inventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: SizeSchema,
    status: String
}, { collection: 'inventory' });

const Inventory = mongoose.model('Inventory', inventorySchema);
async function getInventoryItems() {
    const result = await Inventory
        .find({ status: 'A' })
        .sort({ item: 1 })
        .select({ item: 1, qty: 1 })
    console.log(result);
}


getInventoryItems();
