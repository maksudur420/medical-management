const Payment = require("../../../../models/Payment");
const Joincamp = require("../../../../models/joincamp");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const savePayment = {
  async paymentIntent(req, res) {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
  async getPaymentHistoryUserWise(req, res) {
    const email = req.params.email;
    const result = await Payment.find({ email: email })
      .populate("camp")
      .populate("registerdcampId")
      .exec();
    res.send({ success: true, data: result });
  },
  async paymentCreate(req, res) {
    try {
      const { email, price, transactionId, date, registerdcampId, camp } =
        req.body;
      const result = await Payment.create({
        email,
        price,
        transactionId,
        date,
        registerdcampId,
        camp,
      });
      await Joincamp.updateOne(
        { _id: registerdcampId },
        { $set: { paymentstatus: "Paid" } }
      );
      res.send({ success: true, data: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
};
module.exports = savePayment;
