const mongoose = require("mongoose");
const {
  findParticipantIdByEmail,
} = require("../../../../lib/findparticipantIdByEmail");
const upcomingParticipants = require("../../../../models/upcomingParticipants");
const UpCommingCamp = require("../../../../models/UpCommingCamp");
const Joincamp = require("../../../../models/joincamp");

const saveupcomingParticipants = {
  async getparticipantscampIdWise(req, res) {
    const id = req.params.id;
    const result = await upcomingParticipants
      .find({
        upcomingcamp: new mongoose.Types.ObjectId(id),
      })
      .exec();
    res.send(result);
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
        upcomingcampId,
      } = req.body;
      const participantId = await findParticipantIdByEmail(participantEmail);

      const participantInfo = await upcomingParticipants.create({
        name,
        age,
        gender,
        phone,
        address,
        fees,
        healthInfo,
        emergencyContact,
        participant: participantId,
        upcomingcamp: upcomingcampId,
      });
      await UpCommingCamp.findOneAndUpdate(
        { _id: upcomingcampId },
        { $inc: { participantCount: 1 } },
        { new: true, upsert: true }
      );
      res.send({ success: true, data: participantInfo });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async acceptParticipant(req, res) {
    try {
      const id = req.params.id;
      const {
        name,
        age,
        gender,
        phone,
        address,
        fees,
        healthInfo,
        emergencyContact,
        participant,
        camp,
      } = req.body;
      if (
        !name ||
        !age ||
        !gender ||
        !phone ||
        !address ||
        !fees ||
        !healthInfo ||
        !emergencyContact ||
        !camp
      ) {
        return res.status(400).send({ error: "Missing required fields" });
      }

      const joincamp = await Joincamp.create({
        name,
        age,
        gender,
        phone,
        address,
        fees,
        healthInfo,
        emergencyContact,
        participant,
        camp,
      });

      await upcomingParticipants.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });

      res.send({ success: true, data: joincamp });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
};
module.exports = saveupcomingParticipants;
