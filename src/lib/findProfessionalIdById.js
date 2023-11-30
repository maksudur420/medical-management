const upcomingProfessional = require("../models/upcomingProfessional");

async function findProfessionalIdById(id) {
  const user = await upcomingProfessional.findOne({ upcomingcamp: id });
  if (user) {
    return user.professionalEmail;
  }
  return null;
}
module.exports = { findProfessionalIdById };
