//This middleware file handle logic to validate the params passed in booking request

const Booking = require("../../models/booking.model");

const { isValidObjectId } = require("mongoose");
//to check whether valid booking id passed as request paramater
const isValidBookingIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "No BookingId passed as parameter.",
    });
  }
  //check whether bookingId is of valid ObjectId type or not
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Not a valid BookingId.",
    });
  }
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    if (booking == null) {
      return res.status(400).json({
        message: "Not a valid bookingId.",
      });
    }
    //valid bookingId,pass the control to next
    //can pass the booking details, so can be used later in booking updation and getting specific booking detail
    req.booking = booking;
    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).json({
      message: "Internal server error while accessing the  data.",
    });
  }
};

module.exports = {
  isValidBookingIdInReqParam,
};
