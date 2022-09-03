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

module.exports = {
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
};
