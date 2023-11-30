const { model, Schema } = require("mongoose");
const FeedbackSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  campName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
});
const Feedback = model("Feedback", FeedbackSchema);

module.exports = Feedback;
