const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://SmartOp:SmartOp@hospital.spw9h0u.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db("hospital");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

module.exports = connectToDatabase;
