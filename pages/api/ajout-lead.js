// 🔧 API Route mise à jour pour Airtable (avec champs étendus)
import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  if (!process.env.AIRTABLE_API_KEY) {
    return res.status(500).json({ success: false, error: 'Clé API manquante' });
  }

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('Incendie');

  try {
    const {
      nom, prenom, datenaissance, adresse, email, telephone, numero,
      adresseBien, typeHabitation, typeConstruction, maisonPassive,
      descriptionHabitation, facades, facademoins5m, estimationContenu,
      sauna, piscine, dressing, chaufferie, bureau, veranda,
      autrePiece, salleJeu, cave, garage, chambres, fichier
    } = req.body;

    const record = await base.create({
      "Nom": nom,
      "Prénom": prenom,
      "Date de naissance": datenaissance,
      "Adresse": adresse,
      "Numéro": numero,
      "Email": email,
      "Téléphone": telephone,
      "Adresse du bien": adresseBien,
      "Type d'habitation": typeHabitation,
      "Type de construction": typeConstruction,
      "Maison passive": maisonPassive,
      "Description de l'habitation": descriptionHabitation,
      "Façades": facades,
      "Façade à moins de 5m": facademoins5m,
      "Estimation du contenu": estimationContenu,
      "Sauna": sauna,
      "Piscine": piscine,
      "Dressing": dressing,
      "Chaufferie": chaufferie,
      "Bureau": bureau,
      "Véranda": veranda,
      "Autre pièce": autrePiece,
      "Salle de jeu": salleJeu,
      "Cave": cave,
      "Garage (places)": garage,
      "nombre de chambre": String(chambres),
      "Fichier": fichier ? [{ url: fichier }] : []
    });

    return res.status(200).json({ success: true, id: record.id });
  } catch (error) {
    console.error("💥 ERREUR /api/incendie:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
