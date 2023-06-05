const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    app.get('/api/productInStorage/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const data = await db.collection("productInStorage").findOne(details);
            if (!data) {
                return res.status(404).send({ error: "productInStorage not found" });
            }
            const shipDetails = { _id: new ObjectId(data.shipId) };
            const pierDetails = { _id: new ObjectId(data.pierId) };
            const [ship, pier] = await Promise.all([
                db.collection("ship").findOne(shipDetails),
                db.collection("pier").findOne(pierDetails),
            ]);
            if (!ship || !pier) {
                return res.status(500).send({ error: "Ship or Pier not found" });
            }
            const productInStorage = {
                ship: ship,
                pier: pier
            }
            res.send(productInStorage);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch productInStorage" });
        }
    });

    app.get('/api/productInStorage', async (req, res) => {
        try {
            const shipInPiers = await db.collection("productInStorage").find({}).toArray();
            // const shipIds = shipInPiers.map(productInStorage => productInStorage.shipId);
            // const pierIds = shipInPiers.map(productInStorage => productInStorage.pierId);
            // console.log(shipIds)
            // const [ships, piers] = await Promise.all([
            //     db.collection("ship").find({ _id: { $in: shipIds } }).toArray(),
            //     db.collection("pier").find({ _id: { $in: pierIds } }).toArray(),
            // ]);
            // console.log(piers);
            // const shipInPiersWithObjects = shipInPiers.map(productInStorage => {
            //     const ship = ships.find(ship => {
            //         const a = console.log(ship._id.toString());
            //         return a === productInStorage.shipId.toString()
            //     });
            //     const pier = piers.find(pier => pier._id.toString() === productInStorage.pierId.toString());
            //     return {
            //         ship: ship,
            //         pier: pier
            //     };
            // });
            res.send(shipInPiers);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch all ShipInPiers" });
        }
    });

    app.post('/api/productInStorage', async (req, res) => {
        const { storageId, productId } = req.body;
        const productDetails = { _id: new ObjectId(productId) };
        const storageDetails = { _id: new ObjectId(storageId) };
        try {
            const [storage, product] = await Promise.all([
                db.collection("storage").findOne(storageDetails),
                db.collection("product").findOne(productDetails),
            ]);
            if (!storage) {
                return res.status(404).send({ error: "storage not found." });
            }

            if (!product) {
                return res.status(404).send({ error: "product not found." });
            }
            const ShipInPierIsExist = await db.collection("productInStorage")
                .findOne(req.body);
            if (ShipInPierIsExist) {
                return res.status(400).send({ error: "this ship already in pier " });
            }
            if (storage.tonnage > product.capacity) {
                return res.status(400).send({ error: "Total tonnage of ships on pier exceeds the capacity of the pier." });
            }

            if (product.minimumShipDraft < storage.draft) {
                return res.status(400).send({ error: "The ship's draft is bigger than the minimum draft of the pier." });
            }

            await db.collection("productInStorage").insertOne(req.body);
            const shipInPierToGet = await db.collection("productInStorage").findOne(req.body)
            res.send(shipInPierToGet)
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put('/api/productInStorage/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const productInStorage = req.body;
        try {
            const result = await db.collection("productInStorage").updateOne(details, { $set: productInStorage });
            if (result.modifiedCount === 1) {
                const updatedport = await db.collection("productInStorage").findOne(details);
                res.send(updatedport);
            } else {
                res.status(404).send({ error: "productInStorage not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });


    app.delete('/api/productInStorage/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("productInStorage").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};
