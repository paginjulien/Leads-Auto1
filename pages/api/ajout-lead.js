// pages/api/ajout-lead.js
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'YOUR_SECRET_API_TOKEN' }).base('app9TomV9AHRcgbEb');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const {
    nom,
    prenom,
    telephone,
    email,
    dateNaissance,
    adresse,
    datePermis,
    numeroChassis,
    dateMiseCirculation,
    carburant,
    kilometrage,
    sinistres,
    remarque,
    source,
    provenance,
    documentUrl
  } = req.body;

  try {
    const created = await base('LEADS AUTO').create([
      {
        fields: {
          "Nom": nom,
          "Prénom": prenom,
          "Téléphone": telephone,
          "Email": email,
          "Date de naissance": dateNaissance,
          "Adresse": adresse,
          "Date permis": datePermis,
          "Numéro de châssis": numeroChassis,
          "Date de mise en circulation": dateMiseCirculation,
          "Carburant": carburant,
          "Kilométrage annuel": kilometrage,
          "Sinistres": sinistres,
          "Remarque": remarque,
          "Source": source,
          "Provenance": provenance,
          "Date d’entrée": new Date().toISOString().split('T')[0],
          "Document": documentUrl ? [{ url: documentUrl }] : []
        }
      }
    ]);

    return res.status(200).json({ success: true, id: created[0].id });
  } catch (err) {
    console.error("Erreur lors de la création dans Airtable :", err);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
