const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' }); // Send JSON

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' }); // Send JSON
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });  // Send JSON
    }
};


// ../middleware/auth.js
module.exports = authenticateToken;  // export function directly

