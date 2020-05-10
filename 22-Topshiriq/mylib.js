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