const createToken = require("../../../api/v1/authentication/controllers/createToken");

const router = require("express").Router();

router.post("/jwt", createToken);

module.exports = router;
