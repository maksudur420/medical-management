const feedback = require("../../../../models/feedback");

const saveFeedback = {
  async getAllFeedback(req, res) {
    const result = await feedback.find();
    res.send({ success: true, data: result });
  },
  async create(req, res) {
    try {
      const feedbackInfo = req.body;
      const result = await feedback.create(feedbackInfo);
      res.send({ success: true, data: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
};
module.exports = saveFeedback;
