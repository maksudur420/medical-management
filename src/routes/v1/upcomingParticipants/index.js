const saveupcomingParticipants = require("../../../api/v1/upcomingParticipants/controller/saveupcomingParticipants");
const verifyOrganizer = require("../../../middlewares/verifyOrganizer");
const verifyToken = require("../../../middlewares/verifyToken");

const router = require("express").Router();
router.get(
  "/upcomingParticipants/:id",
  saveupcomingParticipants.getparticipantscampIdWise
);
router.post(
  "/upcomingParticipants",
  verifyToken,
  saveupcomingParticipants.saveRegistrationAndUpdateCamp
);
router.post(
  "/acceptParticipants/upcomingParticipants/:id",
  verifyToken,
  verifyOrganizer,
  saveupcomingParticipants.acceptParticipant
);
module.exports = router;
