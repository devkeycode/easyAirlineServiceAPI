//this file contains the logic for handling the CRUD operations on Airline resource

const Airline = require("../models/airline.model");
//create airline
exports.createAirline = async (req, res) => {
  try {
    const airlineObj = {
      name: req.body.name,
      website: req.body.website,
    };
    const airline = await Airline.create(airlineObj);
    res.status(201).json({
      data: airline,
      message: "Airline created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

//find all airlines
exports.findAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find();
    return res.status(200).json({
      documentResultsCount: airlines.length,
      data: airlines,
    });
  } catch (error) {
    console.log("Error while fetching airline details.", error.message);
    return res.status(500).json({
      message: "Internal server error while fetching the data.",
    });
  }
};

//find airline by id
exports.findAirlineById = async (req, res) => {
  try {
    return res.status(200).json({
      data: req.airline, //getting airline from the request object
    });
  } catch (error) {
    console.log("Error while fetching airline details.", error.message);
    return res.status(500).json({
      message: "Internal server error while fetching the data.",
    });
  }
};

//update airline
exports.updateAirline = async (req, res) => {
  try {
    //getting airline details from the request body as it is binded to the request object after isValidAirlineIdInReqParam middleware is passed
    req.airline.name =
      req.body.name != undefined ? req.body.name : req.airline.name;
    req.airline.website =
      req.body.website != undefined ? req.body.website : req.airline.website;

    const updatedAirline = await req.airline.save();
    return res.status(200).json({
      data: updatedAirline,
      message: "Airline details successfully updated.",
    });
  } catch (error) {
    console.log("Error while updating company", error.message);
    return res.status(500).json({
      message: "Internal server error while updating.",
    });
  }
};

//delete airline (as ailrineId passed in request params)
exports.deleteAirline = async (req, res) => {
  try {
    await Airline.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Airline deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
