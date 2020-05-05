// Sonlarni test qilish - mutlaq qiymat
module.exports.absolute = function (number) {
  if (number > 0) return number;
  if (number < 0) return -number;
  return 0;
}
