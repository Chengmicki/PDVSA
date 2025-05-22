const express = require('express');
const router = express.Router();
const { signup, login, dashboard } = require('../controllers/authController');
const authenticateUser = require('../middleware/auth');

// Signup and login routes
router.post('/signup', signup);
router.post('/login', login);

// Protected dashboard route
router.get('/dashboard', authenticateUser, dashboard);

// New `/me` route to return authenticated user's email
router.get('/me', authenticateUser, (req, res) => {
  res.json({ email: req.user.email });
});

module.exports = router;
