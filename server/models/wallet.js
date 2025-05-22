// models/wallet.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balances: {
    DOGE: { type: Number, default: 0 },
    USDT: { type: Number, default: 0 },
    BTC: { type: Number, default: 0 },
    ETH: { type: Number, default: 0 },
    XRP: { type: Number, default: 0 },
    LTC: { type: Number, default: 0 },
    SOL: { type: Number, default: 0 },
    CASH: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
