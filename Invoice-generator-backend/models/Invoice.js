const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  user: {type: Schema.Types.ObjectId, rf: "User", required: true},
  date: {type: String, default: String(Date.now) },
  dueDate: {type: String, required: true},  
  nameTo: { type: String, required: true },
  addressTo: { type: String, required: true },
  nameFrom: { type: String, required: true },
  addressFrom: { type: String, required: true },
  items: [
    {
      product: { type: String, required: true },
      amount: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Invoice", InvoiceSchema); 