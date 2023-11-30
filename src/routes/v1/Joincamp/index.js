const saveJoinCamp = require("../../../api/v1/joincamp/controllers/saveJoinCamps");
const verifyOrganizer = require("../../../middlewares/verifyOrganizer");
const verifyToken = require("../../../middlewares/verifyToken");

const router = require("express").Router();
router.get(
  "/register",
  verifyToken,
  verifyOrganizer,
  saveJoinCamp.getAllRegisteredCamp
);
router.get("/fees/register/:id", saveJoinCamp.getFeesIdWise);
router.get(
  "/participant/register/:email",
  verifyToken,
  saveJoinCamp.getParticipantRegisterEmailWise
);
router.get(
  "/participant/paid/register/:email",
  verifyToken,
  saveJoinCamp.getParticipantPaidRegister
);
router.patch(
  "/changeStatus/register/:id",
  verifyToken,
  verifyOrganizer,
  saveJoinCamp.changeStatusIdWise
);
router.post(
  "/register",
  verifyToken,
  saveJoinCamp.saveRegistrationAndUpdateCamp
);
router.delete("/register/:id", verifyToken, saveJoinCamp.deleteRegistration);
module.exports = router;
