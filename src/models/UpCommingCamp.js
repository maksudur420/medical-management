const { model, Schema } = require("mongoose");

const UpCommingCampSchema = new Schema({
  campName: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  services: {
    type: String,
    required: true,
    trim: true,
  },
  audience: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  professionalCount: {
    type: Number,
    default: 0,
  },
  participantCount: {
    type: Number,
    default: 0,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const UpCommingCamp = model("UpCommingCamp", UpCommingCampSchema);
module.exports = UpCommingCamp;
