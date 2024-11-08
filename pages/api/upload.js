const formidable = require('formidable');
const connectToDatabase = require('../../db');

export const config = {
    api: { bodyParser: false }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'File parsing error' });

        const { db } = await connectToDatabase();
        const document = { name: files.document.name, createdAt: new Date() };
        await db.collection('Documents').insertOne(document);

        res.status(200).json({ message: 'Upload successful', document });
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
