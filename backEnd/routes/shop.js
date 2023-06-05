const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    app.get('/api/shop/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const data = await db.collection("shop").findOne(details);
            res.send(data);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch shop." });
        }
    })

    app.get('/api/shop', async (req, res) => {
        try {
            const datas = await db.collection("shop").find({}).toArray();
            res.send(datas);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all ports." });
        }
    });

    app.post('/api/shop', async (req, res) => {
        try {
            await db.collection("shop").insertOne(req.body);
            const portToGet = await db.collection("shop").findOne(req.body);
            res.send(portToGet)
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    app.put('/api/shop/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const shop = req.body;
        try {
            const result = await db.collection("shop").updateOne(details, { $set: shop });
            if (result.modifiedCount === 1) {
                const updatedport = await db.collection("shop").findOne(details);
                res.send(updatedport);
            } else {
                res.status(404).send({ error: "shop not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });


    app.delete('/api/shop/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("shop").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};