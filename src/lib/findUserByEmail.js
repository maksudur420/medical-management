const Users = require("../models/Users");

async function findUserByEmail(email) {
  const user = await Users.findOne({ email: email });
  if (user) {
    return user.id;
  }
  return null;
}
module.exports = { findUserByEmail };
