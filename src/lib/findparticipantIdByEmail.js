const Users = require("../models/Users");

async function findParticipantIdByEmail(email) {
  const user = await Users.findOne({ email: email });
  if (!user) {
    return null;
  }
  if (user.role === "participant") {
    return user.id;
  }
  return null;
}
module.exports = { findParticipantIdByEmail };
