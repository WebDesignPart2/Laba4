const productRoutes = require('./product');
const storageRoute = require("./storage")
const shopRoute = require("./shop")
const productInStorageRoute = require("./productInStorage")

module.exports = function (app, db) {
    productRoutes(app, db);
    storageRoute(app, db);
    productInStorageRoute(app, db);
    shopRoute(app, db);
};