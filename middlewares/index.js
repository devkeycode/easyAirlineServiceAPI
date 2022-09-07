const {
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
  validateUserUpdateRequestBody,
} = require("./validateRequestBody");

const {
  isValidAirlineIdInReqParam,
  isValidFlightNumberInReqParam,
  isValidBookingIdInReqParam,
  isValidUserIdInReqParam,
} = require("./validateRequestParam");

const {
  verifyToken,
  isAdmin,
  isAdminOrOwner,
  isAdminOrBookingOwner,
} = require("./auth.jwt");

module.exports = {
  verifyToken,
  isAdmin,
  isAdminOrOwner,
  isAdminOrBookingOwner,
  validateSignInRequestBody,
  validateSignUpRequestBody,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
  validateUserUpdateRequestBody,
  isValidAirlineIdInReqParam,
  isValidFlightNumberInReqParam,
  isValidBookingIdInReqParam,
  isValidUserIdInReqParam,
};
