const { isValidAirlineIdInReqParam } = require("./airlineRequest");
const { isValidFlightNumberInReqParam } = require("./flightRequest");
const { isValidBookingIdInReqParam } = require("./bookingRequest");
const { isValidUserIdInReqParam } = require("./userRequest");

module.exports = {
  isValidAirlineIdInReqParam,
  isValidFlightNumberInReqParam,
  isValidBookingIdInReqParam,
  isValidUserIdInReqParam,
};
