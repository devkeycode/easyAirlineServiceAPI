//this file contains the logic for addressing the airline requests

const {
  createAirline,
  updateAirline,
  findAirlineById,
  findAllAirlines,
  deleteAirline,
} = require("../controllers/airline.controller");

const {
  isValidAirlineIdInReqParam,
  validateAirlineRequestBody,
  validateAirlineUpdateRequestBody,
  verifyToken,
  isAdmin,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/airlineService/api/v1/airlines",
    [verifyToken, isAdmin, validateAirlineRequestBody],
    createAirline
  );

  app.get("/airlineService/api/v1/airlines", [verifyToken], findAllAirlines);

  app.get(
    "/airlineService/api/v1/airlines/:id",
    [verifyToken, isValidAirlineIdInReqParam],
    findAirlineById
  );

  app.put(
    "/airlineService/api/v1/airlines/:id",
    [
      verifyToken,
      isAdmin,
      isValidAirlineIdInReqParam,
      validateAirlineUpdateRequestBody,
    ],
    updateAirline
  );

  app.delete(
    "/airlineService/api/v1/airlines/:id",
    [verifyToken, isAdmin, isValidAirlineIdInReqParam],
    deleteAirline
  );
};
