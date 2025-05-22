require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/Transaction');
const walletRoutes = require('./routes/wallet');



const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Mount API routes **before** static/fallback:
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/verification', require('./routes/verification'));
app.use('/api/admin', require('./routes/admin'));      // ✅ Load admin API routes under a separate path


// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve the admin panel HTML
app.use('/admin', express.static(path.join(__dirname, '../pdvsa-admin')));



// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Fallback for anything else (404)
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
