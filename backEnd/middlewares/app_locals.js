'use strict'

const appLocalsMiddleware = function (req, res, next) {
    res.locals.$messages = req.flash()
    next()
}

module.exports = appLocalsMiddleware