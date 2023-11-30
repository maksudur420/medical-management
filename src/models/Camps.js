const { model, Schema } = require("mongoose");

const CampsSchema = new Schema({
  campName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  fees: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  participantCount: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Camps = model("Camps", CampsSchema);

module.exports = Camps;
