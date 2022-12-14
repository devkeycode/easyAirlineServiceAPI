//This file contains the logic to define schema for booking resource
const mongoose = require("mongoose");
const { bookingStatuses } = require("../utils/constants");

const bookingSchema = new mongoose.Schema(
  {
    //bookingId(here refering to ObjectId _id) will be autoGenerated
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    flight: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Flight",
      required: true,
    },
    status: {
      type: String,
      default: bookingStatuses.inprocess,
      enum: [
        bookingStatuses.inprocess,
        bookingStatuses.confirmed,
        bookingStatuses.cancelled,
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
