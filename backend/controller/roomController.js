const Room = require("../models/Room");

// ==========================
// Add Room
// ==========================
const addRoom = async (req, res) => {
  try {
    const { roomNo, block, capacity } = req.body;

    if (!roomNo || !block || !capacity) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingRoom = await Room.findOne({ roomNo });

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomNo,
      block,
      capacity,
    });

    return res.status(201).json({
      success: true,
      message: "Room Added Successfully",
      room,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get All Rooms
// ==========================
const getRooms = async (req, res) => {
  try {

    const rooms = await Room.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Update Room
// ==========================
const updateRoom = async (req, res) => {
  try {

    const { id } = req.params;
    const { roomNo, block, capacity } = req.body;

    const room = await Room.findByIdAndUpdate(
      id,
      {
        roomNo,
        block,
        capacity,
      },
      {
        new: true,
      }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room Updated Successfully",
      room,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Delete Room
// ==========================
const deleteRoom = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addRoom,
  getRooms,
  updateRoom,
  deleteRoom,
};