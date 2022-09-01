const { validateSignInRequestBody } = require("./signinRequest");
const { validateSignUpRequestBody } = require("./signupRequest");
const {
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
} = require("./airlineRequest");

module.exports = {
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
};
