const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet');
const authenticateToken = require('../middleware/auth');

// ✅ Get balances for the authenticated user (no userId in URL anymore)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user._id });

    // If wallet doesn't exist, create it with default balances
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id });
    }

    res.json(wallet.balances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update balance (admin only)
router.post('/update', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const { userId, currency, amount } = req.body;

  if (!['DOGE', 'USDT', 'BTC', 'ETH', 'XRP', 'LTC', 'SOL'].includes(currency)) {
    return res.status(400).json({ message: 'Invalid currency' });
  }

  try {
    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { [`balances.${currency}`]: amount } },
      { new: true, upsert: true }
    );
    res.json(wallet.balances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
