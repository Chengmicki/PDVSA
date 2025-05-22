const User = require('../models/User');
const Wallet = require('../models/wallet'); // Import Wallet model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
// After newUser.save(), check if wallet exists before creating one
const existingWallet = await Wallet.findOne({ userId: newUser._id });
if (!existingWallet) {
  const newWallet = new Wallet({
    userId: newUser._id,
    balances: {
      DOGE: 0,
      USDT: 0,
      BTC: 0,
      ETH: 0,
      XRP: 0,
      LTC: 0,
      SOL: 0
    }
  });
  await newWallet.save();
}


    res.status(201).send('User created and wallet initialized');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.dashboard = async (req, res) => {
  // Assuming you have a middleware that sets req.user from the token
  res.json({ email: req.user.email });
};
