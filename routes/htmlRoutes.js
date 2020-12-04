var path = require("path");

//
// ROUTING
//

module.exports = function(app) {
    // Route for /tables to display current reservations
    app.get("/tables", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/tables.html"));
        console.log (`User requested main.html via "/tables" route.`);
    });
      
    // Route for /reserve to show the reservation form
    app.get("/reserve", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/reserve.html"));
    });

    // Default route if any other URL is selected to display the main.html page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
        console.log (`User requested main.html via "/" route.`);
    });
}