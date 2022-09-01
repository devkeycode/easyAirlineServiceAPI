//This file contains the logic to define schema for airline resource
const mongoose = require("mongoose");

const airlineScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airline", airlineScehma);
