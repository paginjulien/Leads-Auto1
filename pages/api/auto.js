// pages/api/auto.js

import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('LEADS AUTO');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        nom,
        prenom,
        dateNaissance,
        adresse,
        email,
        telephone,
        vehicule,
        immatriculation,
        bonusMalus,
        sinistres,
        ancienAssureur,
        fichier
      } = req.body;

      const record = await base('Auto').create({
        Nom: nom,
        Prénom: prenom,
        "Date de naissance": dateNaissance,
        Adresse: adresse,
        Email: email,
        Téléphone: telephone,
        Véhicule: vehicule,
        Immatriculation: immatriculation,
        "Bonus/Malus": bonusMalus,
        Sinistres: sinistres,
        "Ancien assureur": ancienAssureur,
        "Fichier joint": fichier ? [{ url: fichier }] : []
      });

      res.status(200).json({ success: true, id: record.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
