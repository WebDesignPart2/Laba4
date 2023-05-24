const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    app.get('/api/port/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const data = await db.collection("port").findOne(details);
            res.send(data);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch port." });
        }
    })

    app.get('/api/port', async (req, res) => {
        try {
            const datas = await db.collection("port").find({}).toArray();
            res.send(datas);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all ports." });
        }
    });

    app.post('/api/port', async (req, res) => {
        try {
            await db.collection("port").insertOne(req.body);
            const portToGet = await db.collection("port").findOne(req.body);
            res.send(portToGet)
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    app.put('/api/port/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const port = req.body;
        try {
            const result = await db.collection("port").updateOne(details, { $set: port });
            if (result.modifiedCount === 1) {
                const updatedport = await db.collection("port").findOne(details);
                res.send(updatedport);
            } else {
                res.status(404).send({ error: "port not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });


    app.delete('/api/port/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("port").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};