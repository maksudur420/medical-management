const savePayment = require("../../../api/v1/payment/controller/savePayment");
const verifyOrganizer = require("../../../middlewares/verifyOrganizer");
const verifyToken = require("../../../middlewares/verifyToken");

const router = require("express").Router();

router.get(
  "/payments/:email",
  verifyToken,
  savePayment.getPaymentHistoryUserWise
);
router.post("/payments", savePayment.paymentCreate);
router.post("/create-payment-intent", savePayment.paymentIntent);
module.exports = router;
