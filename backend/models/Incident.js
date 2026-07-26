const mongoose = require("mongoose");


const incidentSchema = new mongoose.Schema(

  {

    // Invigilator Reference

    invigilator: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Invigilator",

      required: [
        true,
        "Invigilator ID is required"
      ],

    },


    // Employee ID

    employeeId: {

      type: String,

      required: [
        true,
        "Employee ID is required"
      ],

      trim: true,

      uppercase: true,

    },


    // Invigilator Name

    invigilatorName: {

      type: String,

      required: [
        true,
        "Invigilator name is required"
      ],

      trim: true,

    },


    // Incident Type

    incidentType: {

      type: String,

      required: [
        true,
        "Incident type is required"
      ],

      enum: [

        "Cheating",

        "Medical Emergency",

        "Late Arrival",

        "Power Failure",

        "Misconduct",

        "Other",

      ],

    },


    // Description

    description: {

      type: String,

      required: [
        true,
        "Description is required"
      ],

      trim: true,

      minlength: 5,

    },


    // Status

    status: {

      type: String,

      enum: [

        "Pending",

        "Resolved",

      ],

      default: "Pending",

    },


  },


  {

    timestamps:true,

  }

);



// Faster Search

incidentSchema.index({
  employeeId:1
});



// Prevent mongoose overwrite error

module.exports =
  mongoose.models.Incident ||
  mongoose.model(
    "Incident",
    incidentSchema
  );