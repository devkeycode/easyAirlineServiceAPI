# EasyAirlineService API - REST API for booking flights in an airline.

---

- This EasyAirline Service API revolves around listing the ariline and listing the various flights and booking for the flights.

### Features

---

- User SignUp(Registration) and SignIn Functionality
- Admin registration will be from the backend directly.(For testing purpose, doing it, from the veryFirst time server started) Though, the ADMIN user creation request are taken and send it with response as BAD REQUEST status.
- Customer registration will be supported through API.
- API to support the ADMIN/CUSTOMER signIn.Successfull SignIn API call should return the access token, which will be used by the concerned user to make all the other calls on the protected endpoints.
- Airline details can be added by Admin user only.
- Flight details can be added to the system by ADMIN user only.
- Customer/Admin(on the behalf of user) can book the flight.
- Customer can take the boradingPass(through API call), provided the booking status is confirmed.

### Code organisation in the repository-

---

The whole code base is arranged in multiple directories and files.
Project follows Models, Controllers, Routes (MCR Architecture Pattern), to arrange the code.

1. Models directory contain files dealing with the defining the database Schemas.
2. Controllers directory contain files dealing with handling the core business logic.
3. Routes directory contain the files managing with the routes.
4. Middlewares directory to define all middlewares(generally related for validating incoming requests).
5. Utils directory contains the files that have reusable code(functions).
6. Configs directory for all configs file to configure all the configurations realted to server,database and authentication.
7. The main startup file is "server.js".

### Tech

---

EasyAirline Service API, uses a number of open source projects (all are npm packages) to work properly:

