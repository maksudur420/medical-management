const { default: mongoose } = require("mongoose");
const {
  findProfessionalIdByEmail,
} = require("../../../../lib/findProfessionalByEmail");
const UpCommingCamp = require("../../../../models/UpCommingCamp");
const upcomingProfessional = require("../../../../models/upcomingProfessional");

const saveupcomingProfessional = {
  async getProfessional(req, res) {
    try {
      const result = await upcomingProfessional
        .find({
          acceptancestatus: "Accepted",
        })
        .populate("upcomingcamp")
        .exec();

      res.send({ success: true, data: result });
    } catch (error) {
      console.error("Error fetching accepted professionals:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async getProfessionalIdWise(req, res) {
    const id = req.params.id;
    const result = await upcomingProfessional
      .find({
        upcomingcamp: new mongoose.Types.ObjectId(id),
      })
      .exec();
    res.send(result);
  },
  async saveprofessionalAndUpdateCamp(req, res) {
    try {
      const {
        name,
        specialization,
        phone,
        address,
        areasOfInterest,
        professionalEmail,
        upcomingcampId,
      } = req.body;

      const participantInfo = await upcomingProfessional.create({
        name,
        specialization,
        phone,
        address,
        areasOfInterest,
        professionalEmail,
        upcomingcamp: upcomingcampId,
      });
      await UpCommingCamp.findOneAndUpdate(
        { _id: upcomingcampId },
        { $inc: { professionalCount: 1 } },
        { new: true, upsert: true }
      );
      res.send({ success: true, data: participantInfo });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async getAcceptprofessional(req, res) {
    const id = req.params.id;
    const result = await upcomingProfessional.updateOne(
      { _id: id },
      { $set: { acceptancestatus: "Accepted" } }
    );
    res.send({ success: true, data: result });
  },
};
module.exports = saveupcomingProfessional;
