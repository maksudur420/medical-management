const saveupcomingProfessional = require("../../../api/v1/upcomingProfessional/controller/saveupcomingProfessional");
const verifyOrganizer = require("../../../middlewares/verifyOrganizer");
const verifyToken = require("../../../middlewares/verifyToken");

const router = require("express").Router();
router.get(
  "/upcomingProfessional",
  verifyToken,
  saveupcomingProfessional.getProfessional
);
router.get(
  "/upcomingProfessional/:id",
  saveupcomingProfessional.getProfessionalIdWise
);
router.post(
  "/upcomingProfessional",
  verifyToken,
  saveupcomingProfessional.saveprofessionalAndUpdateCamp
);
router.patch(
  "/accept/upcomingProfessional/:id",
  verifyToken,
  verifyOrganizer,
  saveupcomingProfessional.getAcceptprofessional
);
module.exports = router;