- [Express](https://www.npmjs.com/package/express)- Express is a web framework for node. Using it to create a server and managing dofferent routes.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For hashing the secret credentials of the user and verifying them.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv to load environment variables from a .env file into process.env
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) -For creating access token and verifying them.
- [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- this app requires Node.js(Runtime Environment) v16+ and mongodb v5+(Database, for persistance of data) to run.

#### Install the dependencies  by following instructions.

```sh
cd easyAirlineServiceAPI
npm install
```

##### Before running the app locally, ensure to copy env.sample file and change it to .env and rewrite all your configuration variables value over there.Incase running in production,ensure to configre those variables first in production and change the scripts property value under package.json file accordingly.

### Installation

---

- To make easyAirlineServiceAPI is up and running in your machine, follow the below steps after all configuration and related dependecies installation done.

```sh
cd easyAirlineServiceAPI
npm start
```

Express application, EasyAirline Service API will up and running on configured port.

### Different REST endpoints available ---

---

### 1.SignUp Request

---

```sh
POST /airlineService/api/v1/auth/signup

Sample request body :
{
    "email":"customer1@email.com",
    "password":"password",
    "name":"customer1",
    "userId":"customer1"   
}
Sample response body :
{
    "data": {
        "name": "customer1",
        "email": "customer1@email.com",
        "userId": "customer1",
        "userType": "CUSTOMER",
        "createdAt": "2022-09-07T12:26:57.079Z",
        "updatedAt": "2022-09-07T12:26:57.079Z"
    }
}
```

Details about the JSON structure (Request Body)

- name : Mandatory
- userId : Manadatory and Unique
- email : Manadatory and Unique
- password : Mandatory
- userType : Optional, default value is CUSTOMER.
  Allowed values : ADMIN | CUSTOMER

#### 2. SignIn request

---

```sh
POST /airlineService/api/v1/auth/signin

Sample request body :
{
    "userId":"customer1",
    "password":"password"
}
Sample response body:
{
    "data": {
        "name": "customer1",
        "email": "customer1@email.com",
        "userId": "customer1",
        "userType": "CUSTOMER",
        "createdAt": "2022-09-07T12:26:57.079Z",
        "updatedAt": "2022-09-07T12:26:57.079Z",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMSIsImlhdCI6MTY2MjU1MzgxNSwiZXhwIjoxNjYyNjQwMjE1fQ.EgXz16nDoCUDTZqTwGDjeiKbn9BVgvDn3uRJhmAOpEU"
    }
}
```

##### NOTE-

- Every User will get the accessToken after successfull signIn ,so to allow user to pass that token as x-access-token in headers along with request, instead of sending user credentials (like userId and password) to authenticate and authorized the user request on protected endpoints.If token verified , then only user allowed to access the restricted resource data.

#### 3. Get all Users details, Request (Only ADMIN ALLOWED,to get all the users details)

---

```sh
GET /airlineService/api/v1/users
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU0MDM5LCJleHAiOjE2NjI2NDA0Mzl9.yCDUUgaQ4M6dOYnmhQYnM4etO-brZnXrq19WNvGotjQ

Sample request body : <EMPTY>
Sample response body : 
{
    "documentResultsCount": 4,
    "data": [
        {
            "name": "John Doe",
            "email": "admin@email.com",
            "userId": "admin",
            "userType": "ADMIN",
            "createdAt": "2022-09-07T12:20:24.214Z",
            "updatedAt": "2022-09-07T12:20:24.214Z"
        },
        {
            "name": "customer1",
            "email": "customer1@email.com",
            "userId": "customer1",
            "userType": "CUSTOMER",
            "createdAt": "2022-09-07T12:26:57.079Z",
            "updatedAt": "2022-09-07T12:26:57.079Z"
        },
        {
            "name": "customer2",
            "email": "customer2@email.com",
            "userId": "customer2",
            "userType": "CUSTOMER",
            "createdAt": "2022-09-07T12:30:00.696Z",
            "updatedAt": "2022-09-07T12:30:00.696Z"
        },
        {
            "name": "customer3",
            "email": "customer3@email.com",
            "userId": "customer3",
            "userType": "CUSTOMER",
            "createdAt": "2022-09-07T12:30:10.293Z",
            "updatedAt": "2022-09-07T12:30:10.293Z"
        }
    ]
}
```

##### NOTE-

- ADMIN User may pass optional queryParameter, while sending the GET all users request, to filter the response.QueryParameter taken into account are -userType.

#### 4. Get specific user based on userId, Request (Only ADMIN and the Concerend User, allowed to get specific user details)

---

```sh
GET /airlineService/api/v1/users/:userId

GET /airlineService/api/v1/users/customer1 (Example)
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTI1NjczLCJleHAiOjE2NjI2MTIwNzN9.SUFnU84rtV9a5oQLstMeiIv04mpkEVTBpTyYdNSbcrc

Sample request body : <EMPTY>
Sample response body:
{
    "data": {
        "name": "customer1",
        "email": "customer1@email.com",
        "userId": "customer1",
        "userType": "CUSTOMER",
        "createdAt": "2022-09-07T12:26:57.079Z",
        "updatedAt": "2022-09-07T12:26:57.079Z"
    }
}
```

#### 5. Update specific user based on userId(passed as a request params), Request (Only ADMIN and the Concerend User, allowed to update user details)

---

```sh
PUT /airlineService/api/v1/users/:userId

PUT /airlineService/api/v1/users/customer2 (EXAMPLE)
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMiIsImlhdCI6MTY2MjU1NDcxMywiZXhwIjoxNjYyNjQxMTEzfQ.WUCDxXqfyyMA-IQvvqi_QxZqr6NsvHhD_0wKgUdHAVc

Sample request body :
{
    "name":"customer2",
    "email":"customer2new@email.com"
}
Sample response body : 
{
    "data": {
        "name": "customer2",
        "email": "customer2new@email.com",
        "userId": "customer2",
        "userType": "CUSTOMER",
        "createdAt": "2022-09-07T12:30:00.696Z",
        "updatedAt": "2022-09-07T12:52:35.954Z"
    },
    "message": "User updated successfully."
}
```

#### 6. Admin User can list a airline , by Creating A Airline into the system

---

```sh
POST /airlineService/api/v1/airlines
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU1MjkyLCJleHAiOjE2NjI2NDE2OTJ9.ZcN-JGjozPM4wKxUy9GuLOMTZHSg2aHk95aie_vCPQU

Sample request body :
{
   "name":"Air1",
   "website":"air1@web.co"
}
Sample response body :
{
    "data": {
        "name": "Air1",
        "website": "air1@web.co",
        "_id": "631894b2837641c5ad261e7c",
        "createdAt": "2022-09-07T12:55:14.552Z",
        "updatedAt": "2022-09-07T12:55:14.552Z",
        "__v": 0
    },
    "message": "Airline created successfully"
}
```

#### 7. Any User(Admin or Customer) can get a airline list(detail).

---

```sh
GET /airlineService/api/v1/airlines
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU1MjkyLCJleHAiOjE2NjI2NDE2OTJ9.ZcN-JGjozPM4wKxUy9GuLOMTZHSg2aHk95aie_vCPQU

Sample request body : <EMPTY>
Sample response body :
{
    "documentResultsCount": 3,
    "data": [
        {
            "_id": "631894b2837641c5ad261e7c",
            "name": "Air1",
            "website": "air1@web.co",
            "createdAt": "2022-09-07T12:55:14.552Z",
            "updatedAt": "2022-09-07T12:55:14.552Z",
            "__v": 0
        },
        {
            "_id": "63189559837641c5ad261e86",
            "name": "Air2",
            "website": "air2@web.co",
            "createdAt": "2022-09-07T12:58:01.371Z",
            "updatedAt": "2022-09-07T12:58:01.371Z",
            "__v": 0
        },
        {
            "_id": "63189561837641c5ad261e8b",
            "name": "Air3",
            "website": "air3@web.co",
            "createdAt": "2022-09-07T12:58:09.495Z",
            "updatedAt": "2022-09-07T12:58:09.495Z",
            "__v": 0
        }
    ]
}
```

#### 8. Any User(Admin or Customer) can get a specific airline list(detail) by passing airlineId as request param.

---

```sh
GET /airlineService/api/v1/airlines/:id
GET /airlineService/api/v1/airlines/63189561837641c5ad261e8b (Example)
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU1MjkyLCJleHAiOjE2NjI2NDE2OTJ9.ZcN-JGjozPM4wKxUy9GuLOMTZHSg2aHk95aie_vCPQU

Sample request body : <EMPTY>
Sample response body :
{
    "data": {
        "_id": "63189561837641c5ad261e8b",
        "name": "Air3",
        "website": "air3@web.co",
        "createdAt": "2022-09-07T12:58:09.495Z",
        "updatedAt": "2022-09-07T12:58:09.495Z",
        "__v": 0
    }
}
```

#### 9. An Admin User only can update a specific airline detail by passing a valid airlineId in request param.

---

```sh
PUT /airlineService/api/v1/airlines/:id

PUT /airlineService/api/v1/airlines/63189561837641c5ad261e8b (Example)
Headers : 
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU1MjkyLCJleHAiOjE2NjI2NDE2OTJ9.ZcN-JGjozPM4wKxUy9GuLOMTZHSg2aHk95aie_vCPQU
Sample request body : 
{
    "name": "Air3",
    "website": "air3new@web.co"
}
Sample response body :
{
    "data": {
        "_id": "63189561837641c5ad261e8b",
        "name": "Air3",
        "website": "air3new@web.co",
        "createdAt": "2022-09-07T12:58:09.495Z",
        "updatedAt": "2022-09-07T13:06:46.705Z",
        "__v": 0
    },
    "message": "Airline details successfully updated."
}
```

#### 10. An Admin User only can delete a specific airline detail by passing a valid airlineId in request param.

---

```sh
DELETE /airlineService/api/v1/airlines/:id

DELETE /airlineService/api/v1/airlines/63189561837641c5ad261e8b (Example)
Headers : 
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU1MjkyLCJleHAiOjE2NjI2NDE2OTJ9.ZcN-JGjozPM4wKxUy9GuLOMTZHSg2aHk95aie_vCPQU
Sample request body : <EMPTY>
Sample response body : 
{
    "message": "Airline deleted successfully."
}

```

#### 11. Admin User only can list a flight , by Creating A Flight into the system

---

```sh
POST /airlineService/api/v1/flights
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU2NTEyLCJleHAiOjE2NjI2NDI5MTJ9.N1TOd-9SOA1bys806h6REjjZMO7bfcvBd2cFgVBHbIU

Sample Request Body:
{
    "flightNumber":"Air1001",
    "departureAirport":"Delhi",
    "arrivalAirport":"Hyderabad",
    "departureTime":"21:00",
    "arrivalTime":"23:00",
    "flightDate":"2022-09-07",
    "duration":7200,
    "price":8000,
    "airline":"631894b2837641c5ad261e7c", 
     "boardingGate":2
}
Sample response Body:
{
    "data": {
        "flightNumber": "Air1001",
        "departureAirport": "Delhi",
        "arrivalAirport": "Hyderabad",
        "duration": 7200,
        "airline": "631894b2837641c5ad261e7c",
        "flightDate": "2022-09-07T00:00:00.000Z",
        "departureTime": "21:00",
        "arrivalTime": "23:00",
        "price": 8000,
        "boardingGate": 2,
        "_id": "6318999c837641c5ad261e9e",
        "createdAt": "2022-09-07T13:16:12.701Z",
        "updatedAt": "2022-09-07T13:16:12.701Z",
        "__v": 0
    },
    "message": "Flight created successfully"
}

```

Details about the JSON structure (Request Body)

- flightNumber : Mandatory and unique
- departureAirport : Manadatory
- arrivalAirport : Manadatory
- departureTime : Manadatory (24HRS FORMAT)
- arrivalTime : Manadatory (24HRS FORMAT)
- flightDate : Manadatory
- duration : Manadatory (iN SECONDS)
- price : Manadatory
- airline: Mandatory
- boardingGate: optional

#### 12. Any authorised User(with valid token,after successfully signin into the system)  can get all flight details.

---

```sh
GET /airlineService/api/v1/flights
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMiIsImlhdCI6MTY2MjU1Nzc4OSwiZXhwIjoxNjYyNjQ0MTg5fQ.2T1hEA9uJM1jd2X_kA9NaKgRN7cH1XxaMjzxFASEu6E

Sample Request Body: <EMPTY>
Sample Response Body: 
{
    "documentResultsCount": 3,
    "data": [
        {
            "_id": "63189dcc837641c5ad261eb5",
            "flightNumber": "Air2002",
            "departureAirport": "Delhi",
            "arrivalAirport": "Bengalrau",
            "duration": 9300,
            "airline": "63189559837641c5ad261e86",
            "flightDate": "2022-09-07T00:00:00.000Z",
            "departureTime": "21:00",
            "arrivalTime": "23:35",
            "price": 7000,
            "boardingGate": 1,
            "createdAt": "2022-09-07T13:34:04.101Z",
            "updatedAt": "2022-09-07T13:34:04.101Z"
        },
        {
            "_id": "63189a8a837641c5ad261ea5",
            "flightNumber": "Air2001",
            "departureAirport": "Delhi",
            "arrivalAirport": "Hyderabad",
            "duration": 7800,
            "airline": "63189559837641c5ad261e86",
            "flightDate": "2022-09-07T00:00:00.000Z",
            "departureTime": "21:00",
            "arrivalTime": "23:10",
            "price": 7400,
            "boardingGate": 4,
            "createdAt": "2022-09-07T13:20:10.097Z",
            "updatedAt": "2022-09-07T13:20:10.097Z"
        },
        {
            "_id": "6318999c837641c5ad261e9e",
            "flightNumber": "Air1001",
            "departureAirport": "Delhi",
            "arrivalAirport": "Hyderabad",
            "duration": 7200,
            "airline": "631894b2837641c5ad261e7c",
            "flightDate": "2022-09-07T00:00:00.000Z",
            "departureTime": "21:00",
            "arrivalTime": "23:00",
            "price": 8000,
            "boardingGate": 2,
            "createdAt": "2022-09-07T13:16:12.701Z",
            "updatedAt": "2022-09-07T13:16:12.701Z"
        }
    ]
}
```

#### 13. Any authorised User can get all flight details based on specific query(optional query params),(by default page1 with limit of 10 documents will be displayed) and sortedBy based on the creation in descending order(so recent flight will be at the top).

---

```sh
GET /airlineService/api/v1/flights?flightDate=<value>&price[gte]=<value>&price[lte]=<value>&departureAirport=<value>&arrivalAirport=<value>&anyOtherQueryParam=<value>

GET /airlineService/api/v1/flights?flightDate=2022-09-07&price[gte]=7000&price[lte]=7500 (EXAMPLE)
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMiIsImlhdCI6MTY2MjU1Nzc4OSwiZXhwIjoxNjYyNjQ0MTg5fQ.2T1hEA9uJM1jd2X_kA9NaKgRN7cH1XxaMjzxFASEu6E

Sample Request Body: <EMPTY>
Sample Response Body: 
{
    "documentResultsCount": 2,
    "data": [
        {
            "_id": "63189dcc837641c5ad261eb5",
            "flightNumber": "Air2002",
            "departureAirport": "Delhi",
            "arrivalAirport": "Bengalrau",
            "duration": 9300,
            "airline": "63189559837641c5ad261e86",
            "flightDate": "2022-09-07T00:00:00.000Z",
            "departureTime": "21:00",
            "arrivalTime": "23:35",
            "price": 7000,
            "boardingGate": 1,
            "createdAt": "2022-09-07T13:34:04.101Z",
            "updatedAt": "2022-09-07T13:34:04.101Z"
        },
        {
            "_id": "63189a8a837641c5ad261ea5",
            "flightNumber": "Air2001",
            "departureAirport": "Delhi",
            "arrivalAirport": "Hyderabad",
            "duration": 7800,
            "airline": "63189559837641c5ad261e86",
            "flightDate": "2022-09-07T00:00:00.000Z",
            "departureTime": "21:00",
            "arrivalTime": "23:10",
            "price": 7400,
            "boardingGate": 4,
            "createdAt": "2022-09-07T13:20:10.097Z",
            "updatedAt": "2022-09-07T13:20:10.097Z"
        }
    ]
}
```

#### 14. Any authorised User can get specific flight details based on specific flightNumber

---

```sh
GET /airlineService/api/v1/flights/:flightNumber

GET /airlineService/api/v1/flights/Air2002 (EXAMPLE)
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMiIsImlhdCI6MTY2MjU1Nzc4OSwiZXhwIjoxNjYyNjQ0MTg5fQ.2T1hEA9uJM1jd2X_kA9NaKgRN7cH1XxaMjzxFASEu6E

Sample Request Body: <EMPTY>
Sample Response Body: 
{
    "data": {
        "_id": "63189dcc837641c5ad261eb5",
        "flightNumber": "Air2002",
        "departureAirport": "Delhi",
        "arrivalAirport": "Bengalrau",
        "duration": 9300,
        "airline": "63189559837641c5ad261e86",
        "flightDate": "2022-09-07T00:00:00.000Z",
        "departureTime": "21:00",
        "arrivalTime": "23:35",
        "price": 7000,
        "boardingGate": 1,
        "createdAt": "2022-09-07T13:34:04.101Z",
        "updatedAt": "2022-09-07T13:34:04.101Z",
        "__v": 0
    }
}
```

#### 15. An ADMIN User only can delete specific flight details based on specific flightNumber

---

```sh
DELETE /airlineService/api/v1/flights/:flightNumber

DELETE /airlineService/api/v1/flights/Air2002 (EXAMPLE)
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU5MjcyLCJleHAiOjE2NjI2NDU2NzJ9.4oKRTcpaFk8z8LjdvHQwSFIjLFH8aBYKU2gqViRABJc
 
Sample Request Body: <EMPTY>
Sample Response Body: 
{
    "message": "Flight Successfully deleted."
}

```

#### 16. Any authorised User can book a flight. In case admin booking the flight, admin need to pass the user(userId), otherwise for a user booking,user(userId) is optional.

---

```sh
POST /airlineService/api/v1/bookings

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU5NzM4LCJleHAiOjE2NjI2NDYxMzh9.8icqwLiWimQSiQ24sWIVzZ22uYmIEowjteHnC1NElaQ
 
Sample Request Body:
{
    "flight":"Air1001",
    "user":"customer3"  
}
Sample Response Body:
{
    "data": {
        "user": "63188ed2911d2dc904bc8f88",
        "flight": "6318999c837641c5ad261e9e",
        "status": "IN_PROCESS",
        "_id": "6318ab5961fad41a404b59f1",
        "createdAt": "2022-09-07T14:31:53.762Z",
        "updatedAt": "2022-09-07T14:31:53.762Z",
        "__v": 0
    }
}
```

Details about the JSON structure (Request Body)

- flight : Mandatory
- user : Mandatory(only if admin is booking, otherwise optional)
- status : Optional, default value is IN_PROCESS.
  Allowed values : IN_PROCESS | CANCELLED | CONFIRMED

#### 17. An ADMIN User only can get all booking details.

---

```sh
GET /airlineService/api/v1/bookings

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTU5NzM4LCJleHAiOjE2NjI2NDYxMzh9.8icqwLiWimQSiQ24sWIVzZ22uYmIEowjteHnC1NElaQ
Sample Request Body:<EMPTY>
Sample Response Body:
{
    "data": [
        {
            "_id": "6318ab5961fad41a404b59f1",
            "user": "63188ed2911d2dc904bc8f88",
            "flight": "6318999c837641c5ad261e9e",
            "status": "IN_PROCESS",
            "createdAt": "2022-09-07T14:31:53.762Z",
            "updatedAt": "2022-09-07T14:31:53.762Z",
            "__v": 0
        },
        {
            "_id": "6318ae0e01d6c948b0515957",
            "user": "63188ec8911d2dc904bc8f84",
            "flight": "6318999c837641c5ad261e9e",
            "status": "CONFIRMED",
            "createdAt": "2022-09-07T14:43:26.285Z",
            "updatedAt": "2022-09-07T14:43:26.285Z",
            "__v": 0
        },
        {
            "_id": "6318ae3101d6c948b051595d",
            "user": "63188e11911d2dc904bc8f7f",
            "flight": "63189a8a837641c5ad261ea5",
            "status": "CONFIRMED",
            "createdAt": "2022-09-07T14:44:01.360Z",
            "updatedAt": "2022-09-07T14:44:01.360Z",
            "__v": 0
        }
    ]
}
```

#### 18. An ADMIN User  can get all booking details for a specific user and a specific user also can get all the bookings  related to him/her.

---

```sh
GET /airlineService/api/v1/users/:userId/bookings

GET /airlineService/api/v1/users/customer2/bookings  (EXAMPLE)

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMiIsImlhdCI6MTY2MjUzMzc2NiwiZXhwIjoxNjYyNjIwMTY2fQ.ep66u8riw2SxopCvkz2huBPuLdTLI5u-b9xCovDjXXY
Sample Request Body:<EMPTY>
Sample Response Body:{
    "resultDocumentCount": 1,
    "data": [
        {
            "_id": "6318ae0e01d6c948b0515957",
            "user": "63188ec8911d2dc904bc8f84",
            "flight": "6318999c837641c5ad261e9e",
            "status": "CONFIRMED",
            "createdAt": "2022-09-07T14:43:26.285Z",
            "updatedAt": "2022-09-07T14:43:26.285Z",
            "__v": 0
        }
    ]
}

```

#### 18. A User  can update the booking details.(Booking Owner can only cancel the booking, but admin user can change the booking status to any valid value and also admin user can change the flight of the user,in case of any emergency.)

---

```sh
PUT /airlineService/api/v1/bookings/:id

PUT /airlineService/api/v1/bookings/6318ae3101d6c948b051595d (EXAMPLE)


Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjYyNTI1NjczLCJleHAiOjE2NjI2MTIwNzN9.SUFnU84rtV9a5oQLstMeiIv04mpkEVTBpTyYdNSbcrc
Sample Request Body:
{
   "status": "CANCELLED"
}
Sample Response Body:
{
    "data": {
        "_id": "6318ae3101d6c948b051595d",
        "user": "63188e11911d2dc904bc8f7f",
        "flight": "63189a8a837641c5ad261ea5",
        "status": "CANCELLED",
        "createdAt": "2022-09-07T14:44:01.360Z",
        "updatedAt": "2022-09-07T14:54:18.111Z",
        "__v": 0
    },
    "message": "Booking update successfully"
}

```

#### 19. A User and admin user (for the specific user booking)  can get the boarding pass , provided the booking status is confirmed.

---

```sh
GET /airlineService/api/v1/bookings/:id/boardingPass

GET /airlineService/api/v1/bookings/6318ae3101d6c948b051595d/boardingPass (EXAMPLE)


Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c3RvbWVyMiIsImlhdCI6MTY2MjUzMzc2NiwiZXhwIjoxNjYyNjIwMTY2fQ.ep66u8riw2SxopCvkz2huBPuLdTLI5u-b9xCovDjXXY
Sample Request Body: <EMPTY>
Sample Response Body: 
{
    "data": {
        "name": "customer2",
        "userId": "customer2",
        "email": "customer2new@email.com",
        "flightNumber": "Air1001",
        "status": "CONFIRMED",
        "departureAirport": "Delhi",
        "arrivalAirport": "Hyderabad",
        "duration": 7200,
        "flightDate": "2022-09-07T00:00:00.000Z",
        "departureTime": "21:00",
        "arrivalTime": "23:00",
        "boardingGate": 2,
        "price": 8000,
        "airlineName": "Air1",
        "airlineWebsite": "air1@web.co"
    }
}

```

#### 20. Any request of anytype on invalid endpoint , that doesnt exists, will send response status 404 NOTFOUND with proper response message

---

```sh
GET|POST|PUT|DELETE  /InvalidEndPoint

GET /airlinservice/api/v1/INVALIDENDPOINT (Example)
Sample request body : <EMPTY>
Sample response body : 
{
    "message": "The requested endpoint doesn't exists."
}

```

##### NOTE-

- For all the request on protected endpoints, the validation has been taken care of, in case the validation not passed in any phase in the request processing pipeline, the proper response has been sent back from there only, without considering the request further into the processing pipeline.

#### Development Suggestions -

---

Have suggestions for improvement. Do make the changes and raise a PR.
Reach out to me over devkeycode@gmail.com
