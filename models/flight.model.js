//This file contains the logic to define schema for flight resource
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String, //flightNumber  is a unique alphanumeric,(generally forming by taking initial letters from airline,(flight belongs to followed by incremental number),but its not manadatory to keep the name like that)
      required: true,
      unique: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //in seconds(generally difference between arrival time and deparature time)
      required: true,
    },
    airline: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Airline",
    },
    flightDate: {
      type: Date,
      required: true,
    },
    departureTime: {
      type: String, //departureTime a plain string 24hrs format like 11:00
    },
    arrivalTime: {
      type: String, //arrivalTime a plain string 24hrs format like 24:00
    },
    price: {
      type: Number,
      required: true,
    },
    boardingGate: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
