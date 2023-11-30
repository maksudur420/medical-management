const mongoose = require("mongoose");
const {
  findParticipantIdByEmail,
} = require("../../../../lib/findparticipantIdByEmail");
const Camps = require("../../../../models/Camps");
const Joincamp = require("../../../../models/joincamp");

const saveJoinCamp = {
  async getAllRegisteredCamp(req, res) {
    const result = await Joincamp.find().populate("camp");
    res.send({ success: true, data: result });
  },
  async getFeesIdWise(req, res) {
    const id = req.params.id;
    const result = await Joincamp.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).exec();
    res.send(result);
  },
  async getParticipantRegisterEmailWise(req, res) {
    const email = req.params.email;
    const participantId = await findParticipantIdByEmail(email);
    const result = await Joincamp.find({ participant: participantId })
      .populate("participant", "email")
      .populate("camp")
      .exec();
    res.send({ success: true, data: result });
  },
  async getParticipantPaidRegister(req, res) {
    const email = req.params.email;
    const participantId = await findParticipantIdByEmail(email);
    const result = await Joincamp.find({
      participant: participantId,
      paymentstatus: "Paid",
    })
      .populate("participant", "email")
      .populate("camp")
      .exec();
    res.send({ success: true, data: result });
  },
  async saveRegistrationAndUpdateCamp(req, res) {
    try {
      const {
        name,
        age,
        gender,
        phone,
        address,
        fees,
        healthInfo,
        emergencyContact,
        participantEmail,
        campId,
      } = req.body;
      const participantId = await findParticipantIdByEmail(participantEmail);

      const participantInfo = await Joincamp.create({
        name,
        age,
        gender,
        phone,
        address,
        fees,
        healthInfo,
        emergencyContact,
        participant: participantId,
        camp: campId,
      });
      await Camps.findOneAndUpdate(
        { _id: campId },
        { $inc: { participantCount: 1 } },
        { new: true, upsert: true }
      );
      res.send({ success: true, data: participantInfo });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async changeStatusIdWise(req, res) {
    const id = req.params.id;
    const result = await Joincamp.updateOne(
      { _id: id },
      { $set: { confirmationstatus: "Confirmed" } }
    );
    res.send({ success: true, data: result });
  },
  async deleteRegistration(req, res) {
    const id = req.params.id;
    console.log(id);
    const result = await Joincamp.deleteOne({ _id: id });
    res.send({ success: true, data: result });
  },
};
module.exports = saveJoinCamp;
