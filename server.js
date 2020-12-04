// Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Reservations Data (DATA)
// =============================================================
var reservations = [
  {
    customerName: "yoda",
    phoneNumber: "800-THE-FRCE",
    customerEmail: "yoda@usetheforce.com",
    customerID: "MyID"
  },
  {
    customerName: "yoda1",
    phoneNumber: "800-THE-FRCE",
    customerEmail: "yoda@usetheforce.com",
    customerID: "MyID1"
  },
  {
    customerName: "yoda2",
    phoneNumber: "800-THE-FRCE",
    customerEmail: "yoda@usetheforce.com",
    customerID: "MyID2"
  },
  {
    customerName: "yoda3",
    phoneNumber: "800-THE-FRCE",
    customerEmail: "yoda@usetheforce.com",
    customerID: "MyID3"
  },
];

var waitList = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/main.html"));
  console.log (`User requested main.html via "/" route.`);
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
  console.log (`User requested main.html via "/tables" route.`);
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/reserve.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays all on waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

// Clear all reservations and waitlist
app.post("/api/clear", function(req, res) {
  console.log ("Clearing both reservations and waitList");
  waitList = [];
  reservations = [];
  return res.json(true);
});

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  console.log (`Reservations length: ${reservations.length}`);

  if (reservations.length < 5) {
    reservations.push(newReservation);
    console.log ("Reservation table:");
    console.log (reservations);
    res.json (true);
  }

  else {
    waitList.push (newReservation);
    console.log ("Waitlist table:");
    console.log (waitList);
    res.json (false);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
