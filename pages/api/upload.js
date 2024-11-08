const clientPromise = require('../../db');  // Import database connection
const formidable = require('formidable');   // Library to handle file uploads
const fs = require('fs');                   // File system module

// This function will handle the /api/upload route
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests are allowed' });
        return;
    }

    // Create a new instance of formidable to parse the uploaded file
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing the file", err);
            res.status(500).send("Error parsing the file");
            return;
        }

        try {
            // Connect to the database
            const client = await clientPromise;
            const db = client.db("ThirdShiftHub");

            // Create an object to store in MongoDB
            const document = {
                name: files.document.originalFilename,  // File name
                path: files.document.filepath,          // File path
                createdAt: new Date(),                  // Current timestamp
            };

            // Insert the document metadata into MongoDB
            await db.collection("documents").insertOne(document);
            res.status(200).json({ message: "Document uploaded successfully", document });
        } catch (error) {
            console.error("Error uploading document:", error);
            res.status(500).json({ error: "Failed to upload document" });
        }
    });
}

// This tells Next.js not to parse the request body automatically
export const config = {
    api: {
        bodyParser: false,
    },
};
