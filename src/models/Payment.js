const { model, Schema } = require("mongoose");

const PaymentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  registerdcampId: {
    type: Schema.Types.ObjectId,
    ref: "Joincamp",
    required: true,
  },
  camp: {
    type: Schema.Types.ObjectId,
    ref: "Camps",
    required: true,
  },
});

const Payment = model("Payment", PaymentSchema);

module.exports = Payment;
