//this file contains the logic for handling the CRUD operations on Booking resource
const Booking = require("../models/booking.model");
const { bookingStatuses } = require("../utils/constants");
exports.createBooking = async (req, res) => {
  const bookingObj = {
    flight: req.body.flight,
  };
  //check if user is admin,then pass the req.body userid else take the signedinuserid
  if (req.isAdmin) {
    bookingObj.user = req.body.user; //admin do the booking for the user on behalf of user
    bookingObj.status =
      req.body.status !== undefined
        ? req.body.status
        : bookingStatuses.inprocess;
  } else {
    bookingObj.user = req.signedInUserId; //signedIn userId
    //default status will be considered
    bookingObj.status = bookingStatuses.inprocess;
  }
  try {
    const booking = await Booking.create(bookingObj);
    return res.status(201).json({ data: booking });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

exports.findBookingById = async (req, res) => {
  try {
    return res.status(200).json({ data: req.booking });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

exports.findAllBookings = async (req, res) => {
  let queryObj = {};
  try {
    if (req.query) {
      queryObj = { ...queryObj, ...req.query };
    }
    const bookings = await Booking.find(queryObj);
    return res.status(200).json({ data: bookings });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    req.booking.status =
      req.body.status !== undefined ? req.body.status : req.booking.status;
    req.booking.flight =
      req.body.flight !== undefined ? req.body.flight : req.booking.flight;
    await req.booking.save(); //save in db
    return res
      .status(200)
      .json({ data: req.booking, message: "Booking update successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await req.booking.remove(); //remove the booking in the db
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
