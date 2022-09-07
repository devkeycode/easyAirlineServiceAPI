//this file contains the logic for addressing the request related to User Resource

const {
  findAllUsers,
  findUserByUserId,
  updateUser,
  findAllBookingsofUser,
  getBoardingPass,
} = require("../controllers/user.controller");
const {
  verifyToken,
  isAdmin,
  isAdminOrOwner,
  isValidUserIdInReqParam,
} = require("../middlewares");

module.exports = (app) => {
  //get all the users
  app.get("/airlineService/api/v1/users", [verifyToken, isAdmin], findAllUsers);

  //get a single user by id
  app.get(
    "/airlineService/api/v1/users/:id",
    [verifyToken, isValidUserIdInReqParam, isAdminOrOwner],
    findUserByUserId
  );

  //update user
  app.put(
    "/airlineService/api/v1/users/:id",
    [verifyToken, isValidUserIdInReqParam, isAdminOrOwner],
    updateUser
  );

  //get specific user booking
  app.get(
    "/airlineService/api/v1/users/:id/bookings",
    [verifyToken, isValidUserIdInReqParam, isAdminOrOwner],
    findAllBookingsofUser
  );
};
