//This middleware file handle logic to validate the params passed in airline request

const Airline = require("../../models/airline.model");

const { isValidObjectId } = require("mongoose");
//to check whether valid airline id passed as request paramater
const isValidAirlineIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "No AirlineId passed as parameter.",
    });
  }
  //check whether airlineId is of valid ObjectId type or not
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Not a valid airlineId.",
    });
  }
  try {
    const airline = await Airline.findOne({ _id: req.params.id });
    if (airline == null) {
      return res.status(400).json({
        message: "Not a valid airlineId.",
      });
    }
    //valid airlineId,pass the control to next
    //can pass the airline details, so can be used later in airline updation and getting specific airline detail
    req.airline = airline;
    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).json({
      message: "Internal server error while accessing the  data.",
    });
  }
};

module.exports = {
  isValidAirlineIdInReqParam,
};
