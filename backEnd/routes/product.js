const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    app.get('/api/product/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const data = await db.collection("product").findOne(details);
            res.send(data);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch product." });
        }
    })

    app.get('/api/product', async (req, res) => {
        try {
            const datas = await db.collection("product").find({}).toArray();
            res.send(datas);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all piers." });
        }
    });

    app.post('/api/product', async (req, res) => {
        try {
            await db.collection("product").insertOne(req.body);
            const pierToGet = await db.collection("product").findOne(req.body);
            res.send(pierToGet)
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });

    app.put('/api/product/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const product = req.body;
        try {
            const result = await db.collection("product").updateOne(details, { $set: product });
            if (result.modifiedCount === 1) {
                const updatedPier = await db.collection("product").findOne(details);
                res.send(updatedPier);
            } else {
                res.status(404).send({ error: "product not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });


    app.delete('/api/product/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("product").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};