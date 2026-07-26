const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

password: {
  type: String,
  required: true,
  select: false,
},
    role: {
      type: String,
      default: "Admin",
    },

    profileImage: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Admin", adminSchema);