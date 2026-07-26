const express = require("express");
const router = express.Router();

const {
  addRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} = require("../controller/roomController");

router.post("/add", addRoom);
router.get("/", getRooms);
router.put("/update/:id", updateRoom);
router.delete("/delete/:id", deleteRoom);

module.exports = router;