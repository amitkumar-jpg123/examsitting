const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");

  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },

});

// File Filter
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(
    file.mimetype
  );

  if (mimetype && extname) {

    return cb(null, true);

  }

  cb(new Error("Only JPG, JPEG & PNG Images Allowed"));

};

// Upload Middleware
const upload = multer({

  storage,

  fileFilter,

});

module.exports = upload;