const {
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
} = require("./validateRequestBody");

const {
  isValidAirlineIdInReqParam,
  isValidFlightNumberInReqParam,
  isValidBookingIdInReqParam,
} = require("./validateRequestParam");

const { verifyToken, isAdmin, isAdminOrBookingOwner } = require("./auth.jwt");

module.exports = {
  verifyToken,
  isAdmin,
  isAdminOrBookingOwner,
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
  isValidAirlineIdInReqParam,
  isValidFlightNumberInReqParam,
  isValidBookingIdInReqParam,
};
