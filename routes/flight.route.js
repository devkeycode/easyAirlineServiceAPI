//this file contains the logic for addressing the flight requests

const {
  createFlight,
  updateFlight,
  findFlightByNumber,
  findAllFlights,
  deleteFlight,
} = require("../controllers/flight.controller");

const {
  isValidFlightNumberInReqParam,
  validateFlightRequestBody,
  validateFlightUpdateRequestBody,
  verifyToken,
  isAdmin,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/airlineService/api/v1/flights",
    [verifyToken, isAdmin, validateFlightRequestBody],
    createFlight
  );

  app.get("/airlineService/api/v1/flights", [verifyToken], findAllFlights);

  app.get(
    "/airlineService/api/v1/flights/:flightNumber",
    [verifyToken, isValidFlightNumberInReqParam],
    findFlightByNumber
  );

  app.put(
    "/airlineService/api/v1/flights/:flightNumber",
    [
      verifyToken,
      isAdmin,
      isValidFlightNumberInReqParam,
      validateFlightUpdateRequestBody,
    ],
    updateFlight
  );

  app.delete(
    "/airlineService/api/v1/flights/:flightNumber",
    [verifyToken, isAdmin, isValidFlightNumberInReqParam],
    deleteFlight
  );
};
