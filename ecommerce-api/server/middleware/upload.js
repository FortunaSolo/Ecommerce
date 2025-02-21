// server/middleware/upload.js
const multer = require('multer');
const path = require('path');

// Define storage settings for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the filename
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Set up multer with the above settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
