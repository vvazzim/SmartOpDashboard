const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

// Helper function to find the most frequent item in an array
const mostFrequent = (array) => {
    const frequency = {};
    let maxFreq = 0;
    let mostFreqItem = null;
    array.forEach(item => {
        if (!item) return;
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxFreq) {
            maxFreq = frequency[item];
            mostFreqItem = item;
        }
    });
    return mostFreqItem;
};

// Endpoint to get a paginated list of surgeons with their statistics
router.get('/chirurgiens', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const page = Math.max(1, parseInt(req.query.page)) || 1;
        const limit = Math.max(1, parseInt(req.query.limit)) || 10;
        const skip = (page - 1) * limit;

        const surgeons = await db.collection('interventions').aggregate([
            {
                $group: {
                    _id: "$chirurgien",
                    specialty: { $first: "$specialty" },
                    count: { $sum: 1 },
                    anesthesistes: { $push: "$anesthesiste" },
                    infirmieres: { $push: { $concatArrays: [["$infirmiere1"], ["$infirmiere2"]] } },
                    numeroSalle: { $push: "$numeroSalle" },
                    typeIntervention: { $push: "$typeIntervention" }
                }
            },
            { $sort: { count: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]).toArray();

        const processedSurgeons = surgeons.map(surgeon => ({
            chirurgien: surgeon._id || "N/A",
            specialty: surgeon.specialty || "N/A",
            count: surgeon.count,
            anesthesisteFavori: mostFrequent(surgeon.anesthesistes) || "N/A",
            infirmiereFavori: mostFrequent(surgeon.infirmieres.flat()) || "N/A",
            salleFavori: mostFrequent(surgeon.numeroSalle) || "N/A",
            interventionFavori: mostFrequent(surgeon.typeIntervention) || "N/A"
        }));

        res.json(processedSurgeons);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur: ' + err.message });
    }
});

// Endpoint to search for surgeons by name
router.get('/chirurgiens/search', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = req.query.query;
        const page = Math.max(1, parseInt(req.query.page)) || 1;
        const limit = Math.max(1, parseInt(req.query.limit)) || 10;
        const skip = (page - 1) * limit;

        const surgeons = await db.collection('interventions').aggregate([
            { $match: { chirurgien: new RegExp(query, 'i') } },
            {
                $group: {
                    _id: "$chirurgien",
                    specialty: { $first: "$specialty" },
                    count: { $sum: 1 },
                    anesthesistes: { $push: "$anesthesiste" },
                    infirmieres: { $push: { $concatArrays: [["$infirmiere1"], ["$infirmiere2"]] } },
                    numeroSalle: { $push: "$numeroSalle" },
                    typeIntervention: { $push: "$typeIntervention" }
                }
            },
            { $sort: { count: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]).toArray();

        const processedSurgeons = surgeons.map(surgeon => ({
            chirurgien: surgeon._id || "N/A",
            specialty: surgeon.specialty || "N/A",
            count: surgeon.count,
            anesthesisteFavori: mostFrequent(surgeon.anesthesistes) || "N/A",
            infirmiereFavori: mostFrequent(surgeon.infirmieres.flat()) || "N/A",
            salleFavori: mostFrequent(surgeon.numeroSalle) || "N/A",
            interventionFavori: mostFrequent(surgeon.typeIntervention) || "N/A"
        }));

        res.json(processedSurgeons);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur: ' + err.message });
    }
});

module.exports = router;
