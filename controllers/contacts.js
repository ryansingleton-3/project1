const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const contacts = await mongodb.getDatabase().db().collection("contacts").find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        const contacts = await mongodb.getDatabase().db().collection("contacts").find({_id: contactId}).toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getAll,
    getSingle
};
