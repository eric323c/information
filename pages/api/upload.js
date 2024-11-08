import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to parse form data' });
      return;
    }

    // Continue processing `fields` and `files` with MongoDB as needed
    res.status(200).json({ message: 'File uploaded successfully', files });
  });
}
