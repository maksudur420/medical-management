require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const verifyOrganizer = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await Users.findOne(query);
  const isOrganizer = user?.role === "organizer";
  if (!isOrganizer) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};
module.exports = verifyOrganizer;
