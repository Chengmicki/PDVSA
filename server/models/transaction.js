const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    enum: ['investment', 'withdrawal', 'send', 'convert'],
    required: true
  },

  // Used for investment/withdrawal
  category: {
    type: String,
    enum: ['crypto', 'realEstate', 'oilStocks'],
    required: false // optional now for wallet actions
  },

  // Used for 'send'
  currency: { type: String }, // DOGE, USDT, etc.
  toAddress: { type: String },

  // Used for 'convert'
  fromCurrency: { type: String },
  toCurrency: { type: String },
  convertedAmount: { type: Number },

  // Used for all transaction types
  amount: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
