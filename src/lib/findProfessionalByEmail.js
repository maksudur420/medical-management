const Users = require("../models/Users");

async function findProfessionalIdByEmail(email) {
  const user = await Users.findOne({ email: email });
  if (!user) {
    return null;
  }
  if (user.role === "professional") {
    return user.id;
  }
  return null;
}
module.exports = { findProfessionalIdByEmail };
