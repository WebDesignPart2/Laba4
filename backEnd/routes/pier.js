const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    app.get('/api/pier/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const data = await db.collection("pier").findOne(details);
            res.send(data);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch pier." });
        }
    })

    app.get('/api/pier', async (req, res) => {
        try {
            const datas = await db.collection("pier").find({}).toArray();
            res.send(datas);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all piers." });
        }
    });

    app.post('/api/pier', async (req, res) => {
        try {
            await db.collection("pier").insertOne(req.body);
            const pierToGet = await db.collection("pier").findOne(req.body);
            res.send(pierToGet)
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    app.put('/api/pier/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const pier = req.body;
        try {
            const result = await db.collection("pier").updateOne(details, { $set: pier });
            if (result.modifiedCount === 1) {
                const updatedPier = await db.collection("pier").findOne(details);
                res.send(updatedPier);
            } else {
                res.status(404).send({ error: "Pier not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });


    app.delete('/api/pier/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("pier").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};