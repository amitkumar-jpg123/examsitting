const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    subjectCode: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    examDate: {
      type: Date,
      required: true,
    },

    examTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", examSchema);