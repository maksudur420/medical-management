const { model, Schema } = require("mongoose");
const upcomingProfessionalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  areasOfInterest: {
    type: String,
    required: true,
  },
  professionalEmail: {
    type: String,
    required: true,
  },
  upcomingcamp: {
    type: Schema.Types.ObjectId,
    ref: "UpCommingCamp",
    required: true,
  },
  acceptancestatus: {
    type: String,
    default: "Pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const upcomingProfessional = model(
  "upcomingProfessional",
  upcomingProfessionalSchema
);

module.exports = upcomingProfessional;
