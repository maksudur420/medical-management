const Camps = require("../../../../models/Camps");
const Payment = require("../../../../models/Payment");
const Users = require("../../../../models/Users");
const Feedback = require("../../../../models/feedback");

const saveUsers = {
  async getAllUsers(req, res) {
    const result = await Users.find();
    res.send(result);
  },
  async getAllProfessionalUser(req, res) {
    const result = await Users.find({ role: "professional" });
    res.send({ success: true, data: result });
  },
  async getUsersByEmail(req, res) {
    const requestedEmail = req.params.email;
    if (requestedEmail !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const query = { email: requestedEmail };
    const user = await Users.findOne(query);
    res.send({ data: user });
  },
  async getRole(req, res) {
    const requestedEmail = req.params.email;
    if (requestedEmail !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const query = { email: requestedEmail };
    const user = await Users.findOne(query);
    res.send({ role: user.role });
  },
  async create(req, res) {
    try {
      const user = req.body;
      const result = await Users.create(user);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async updateProfile(req, res) {
    const email = req.params.email;
    const user = req.body;
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const result = await Users.updateOne(
      { email },
      { $set: { ...user, timestamp: Date.now() } },
      { upsert: true }
    );
    res.send({ success: true, data: result });
  },
  async update(req, res) {
    try {
      const email = req.params.email;
      const user = req.body;

      // Check if the user exists
      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res.send(existingUser);
      }

      // Update the user if exists, or create a new one
      const result = await Users.updateOne(
        { email },
        { $set: { ...user, timestamp: Date.now() } },
        { upsert: true }
      );

      res.send({ success: true, data: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async getAdminStats(req, res) {
    try {
      const users = await Users.estimatedDocumentCount();
      const feedback = await Feedback.estimatedDocumentCount();
      const camps = await Camps.estimatedDocumentCount();

      const result = await Payment.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$price",
            },
          },
        },
      ]);

      const revenue = result.length > 0 ? result[0].totalRevenue : 0;

      res.send({
        users,
        feedback,
        camps,
        revenue,
      });
    } catch (error) {
      console.error("Error in getAdminStats:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
};
module.exports = saveUsers;
