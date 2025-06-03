import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  const fields = {
    nom: data.nom,
    prenom: data.prenom,
    dateNaissance: data.naissance,
    adresse: data.adresse,
    email: data.email,
    telephone: data.telephone,
    adresseBien: data.adresseBien,
    typeHabitation: data.typeHabitation,
    Maison passive": data.maisonPassive ? "Oui" : "Non",
    descriptionHabitation: data.descriptionHabitation,
    facades: data.facades,
    facades moins de 5 M: data.facadeMoins5m ? "Oui" : "Non",
    estimationContenu: data.estimationContenu,
    Sauna: data.sauna ? "Oui" : "Non",
    Piscine: data.piscine ? "Oui" : "Non",
    Dressing: data.dressing ? "Oui" : "Non",
    Chaufferie: data.chaufferie ? "Oui" : "Non",
    Bureau: data.bureau ? "Oui" : "Non",
    Véranda: data.veranda ? "Oui" : "Non",
    Autre pièce": data.autrePiece ? "Oui" : "Non",
    Salle de jeux": data.salleJeu ? "Oui" : "Non",
    Cave: data.cave ? "Oui" : "Non",
    Garage: data.garage, // Menu déroulant → OK en string
    Chambres: data.chambres,
  };

  try {
    await base('LEADS INCENDIE').create([{ fields }]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur Airtable :', error);
    res.status(500).json({ error: 'Erreur lors de l’envoi à Airtable' });
  }
}
