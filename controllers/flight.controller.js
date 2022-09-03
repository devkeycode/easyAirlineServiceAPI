//this file contains the logic for handling the CRUD operations on Flight resource

const Flight = require("../models/flight.model");
//create Flight (onlyADMIN)
exports.createFlight = async (req, res) => {
  try {
    const flightObj = {
      flightNumber: req.body.flightNumber,
      departureAirport: req.body.departureAirport,
      arrivalAirport: req.body.arrivalAirport,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      duration: req.body.duration,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      flightDate: req.body.flightDate,
      airline: req.body.airline,
    };
    const flight = await Flight.create(flightObj);
    return res.status(201).json({
      data: flight,
      message: "Flight created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

//find specific flight detail by flightNumber
exports.findFlightByNumber = async (req, res) => {
  try {
    return res.status(200).json({
      data: req.flight,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
//find all flight details
//example
//localhost:8080/airlineService/api/v1/flights?deparatureAirport=Delhi&arrivalAirport=Bengalaru&flightDate=2022-09-03&price[lte]=10000&fields=price,flightNumber
exports.findAllFlights = async (req, res) => {
  let queryObject = {};
  //if optional queryParam passed along with the request,then add them to the queryObject
  if (req.query) {
    queryObject = addOptionalQueries(req.query);
  }
  try {
    //form query
    let query = Flight.find(queryObject);
    //sorting(if queried in the request,otherwise bydefault sort based on createdAt desc order)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      //example ?sort=price,-duration=> sort('price -duration') sort //price in asc order,duration in desc order
      query = query.sort(sortBy);
    } else {
      //sort by CreatedAt in desc order , to show the latest flights
      query = query.sort("-createdAt");
    }

    //limiting some of fields(in case required)
    //example ?fields=flightNumber,departureDate,duration => will bring only these fields int he returned document
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      //default exclude the __v from the returned document
      query = query.select("-__v");
    }
    //pagination
    //?page=2&limit=10=> will return 2nd page having 10 documents at max, means documents from 11 to 20 ,using skip and limit method, so skipping 10 results and then geeting 10 documents
    //skip(10).limit(10)
    //multiplying by 1 to convert it into num in js
    const page = req.query.page * 1 || 1;
    const limitDocsPerPage = req.query.limit * 1 || 10;
    const skippedDocs = (page - 1) * limitDocsPerPage;
    query = query.skip(skippedDocs).limit(limitDocsPerPage);

    if (req.query.page) {
      const totalDocumentsCount = await Flight.countDocuments();
      if (skippedDocs >= totalDocumentsCount) {
        return res
          .status(400)
          .json({ message: "The requested page doesn't exists." });
      }
    }
    const flights = await query; //execute query
    return res
      .status(200)
      .json({ documentResultsCount: flights.length, data: flights });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

//delete the flight (Only ADMIN)
exports.deleteFlight = async (req, res) => {
  try {
    await req.flight.remove(); //Removes this document from the db.

    return res.status(200).json({ message: "Flight Successfully deleted." });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

//update the specific flight (Only ADMIN) ,based on the flightNumber
//update flight
exports.updateFlight = async (req, res) => {
  try {
    //getting flight details from the request body as it is binded to the request object after isValidFlightNumberInReqParam middleware is passed
    //flightNumber and airline flight belongs to detail can't be changed/updated again, other flight details can be updated.

    //update the request flight object based on request body details
    updateFlightObject(req);
    //after updation(reassigning) the flight object properties values, save the req.flight object in the db
    const updatedflight = await req.flight.save();
    return res.status(200).json({
      data: updatedflight,
      message: "Flight details successfully updated.",
    });
  } catch (error) {
    console.log("Error while updating company", error.message);
    return res.status(500).json({
      message: "Internal server error while updating.",
    });
  }
};

/**
 *
 * @param {Object} req
 * @Details to reassign the req.flight object properties values based on the req.body, so req.flight can be saved in the db
 */
function updateFlightObject(req) {
  //reassigning the req.flight object based on the req.body
  req.flight.departureAirport =
    req.body.departureAirport != undefined
      ? req.body.departureAirport
      : req.flight.departureAirport;
  req.flight.arrivalAirport =
    req.body.arrivalAirport != undefined
      ? req.body.arrivalAirport
      : req.flight.arrivalAirport;
  req.flight.flightDate =
    req.body.flightDate != undefined
      ? req.body.flightDate
      : req.flight.flightDate;
  req.flight.duration =
    req.body.duration != undefined ? req.body.duration : req.flight.duration;
  req.flight.departureTime =
    req.body.departureTime != undefined
      ? req.body.departureTime
      : req.flight.departureTime;
  req.flight.arrivalTime =
    req.body.arrivalTime != undefined
      ? req.body.arrivalTime
      : req.flight.arrivalTime;
  req.flight.price =
    req.body.price != undefined ? req.body.price : req.flight.price;
  req.flight.boardingGate =
    req.body.boardingGate != undefined
      ? req.body.boardingGate
      : req.flight.boardingGate;
}

/**
 *
 * @param {Object} req
 * @returns query
 * @Description Function to add optional query parameter(if passed) to the query Object
 */

function addOptionalQueries(queries) {
  const queryObject = { ...queries };
  const excludedFields = ["page", "sort", "limit", "fields"]; //will exclude this queries form queryobject, will add it later(if queried)
  excludedFields.forEach((element) => {
    delete queryObject[element];
  });
  let queryString = JSON.stringify(queryObject);
  //example ?price[lte]=5000 => price:{lte:5000} => price:{$lte:5000}
  queryString = JSON.parse(
    queryString.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`)
  );
  return queryString;
}
