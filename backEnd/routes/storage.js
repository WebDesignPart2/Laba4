const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    // GET a single storage by ID
    app.get('/api/storage/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const storage = await db.collection("storage").findOne(details);
            res.send(storage);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch storage." });
        }
    })

    // GET all ships
    app.get('/api/storage', async (req, res) => {
        try {
            const ships = await db.collection("storage").find({}).toArray();
            res.send(ships);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all ships." });
        }
    });

    // POST (create) a new storage
    app.post('/api/storage', async (req, res) => {
        const storage = req.body;
        try {
            await db.collection("storage").insertOne(storage);
            const shipToReturn = await db.collection("storage").findOne(req.body);
            res.send(shipToReturn);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    // PUT (update) an existing storage by ID
    app.put('/api/storage/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const storage = req.body;
        try {
            const result = await db.collection("storage").updateOne(details, { $set: storage });
            if (result.modifiedCount === 1) {
                const updatedShip = await db.collection("storage").findOne(details);
                res.send(updatedShip);
            } else {
                res.status(404).send({ error: "Ship not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    // DELETE an existing storage by ID
    app.delete('/api/storage/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("storage").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};
