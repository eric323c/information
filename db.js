// db.js

const { MongoClient } = require('mongodb');

// Use the MongoDB URI directly, set via environment variable in production
const uri = process.env.MONGODB_URI || "mongodb+srv://eric32301:9Opayd8AfDaKe1PK@thirdshifthub.fntli.mongodb.net/?retryWrites=true&w=majority&appName=ThirdShiftHub";

// Create a new MongoClient with the URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect once and reuse the connection in serverless functions
let clientPromise;

if (!clientPromise) {
    clientPromise = client.connect()
        .then(() => {
            console.log("Connected to MongoDB");
            return client;
        })
        .catch(err => {
            console.error("Failed to connect to MongoDB", err);
            throw err;
        });
}

// Export the connection promise for use in API routes
module.exports = clientPromise;
