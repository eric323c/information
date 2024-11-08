import clientPromise from '../../db';

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("ThirdShiftHub");

        const documents = await db.collection("documents").find({}).toArray();
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Failed to fetch documents" });
    }
}
