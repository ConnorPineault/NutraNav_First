const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Ensure the uploads directory exists
    },
    filename: function(req, file, cb) {
        // Use the field name and current timestamp to create a unique file name
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
