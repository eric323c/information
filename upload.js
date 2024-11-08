// upload.js

const clientPromise = require('./db');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    try {
        const client = await clientPromise;
        const db = client.db("ThirdShiftHub");

        const file = req.body.document;
        const document = {
            name: file.name,
            url: file.url, // If using an external file storage solution, provide the URL here
        };

        await db.collection("documents").insertOne(document);

        res.status(200).json({ message: "Document uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading document:", error);
        res.status(500).json({ error: "Failed to upload document" });
    }
}
