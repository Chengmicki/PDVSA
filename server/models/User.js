const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: {
    crypto: { type: Number, default: 0 },
    realEstate: { type: Number, default: 0 },
    oilStocks: { type: Number, default: 0 }
  },
  isAdmin: { type: Boolean, default: false }  // <--- Add this line
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
