const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    block: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);