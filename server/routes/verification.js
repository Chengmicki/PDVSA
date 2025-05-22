const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Verification = require('../models/Verification');
const authenticateUser = require('../middleware/auth');
const User = require('../models/User');

// ✅ SUBMIT KYC FORM (User)
router.post(
  '/submit',
  authenticateUser,
  upload.single('idUpload'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      // Check for existing submission
      let record = await Verification.findOne({ userId: req.user._id });
      if (record && record.status === 'pending') {
        return res.status(400).json({ message: 'Already pending review.' });
      }

      // Extract filename only
      const filename = req.file.filename;
      const relativePath = `uploads/${filename}`;

      // Prepare new or updated data
      const data = {
        userId: req.user._id,
        fullName: req.body.fullName,
        dob: req.body.dob,
        occupation: req.body.occupation,
        nationality: req.body.nationality,
        ssn: req.body.ssn,
        address: req.body.address,
        documentType: req.body.idType,
        documentImageUrl: relativePath,  // ✅ fixed here
        status: 'pending',
        submittedAt: new Date()
      };

      // Update existing or create new record
      if (record) {
        Object.assign(record, data);
      } else {
        record = new Verification(data);
      }

      await record.save();
      res.status(201).json({ message: 'Verification submitted.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// ✅ CHECK KYC STATUS (User)
router.get('/status', authenticateUser, async (req, res) => {
  try {
    const record = await Verification.findOne({ userId: req.user._id });
    if (!record) {
      return res.status(404).json({ message: 'No record' });
    }
    res.json({ status: record.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET PENDING SUBMISSIONS (Admin Panel)
router.get('/pending', async (req, res) => {
  try {
    const records = await Verification.find({ status: 'pending' })
      .populate('userId', 'email')
      .sort({ submittedAt: -1 });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET VERIFIED SUBMISSIONS (Admin Panel)
router.get('/verified', async (req, res) => {
  try {
    const records = await Verification.find({ status: 'verified' })
      .populate('userId', 'email')
      .sort({ submittedAt: -1 });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// ✅ GET ALL SUBMISSIONS (Admin Panel — KYC Logs)
router.get('/all', async (req, res) => {
  try {
    const records = await Verification.find({})
      .populate('userId', 'email')
      .sort({ submittedAt: -1 });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
