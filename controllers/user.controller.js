//this file contains the logic for handling the User Resource

const User = require("../models/user.model");
const Booking = require("../models/booking.model");

const {
  filterUserSetResponse,
  filterUserResponse,
} = require("../utils/filterResponses");
const { bookingStatuses } = require("../utils/constants");

//get all the list of the users
exports.findAllUsers = async (req, res) => {
  const queryObj = {};
  //if optional queryParam passed along with the request,then add them to the queryObj

  if (req.query.userType) {
    queryObj.userType = req.query.userType;
  }

  try {
    const users = await User.find(queryObj);
    return res.status(200).json({
      documentResultsCount: users.length,
      data: filterUserSetResponse(users),
    });
  } catch (error) {
    console.error("Error while fetching all the users", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//get a single user based on userId
exports.findUserByUserId = async (req, res) => {
  try {
    // user validation would have happened in the middleware itself
    return res.status(200).json({
      data: filterUserResponse(req.user),
    });
  } catch (error) {
    console.error("Error while searching the user ", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update specific user
exports.updateUser = async (req, res) => {
  try {
    req.user.name = req.body.name !== undefined ? req.body.name : req.user.name;
    req.user.userId =
      req.body.userId !== undefined ? req.body.userId : req.user.userId;
    req.user.email =
      req.body.email !== undefined ? req.body.email : req.user.email;
    req.user.password =
      req.body.password !== undefined ? req.body.password : req.user.password;
    req.user.userType =
      req.body.userType !== undefined ? req.body.userType : req.user.userType;

    await req.user.save();
    return res
      .status(200)
      .json({
        data: filterUserResponse(req.user),
        message: "User updated successfully.",
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//get all the bookings of the specific user
exports.findAllBookingsofUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    return res.status(200).json({
      resultDocumentCount: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//get boardingPass
exports.getBoardingPass = async (req, res) => {
  if (req.booking.status !== bookingStatuses.confirmed) {
    return res.status(400).json({
      message:
        "Booking not yet confirmed.Please wait for some time, to getting it confirmed and in case, long time no update happens,kindly contact airline.",
    });
  }
  const data = await Booking.find({ _id: req.params.bookingId }).populate(
    "user flight"
  );

  console.log(filterBoardingPassResponse(data));
};
