//This file contains the logic to define schema for review resource (User can post a review/comment on the travelled flight(booked flight))
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: null, //to accomodate the annoymous user, in case no user(userId) has been passed and in case userId passed, it will be taken
    },
    flight: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Flight",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
