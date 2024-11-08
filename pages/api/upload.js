const clientPromise = require('../../db');
const formidable = require('formidable');   // Library for handling file uploads
const fs = require('fs');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests are allowed' });
        return;
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing the file", err);
            res.status(500).send("Error parsing the file");
            return;
        }

        try {
            const client = await clientPromise;
            const db = client.db("ThirdShiftHub");

            const document = {
                name: files.document.originalFilename,
                path: files.document.filepath,
                createdAt: new Date(),
            };

            await db.collection("documents").insertOne(document);
            res.status(200).json({ message: "Document uploaded successfully", document });
        } catch (error) {
            console.error("Error uploading document:", error);
            res.status(500).json({ error: "Failed to upload document" });
        }
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
