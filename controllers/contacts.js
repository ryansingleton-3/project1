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

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while creating the contact");
    }
    
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection("contacts").replaceOne({ _id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "SOme error occurred while updating the contact");
    }
    
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: contactId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while deleting the contact");
    }
    
};

module.exports = {
    getAll,
    getSingle, 
    createContact,
    updateContact,
    deleteContact
};
