const connectToDatabase = require('../../db');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send({ message: 'Only GET requests are allowed' });
    }

    const { db } = await connectToDatabase();
    const documents = await db.collection('Documents').find({}).toArray();
    res.status(200).json(documents);
}
