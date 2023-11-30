const Users = require("../models/Users");

async function findOrganizerIdByEmail(email) {
  const user = await Users.findOne({ email: email });
  if (!user) {
    return null;
  }
  if (user.role === "organizer") {
    return user.id;
  }
  return null;
}
module.exports = { findOrganizerIdByEmail };
