import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  const fields = {
    nom: data.nom,
    prenom: data.prenom,
    dateNaissance: data.dateNaissance,
    email: data.email,
    telephone: data.telephone,
    adresse: data.adresse,

    marque: data.marque,
    modele: data.modele,
    annee: data.annee,
    immatriculation: data.immatriculation,
    usage: data.usage,
    typeCouverture: data.typeCouverture,

    accidents: data.accidents,
    bonusMalus: data.bonusMalus,
  };

  try {
    await base('LEADS AUTO').create([{ fields }]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur Airtable :', error);
    res.status(500).json({ error: 'Erreur lors de l’envoi à Airtable' });
  }
}
