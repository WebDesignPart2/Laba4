'use strict'

module.exports = {
    getPier(_req, res) {
        res.json({
            port: "Bangladesh",
            number: 23,
            capacity: 12,
            minimumShipDraft: 1
        });
    }
}