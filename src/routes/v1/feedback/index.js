const saveFeedback = require("../../../api/v1/feedback/controller/saveFeedback");

const router = require("express").Router();
router.get("/feedback", saveFeedback.getAllFeedback);
router.post("/feedback", saveFeedback.create);
module.exports = router;
