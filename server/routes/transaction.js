const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['send', 'convert'], required: true },
  currency: { type: String },            // for "send"
  amount: { type: Number, required: true },
  toAddress: { type: String },            // for "send"
  fromCurrency: { type: String },         // for "convert"
  toCurrency: { type: String },           // for "convert"
  convertedAmount: { type: Number },      // for "convert"
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
