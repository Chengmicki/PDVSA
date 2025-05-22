const express = require('express');
const router = express.Router();
const Verification = require('../models/Verification');
const User = require('../models/User'); // ✅ Add this line to import User model
const Wallet  = require('../models/wallet');

// ✅ Approve KYC
router.post('/kyc/:id/approve', async (req, res) => {
  try {
    const record = await Verification.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    record.status = 'verified';
    await record.save();
    res.send('Approved');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// ✅ Reject KYC
router.post('/kyc/:id/reject', async (req, res) => {
  try {
    const record = await Verification.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    record.status = 'declined';
    await record.save();
    res.send('Rejected');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// ✅ Delete KYC
router.delete('/kyc/:id', async (req, res) => {
  try {
    const record = await Verification.findById(req.params.id);
    if (!record) return res.status(404).send('Record not found');

    await record.deleteOne();
    res.send('Deleted successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// ✅ GET /api/admin/users — returns users with their wallet balances
router.get('/users', async (req, res) => {
  try {
    const wallets = await Wallet.find()
      .populate({ path: 'userId', select: 'email createdAt' })
      .lean();

    const usersWithBalances = wallets.map(wallet => ({
      _id: wallet.userId._id,
      email: wallet.userId.email,
      createdAt: wallet.userId.createdAt,
      balances: wallet.balances || {
        BTC: 0, ETH: 0, USDT: 0, DOGE: 0, LTC: 0, XRP: 0, SOL: 0, CASH: 0
      }
    }));

    res.json(usersWithBalances);
  } catch (err) {
    console.error('Error fetching users with balances:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// ✅ Update a user's single balance value
router.post('/update-balance', async (req, res) => {
  const { userId, coin, newValue } = req.body;

  if (!userId || !coin || typeof newValue !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    wallet.balances[coin] = newValue;
    await wallet.save();

    res.json({ message: 'Balance updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
