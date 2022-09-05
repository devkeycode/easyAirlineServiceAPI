//This middleware contains the logic for validating request bodies coming along with  flight requests.

const { isValueUnique } = require("../../utils/checkUniqueValueInModelDoc");
const { trimValuesInRequestBody } = require("../../utils/trimRequestBody");
const { isValidObjectId } = require("mongoose");
const Flight = require("../../models/flight.model");
const Airline = require("../../models/airline.model");

exports.validateFlightRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req);

  const {
    flightNumber,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    price,
    duration,
    airline,
    flightDate,
  } = req.body;
  if (!flightNumber) {
    return res
      .status(400)
      .json({ message: "FlightNumber is required field and not provided." });
  }
  if (!flightDate) {
    return res
      .status(400)
      .json({ message: "FlightDate is required field and not provided." });
  }
  if (!departureAirport) {
    return res.status(400).json({
      message: "departureAirport is required field and not provided.",
    });
  }
  if (!arrivalAirport) {
    return res.status(400).json({
      message: "arrivalAirport is required field and not provided.",
    });
  }
  if (!departureTime) {
    return res.status(400).json({
      message: "departureTime is required field and not provided.",
    });
  }
  if (!arrivalTime) {
    return res.status(400).json({
      message: "arrivalTime is required field and not provided.",
    });
  }
  if (!price) {
    return res.status(400).json({
      message: "price is required field and not provided.",
    });
  }
  if (!duration) {
    return res.status(400).json({
      message: "duration is required field and not provided.",
    });
  }
  if (!airline) {
    return res.status(400).json({
      message:
        "Airline is required field and not provided.Ensure to provide a valid airlineId.",
    });
  }
  //check whether the flightNumber(provided in request body) is available to take or not
  let isAvailableToTake = await isValueUnique(Flight, {
    flightNumber: flightNumber,
  });

  if (isAvailableToTake instanceof Error) {
    return res.status(500).json({
      message: "Internal server error while validating the request",
    });
  } else if (isAvailableToTake == false) {
    return res.status(400).json({
      message: "FlightNumber is already taken.",
    });
  }

  //check whether airlineId is validObjectId
  if (!isValidObjectId(req.body.airline)) {
    return res.status(400).json({ message: "Not a valid airlineId." });
  }
  //check whether the airlineId is valid airlineId or not
  const airlineInDB = await Airline.findOne({ _id: req.body.airline });
  if (airlineInDB == null) {
    return res.status(400).json({ message: "Not a valid airlineId." });
  }
  // all validation passed, pass the control
  next();
};

exports.validateFlightUpdateRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req);

  const {
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    duration,
    price,
    flightDate,
  } = req.body;

  if (departureAirport == "") {
    return res.status(400).json({
      message: "departureAirport can't be empty field.",
    });
  }
  if (arrivalAirport == "") {
    return res.status(400).json({
      message: "arrivalAirport can't be empty field.",
    });
  }
  if (departureTime == "") {
    return res.status(400).json({
      message: "departureTime  can't be empty field.",
    });
  }
  if (arrivalTime == "") {
    return res.status(400).json({
      message: "arrivalTime can't be empty field.",
    });
  }
  if (price == "") {
    return res.status(400).json({
      message: "price can't be empty field.",
    });
  }
  if (flightDate == "") {
    return res.status(400).json({
      message: "flightDate can't be empty field.",
    });
  }
  if (duration == "") {
    return res.status(400).json({
      message: "duration can't be empty field.",
    });
  }
  // all validation passed, pass the control
  next();
};
