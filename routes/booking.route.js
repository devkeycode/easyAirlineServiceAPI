//this file contains the logic for addressing the booking requests

const {
  createBooking,
  updateBooking,
  findBookingById,
  findAllBookings,
  deleteBooking,
  getBoardingPass,
} = require("../controllers/booking.controller");

const {
  isValidBookingIdInReqParam,
  validateBookingRequestBody,
  validateBookingUpdateRequestBody,
  verifyToken,
  isAdmin,
  isAdminOrBookingOwner,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/airlineService/api/v1/bookings",
    [verifyToken, validateBookingRequestBody],
    createBooking
  );

  app.get(
    "/airlineService/api/v1/bookings",
    [verifyToken, isAdmin],
    findAllBookings
  );

  app.get(
    "/airlineService/api/v1/bookings/:id",
    [verifyToken, isValidBookingIdInReqParam, isAdminOrBookingOwner],
    findBookingById
  );

  app.get(
    "/airlineService/api/v1/bookings/:id/boardingPass",
    [verifyToken, isValidBookingIdInReqParam, isAdminOrBookingOwner],
    getBoardingPass
  );

  app.put(
    "/airlineService/api/v1/bookings/:id",
    [
      verifyToken,
      isValidBookingIdInReqParam,
      isAdminOrBookingOwner,
      validateBookingUpdateRequestBody,
    ],
    updateBooking
  );

  app.delete(
    "/airlineService/api/v1/bookings/:id",
    [verifyToken, isAdmin, isValidBookingIdInReqParam],
    deleteBooking
  );
};
