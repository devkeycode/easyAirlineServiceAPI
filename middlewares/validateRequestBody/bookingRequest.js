//This middleware contains the logic for validating request bodies coming along with  booking requests.

const { trimValuesInRequestBody } = require("../../utils/trimRequestBody");
const Flight = require("../../models/flight.model");
const User = require("../../models/user.model");
const { bookingStatuses, userTypes } = require("../../utils/constants");
const { isValidObjectId } = require("mongoose");
exports.validateBookingRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req);
  const { flight, status, user } = req.body;
  if (!flight) {
    return res.status(400).json({
      message: "Flight (flightId) is required field and not provided.",
    });
  }

  //get flight details
  const flightDetail = await Flight.findOne({ flightNumber: flight });
  if (flightDetail == null) {
    return res.status(400).json({
      message: "Flight (flightNumber) is  not valid.",
    });
  }
  //valid flightDetail
  req.flightId = flightDetail._id;
  //get the signed in user
  const signedInUser = await User.findOne({ userId: req.userId });
  req.signedInUserId = signedInUser._id;
  if (signedInUser.userType == userTypes.admin) {
    req.isAdmin = true;
  }
  if (status) {
    if (!Object.values(bookingStatuses).includes(status)) {
      return res.status(400).json({
        message:
          "Booking status value is not correct.Allowed values are- IN_PROCESS | CONFIRMED | CANCELLED",
      });
    }
    //ensure only the admin can give status
    if (!req.isAdmin) {
      return res.status(400).json({
        message:
          "Only ADMIN can give status while booking.For customer,default status is IN_PROCESS",
      });
    }
  }
  if (req.isAdmin && !user) {
    //ensure admin is passing the user(to whom booking need to done)
    return res.status(400).json({
      message: "ADMIN need to pass the user(userId).",
    });
  }
  if (user) {
    //if user is passed,then ensure Admin is passing a valid user id , for normal customer, no need to pass that,
    if (!req.isAdmin) {
      return res.status(400).json({
        message: "Only ADMIN can do the booking on behalf of the other user.",
      });
    } else {
      //means the signedInuser is the admin
      //so ensure admin passing a valid userId in user
      // if (!isValidObjectId(user)) {
      //   return res.status(400).json({
      //     message: "Not a valid user(userId)",
      //   });
      // }
      const userPassedByAdmin = await User.findOne({ userId: user });
      if (userPassedByAdmin == null) {
        return res.status(400).json({
          message: "Not a valid user(userId)",
        });
      }
      //othewrise its a valid user
      req.userIdPassedByAdmin = userPassedByAdmin._id;
    }
  }

  //all validation passed
  next();
};

//user can update the status(except changing it to the confirmed,only admin can do that)
exports.validateBookingUpdateRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req);
  const { flight, status } = req.body;
  if (flight == "") {
    return res.status(400).json({
      message: "Flight can't be empty.",
    });
  }
  if (status == "") {
    return res.status(400).json({
      message: "status can't be empty.",
    });
  }
  if (status) {
    if (!Object.values(bookingStatuses).includes(status)) {
      return res.status(400).json({
        message:
          "Booking status value is not correct.Allowed values are- IN_PROCESS | CONFIRMED | CANCELLED",
      });
    }
    if (!req.isAdmin && status !== bookingStatuses.cancelled) {
      //ensure user can only update the status to cancelled, no other update allowed by admin for status
      return res.status(403).json({
        message:
          "Not allowed.As a user, you can only cancel the booking.Only ADMIN can update the Booking status to other statuses.",
      });
    }
    if (status == bookingStatuses.confirmed && !req.isAdmin) {
      return res.status(400).json({
        message: "Only ADMIN can update the Booking status to CONFIRMED.",
      });
    }
  }
  if (flight) {
    if (!req.isAdmin) {
      return res.status(400).json({
        message: "Only ADMIN can update the flight.",
      });
    }

    //get flight details
    const flightDetail = await Flight.findOne({ flightNumber: flight });
    if (flightDetail == null) {
      return res.status(400).json({
        message: "Flight (flightNumber) is  not valid.",
      });
    }
    //valid flightDetail
    req.flightId = flightDetail._id;
  }

  //all validation passed
  next();
};
