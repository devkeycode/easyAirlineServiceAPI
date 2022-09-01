//This middleware contains the logic for validating request bodies coming along with  airline requests.

const { isValueUnique } = require("../../utils/checkUniqueValueInModelDoc");
const { trimValuesInRequestBody } = require("../../utils/trimRequestBody");
const Airline = require("../../models/airline.model");

exports.validateAirlineRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req);

  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: "Name is required field and not provided." });
  }
  //check whether the name(provided in request body) is available to take or not
  let isAvailableToTake = await isValueUnique(Airline, { name: name });

  if (isAvailableToTake instanceof Error) {
    return res.status(500).json({
      message: "Internal server error while validating the request",
    });
  } else if (isAvailableToTake == false) {
    return res.status(400).json({
      message: "Name is already taken.",
    });
  }

  if (req.body.website) {
    //in case website is passed, ensure it is unique
    isAvailableToTake = await isValueUnique(Airline, {
      website: req.body.website,
    });

    if (isAvailableToTake instanceof Error) {
      return res.status(500).json({
        message: "Internal server error while validating the request",
      });
    } else if (isAvailableToTake == false) {
      return res.status(400).json({
        message: "Website is already taken.",
      });
    }
  }
  // all validation passed, pass the control
  next();
};

exports.validateAirlineUpdateRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req);

  const { name } = req.body;
  if (name == "") {
    return res
      .status(400)
      .json({ message: "Name is required field and can't be empty." });
  }
  //check whether the name(provided in request body) is available to take or not, only if it is different from already used name
  if (req.airline.name !== name) {
    let isAvailableToTake = await isValueUnique(Airline, { name: name });

    if (isAvailableToTake instanceof Error) {
      return res.status(500).json({
        message: "Internal server error while validating the request",
      });
    } else if (isAvailableToTake == false) {
      return res.status(400).json({
        message: "Name is already taken.",
      });
    }
  }

  if (req.body.website) {
    //if website passed other than already used website for the same airline,ensure it is unique
    if (req.airline.website !== req.body.website) {
      let isAvailableToTake = await isValueUnique(Airline, {
        website: req.body.website,
      });

      if (isAvailableToTake instanceof Error) {
        return res.status(500).json({
          message: "Internal server error while validating the request",
        });
      } else if (isAvailableToTake == false) {
        return res.status(400).json({
          message: "Website is already taken.",
        });
      }
    }
  }
  // all validation passed, pass the control
  next();
};
