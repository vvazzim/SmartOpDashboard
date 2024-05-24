const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const interventionsRouter = require('./routes/interventions');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/interventions', interventionsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Hospital Interventions API');
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        // Start server once the connection is established
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
