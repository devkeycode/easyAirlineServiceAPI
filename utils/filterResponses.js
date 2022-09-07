//This util function used to filter the  object before sending it as a response, in short sending only required values in the user object and excluding the unwanted (like user password) from sending,so filtering the userResponse object.

//filter a single user, to send a single user info as repsonse
const filterUserResponse = (userObj) => {
  //pick up only those properties that are needed from the userObj
  const { name, email, userId, userType, createdAt, updatedAt } = userObj;
  //return an object of the same extracted properties
  const returnedUserObject = {
    name,
    email,
    userId,
    userType,
    createdAt,
    updatedAt,
  };

  return returnedUserObject;
};

//filter all users, to send all users info as response
const filterUserSetResponse = (users) => {
  const userSetResponse = [];
  for (let user of users) {
    userSetResponse.push(filterUserResponse(user));
  }
  return userSetResponse;
};

const Airline = require("../models/airline.model");
const filterBookingResponseData = async (data) => {
  const { user, flight, status } = data;
  const { name, userId, email } = user;
  const {
    departureAirport,
    arrivalAirport,
    duration,
    flightDate,
    flightNumber,
    departureTime,
    arrivalTime,
    boardingGate,
    price,
    airline,
  } = flight;

  //get airline details name and website

  const airlineDetails = await Airline.findOne({ _id: airline });

  const filteredData = {
    name,
    userId,
    email,
    flightNumber,
    status,
    departureAirport,
    arrivalAirport,
    duration,
    flightDate,
    departureTime,
    arrivalTime,
    boardingGate,
    price,
    airlineName: airlineDetails.name,
    airlineWebsite: airlineDetails.website,
  };

  return filteredData;
};
module.exports = {
  filterUserResponse,
  filterUserSetResponse,
  filterBookingResponseData,
};
