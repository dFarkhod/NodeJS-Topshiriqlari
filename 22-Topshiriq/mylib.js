const db = require('./db');

// Sonlarni test qilish - mutlaq qiymat
module.exports.absolute = function (number) {
  return (number >= 0) ? number : -number;
}


// Matnlarni test qilish
module.exports.salam = function (name) {
  return 'Assalomu alaykum, ' + name + '!';
}


// Qatorlarni test qilish
module.exports.getCurrencies = function () {
  return ['UZS', 'MYR', 'TRY'];
}


// Obyektlarni test qilish
module.exports.getProduct = function (productId) {
  return { id: productId, title: 'banana', price: 2 };
}


// Xatolarni test qilish
module.exports.registeruser = function (userName) {
  if (!userName) throw new Error('Username is required');

  return { id: 111, userName: userName }
}


// Mock funtksyalar
module.exports.applyDiscount = function (order) {
  const customer = db.getCustomer(order.customerId);
  if (customer.points > 100)
    order.totalPrice = order.price - (order.price * 0.1);
}