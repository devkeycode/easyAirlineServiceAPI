//This middleware file handle logic to validate the params passed in flight request

const Flight = require("../../models/flight.model");

//to check whether valid flight number passed as request paramater
const isValidFlightNumberInReqParam = async (req, res, next) => {
  if (!req.params.flightNumber) {
    return res.status(400).json({
      message: "No FlightNumber passed as parameter.",
    });
  }

  try {
    const flight = await Flight.findOne({
      flightNumber: req.params.flightNumber,
    });
    if (flight == null) {
      return res.status(400).json({
        message: "Not a valid FlightNumber.",
      });
    }
    //valid FlightNumber,pass the control to next
    //can pass the flight details, so can be used later in flight updation and getting specific flight detail
    req.flight = flight;

    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).json({
      message: "Internal server error while accessing the  data.",
    });
  }
};

module.exports = {
  isValidFlightNumberInReqParam,
};
