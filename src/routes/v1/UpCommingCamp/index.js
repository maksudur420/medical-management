const saveUpCommingCamp = require("../../../api/v1/UpCommingCamp/Controller/saveUpCommingCamp");
const verifyOrganizer = require("../../../middlewares/verifyOrganizer");
const verifyToken = require("../../../middlewares/verifyToken");
const router = require("express").Router();

router.get("/upcommingcamps", saveUpCommingCamp.getUpcomingCamps);
router.get("/upcommingcamps/:id", saveUpCommingCamp.getCampIdWise);
router.get(
  "/all/upcommingcamps/:email",
  verifyToken,
  verifyOrganizer,
  saveUpCommingCamp.getAllUpcominsCampUserWise
);
router.post(
  "/upcommingcamps",
  verifyToken,
  verifyOrganizer,
  saveUpCommingCamp.create
);
router.patch(
  "/upcommingcamps/:id",
  verifyToken,
  verifyOrganizer,
  saveUpCommingCamp.updateupcomingCampsIdWise
);
router.delete(
  "/upcommingcamps/:id",
  verifyToken,
  verifyOrganizer,
  saveUpCommingCamp.campDeleteIdWise
);
module.exports = router;
