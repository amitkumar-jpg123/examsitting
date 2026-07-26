const express = require("express");

const router = express.Router();

const {
  getAdminProfile,
  updateAdmin,
} = require("../controller/adminController");


// Get Admin Profile
router.get(
  "/profile/:id",
  getAdminProfile
);


// Update Admin Profile
router.put(
  "/update/:id",
  updateAdmin
);


module.exports = router;