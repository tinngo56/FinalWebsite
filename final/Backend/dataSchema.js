const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    cardNumber: { type: String },
    exp: { type: String },
    cvc: { type: String },
  },
  { collection: "data" }
);

const Subscription = mongoose.model("Subscription", ReactFormDataSchema);
module.exports = Subscription;
