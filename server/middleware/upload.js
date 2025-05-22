const multer = require('multer');
const path = require('path');

// 1) Tell Multer to save files into /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // __dirname === ...\server\middleware
    // '..' brings us to ...\server
    // 'uploads' is the folder there
    const uploadDir = path.join(__dirname, '..', 'uploads');
    console.log('Saving uploads to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '_' + file.fieldname + path.extname(file.originalname);
    cb(null, name);
  }
});


// 2) Only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowed = ['.png', '.jpg', '.jpeg', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only .png, .jpg, .jpeg & .pdf allowed'));
};

// 3) Put it all together, limit size to 5MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
