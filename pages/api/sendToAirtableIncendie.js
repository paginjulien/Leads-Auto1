// pages/api/sendToAirtableIncendie.js
const Airtable = require('airtable');

const base = new Airtable({ apiKey: 'YOUR_API_KEY' }).base('app9TomV9AHRcgbEb');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const record = await base('INCENDIE').create([{ fields: req.body }]);
    res.status(200).json({ id: record[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur Airtable' });
  }
}
