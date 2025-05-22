// models/Verification.js
const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  ssn: {
    type: String       // optional, only saved if provided
  },
  address: {
    type: String,
    required: true
  },
  documentType: {      // matches your form’s name="idType"
    type: String,
    required: true
  },
  documentImageUrl: {  // the multer file path
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'declined'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date
});

module.exports = mongoose.model('Verification', verificationSchema);
