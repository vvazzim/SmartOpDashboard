const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Intervention = require('./models/Interventions'); // ajustez le chemin vers votre modèle

const MONGODB_URI = 'mongodb://localhost:27017/hospital'; // ajustez votre URI si nécessaire

const importData = async () => {
    try {
        // Connexion à MongoDB
        await mongoose.connect(MONGODB_URI);

        console.log('MongoDB connecté');

        // Lire et traiter le fichier CSV
        const savePromises = []; // Tableau pour stocker les promesses de sauvegarde

        fs.createReadStream('interventions_a_envoyer.csv')
            .pipe(csv({ separator: ';' })) // Définir le séparateur comme un point-virgule
            .on('data', (row) => {
                // Nettoyage des clés de l'objet pour enlever les caractères invisibles
                const cleanedRow = {};
                Object.keys(row).forEach(key => {
                    const cleanedKey = key.replace(/[\uFEFF]/g, '').trim(); // Retirer les caractères invisibles et les espaces
                    cleanedRow[cleanedKey] = row[key];
                });

                // Créer une nouvelle instance d'intervention en utilisant les données du CSV
                const intervention = new Intervention({
                    chirurgien: cleanedRow.surgeon,
                    specialty: cleanedRow.specialty,
                    anesthesiste: cleanedRow.anesthsiste,
                    infirmiere1: cleanedRow.nurse1,
                    infirmiere2: cleanedRow.nurse2,
                    numeroSalle: parseInt(cleanedRow.roomNumber), // Convertir en nombre
                    typeIntervention: cleanedRow.intervention
                });

                // Ajouter la promesse de sauvegarde au tableau
                const savePromise = intervention.save().catch((error) => {
                    console.error('Erreur lors de la sauvegarde de l\'intervention :', error);
                });
                savePromises.push(savePromise);
            })
            .on('end', async () => {
                console.log('Fichier CSV traité avec succès');

                // Attendre que toutes les opérations de sauvegarde soient terminées
                await Promise.all(savePromises);

                // Fermer la connexion à MongoDB
                await mongoose.connection.close();
                console.log('Connexion à MongoDB fermée');
            });
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
};

importData();
