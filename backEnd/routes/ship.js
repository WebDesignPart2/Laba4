const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    // GET a single ship by ID
    app.get('/api/ship/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const ship = await db.collection("ship").findOne(details);
            res.send(ship);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch ship." });
        }
    })

    // GET all ships
    app.get('/api/ship', async (req, res) => {
        try {
            const ships = await db.collection("ship").find({}).toArray();
            res.send(ships);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all ships." });
        }
    });

    // POST (create) a new ship
    app.post('/api/ship', async (req, res) => {
        const ship = req.body;
        try {
            await db.collection("ship").insertOne(ship);
            const shipToReturn = await db.collection("ship").findOne(req.body);
            res.send(shipToReturn);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    // PUT (update) an existing ship by ID
    app.put('/api/ship/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const ship = req.body;
        try {
            const result = await db.collection("ship").updateOne(details, { $set: ship });
            if (result.modifiedCount === 1) {
                const updatedShip = await db.collection("ship").findOne(details);
                res.send(updatedShip);
            } else {
                res.status(404).send({ error: "Ship not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    // DELETE an existing ship by ID
    app.delete('/api/ship/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("ship").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};
