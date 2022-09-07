//this file contains the logic for handling the CRUD operations on Booking resource
const Booking = require("../models/booking.model");
const { bookingStatuses } = require("../utils/constants");
const { filterBookingResponseData } = require("../utils/filterResponses");
exports.createBooking = async (req, res) => {
  const bookingObj = {
    flight: req.flightId,
  };
  //check if user is admin,then pass the req.body userid else take the signedinuserid
  if (req.isAdmin) {
    bookingObj.user = req.userIdPassedByAdmin; //admin do the booking for the user on behalf of user
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
      req.body.flight !== undefined ? req.flightId : req.booking.flight;
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

exports.getBoardingPass = async (req, res) => {
  if (req.booking.status !== bookingStatuses.confirmed) {
    return res.status(400).json({
      message: `Booking not yet confirmed.Wait for sometime or contact admin(in case,status not updated.Current Booking status - ${req.booking.status}`,
    });
  }
  const data = await Booking.find({ _id: req.params.id }).populate(
    "user flight"
  );
  return res
    .status(200)
    .json({ data: await filterBookingResponseData(data[0]) });
};
