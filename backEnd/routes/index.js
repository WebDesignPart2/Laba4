const pierRoutes = require('./pier');
const shipRoute = require("./ship")
const portRoute = require("./port")
const shipInPierRoute = require("./shipInPier")

module.exports = function (app, db) {
    pierRoutes(app, db);
    shipRoute(app, db);
    shipInPierRoute(app, db);
    portRoute(app, db);
};