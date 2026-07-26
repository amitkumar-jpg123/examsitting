const express = require("express");

const router = express.Router();

const {
  getReport,
} = require("../controller/reportController");

router.get("/", getReport);

module.exports = router;