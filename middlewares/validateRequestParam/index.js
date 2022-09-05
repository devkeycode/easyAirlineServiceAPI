const { isValidAirlineIdInReqParam } = require("./airlineRequest");
const { isValidFlightNumberInReqParam } = require("./flightRequest");
const { isValidBookingIdInReqParam } = require("./bookingRequest");

module.exports = {
  isValidAirlineIdInReqParam,
  isValidFlightNumberInReqParam,
  isValidBookingIdInReqParam,
};
