const mongoose = require("mongoose");
const UpCommingCamp = require("../../../../models/UpCommingCamp");
const {
  findOrganizerIdByEmail,
} = require("../../../../lib/findOrganizerIdByEmail");
const upcomingParticipants = require("../../../../models/upcomingParticipants");
const upcomingProfessional = require("../../../../models/upcomingProfessional");
const saveUpCommingCamp = {
  async getUpcomingCamps(req, res) {
    const result = await UpCommingCamp.find().exec();

    res.send({ success: true, data: result });
  },
  async getCampIdWise(req, res) {
    const id = req.params.id;
    const result = await UpCommingCamp.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
      .populate("organizer")
      .exec();
    res.send(result);
  },
  async getAllUpcominsCampUserWise(req, res) {
    const user = req.params.email;
    const organizerId = await findOrganizerIdByEmail(user);
    const result = await UpCommingCamp.find({ organizer: organizerId })
      .populate("organizer", "email")
      .exec();
    res.send({ success: true, data: result });
  },
  async create(req, res) {
    try {
      const {
        campName,
        location,
        fees,
        dateTime,
        image,
        services,
        audience,
        description,
        organizerEmail,
      } = req.body;
      const organizerId = await findOrganizerIdByEmail(organizerEmail);

      const newCamp = await UpCommingCamp.create({
        campName,
        location,
        fees,
        dateTime,
        image,
        services,
        audience,
        description,
        organizer: organizerId,
      });
      res.send({ success: true, data: newCamp });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async updateupcomingCampsIdWise(req, res) {
    const {
      campName,
      location,
      fees,
      dateTime,
      image,
      services,
      audience,
      description,
      organizerEmail,
    } = req.body;
    const organizerId = await findOrganizerIdByEmail(organizerEmail);
    const id = req.params.id;
    const filter = { _id: new mongoose.Types.ObjectId(id) };
    const updatedDoc = {
      $set: {
        campName,
        location,
        fees,
        dateTime,
        image,
        services,
        audience,
        description,
        organizer: organizerId,
      },
    };

    const result = await UpCommingCamp.updateOne(filter, updatedDoc);
    res.send({ success: true, data: result });
  },
  async campDeleteIdWise(req, res) {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };
    const result = await UpCommingCamp.deleteOne(query);
    await upcomingParticipants.delete({
      upcomingcamp: new mongoose.Types.ObjectId(id),
    });
    await upcomingProfessional.delete({
      upcomingcamp: new mongoose.Types.ObjectId(id),
    });
    res.send({ success: true, data: result });
  },
};
module.exports = saveUpCommingCamp;
