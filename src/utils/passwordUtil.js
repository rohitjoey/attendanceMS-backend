const bcrypt = require("bcrypt");

const generatePassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;
