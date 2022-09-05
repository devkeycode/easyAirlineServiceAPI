const { validateSignInRequestBody } = require("./signinRequest");
const { validateSignUpRequestBody } = require("./signupRequest");
const {
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
} = require("./airlineRequest");
const {
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
} = require("./flightRequest");
const {
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
} = require("./bookingRequest");

module.exports = {
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
};
