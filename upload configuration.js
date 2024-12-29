const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files in the "uploads/images" directory
    cb(null, path.join(__dirname, 'images')); // Ensure this path exists or create it
  },
  filename: (req, file, cb) => {
    // Create a unique filename with a timestamp and original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize Multer for handling multiple files (if needed)
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .png, and .gif files are allowed!'));
    }
  },
});

// For endpoints expecting multiple files
const uploadMultiple = upload.array('images', 10); // 'images' is the field name and 10 is the maximum number of files

// For endpoints expecting a single file
const uploadSingle = upload.single('img'); // 'img' is the field name for single files

module.exports = { uploadSingle, uploadMultiple };
