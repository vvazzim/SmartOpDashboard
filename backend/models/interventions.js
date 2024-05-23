const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
    chirurgien: String,
    specialty: String,
    anesthesiste: String,
    infirmiere1: String,
    infirmiere2: String,
    numeroSalle: Number,
    typeIntervention: String
});

module.exports = mongoose.model('Intervention', interventionSchema);
