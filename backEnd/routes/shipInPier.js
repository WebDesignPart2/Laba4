const { ObjectId } = require("mongodb");

module.exports = function (app, db) {

    app.get('/api/shipInPier/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const data = await db.collection("shipInPier").findOne(details);
            if (!data) {
                return res.status(404).send({ error: "ShipInPier not found" });
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
            const shipInPier = {
                ship: ship,
                pier: pier
            }
            res.send(shipInPier);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Failed to fetch ShipInPier" });
        }
    });

    app.get('/api/shipInPier', async (req, res) => {
        try {
            const shipInPiers = await db.collection("shipInPier").find({}).toArray();
            // const shipIds = shipInPiers.map(shipInPier => shipInPier.shipId);
            // const pierIds = shipInPiers.map(shipInPier => shipInPier.pierId);
            // console.log(shipIds)
            // const [ships, piers] = await Promise.all([
            //     db.collection("ship").find({ _id: { $in: shipIds } }).toArray(),
            //     db.collection("pier").find({ _id: { $in: pierIds } }).toArray(),
            // ]);
            // console.log(piers);
            // const shipInPiersWithObjects = shipInPiers.map(shipInPier => {
            //     const ship = ships.find(ship => {
            //         const a = console.log(ship._id.toString());
            //         return a === shipInPier.shipId.toString()
            //     });
            //     const pier = piers.find(pier => pier._id.toString() === shipInPier.pierId.toString());
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

    app.post('/api/shipInPier', async (req, res) => {
        const { shipId, pierId } = req.body;
        const pierDetails = { _id: new ObjectId(pierId) };
        const shipDetails = { _id: new ObjectId(shipId) };
        try {
            const [ship, pier] = await Promise.all([
                db.collection("ship").findOne(shipDetails),
                db.collection("pier").findOne(pierDetails),
            ]);
            if (!ship) {
                return res.status(404).send({ error: "Ship not found." });
            }

            if (!pier) {
                return res.status(404).send({ error: "pier not found." });
            }
            const ShipInPierIsExist = await db.collection("shipInPier")
                .findOne(req.body);
            if (ShipInPierIsExist) {
                return res.status(400).send({ error: "this ship already in pier " });
            }
            if (ship.tonnage > pier.capacity) {
                return res.status(400).send({ error: "Total tonnage of ships on pier exceeds the capacity of the pier." });
            }

            if (pier.minimumShipDraft < ship.draft) {
                return res.status(400).send({ error: "The ship's draft is bigger than the minimum draft of the pier." });
            }

            await db.collection("shipInPier").insertOne(req.body);
            const shipInPierToGet = await db.collection("shipInPier").findOne(req.body)
            res.send(shipInPierToGet)
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put('/api/shipInPier/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        const shipInPier = req.body;
        try {
            const result = await db.collection("shipInPier").updateOne(details, { $set: shipInPier });
            if (result.modifiedCount === 1) {
                const updatedport = await db.collection("shipInPier").findOne(details);
                res.send(updatedport);
            } else {
                res.status(404).send({ error: "shipInPier not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });


    app.delete('/api/shipInPier/:id', async (req, res) => {
        const details = { _id: new ObjectId(req.params.id) };
        try {
            const result = await db.collection("shipInPier").deleteOne(details);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
};
