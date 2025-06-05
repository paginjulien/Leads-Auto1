// pages/incendie.js
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import LogoJS from '../public/Js-innov.IA.png';
import Image from '../public/maisor.png';

export default function IncendieForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    adresseBien: '',
    typeHabitation: '',
    maisonPassive: false,
    descriptionHabitation: '',
    facades: '',
    sauna: false,
    piscine: false,
    chambres: '',
    dressing: false,
    chaufferie: false,
    bureau: false,
    veranda: false,
    autrePiece: false,
    salleJeu: false,
    garage: false,
    nombreGarages: '',
    cave: false
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incendie', formData);
      setSuccess(true);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-white px-4 pt-8 pb-20">
      <div className="relative z-10 max-w-xl w-full">
        <Image src="/ChatGPT Image 2 juin 2025, 03_16_35.png" alt="Maison" width={800} height={400} className="mx-auto mb-6 rounded shadow-lg w-full h-auto" />
        <h1 className="text-3xl font-bold mb-6 text-[#6b123b] text-center">Demandez votre DEVIS GRATUIT !</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nom" placeholder="Nom" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="prenom" placeholder="Prénom" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="adresse" placeholder="Adresse" onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="adresseBien" placeholder="Adresse du bien à assurer (si différente)" onChange={handleChange} className="border p-2 w-full rounded" />

          <select name="typeHabitation" onChange={handleChange} className="border p-2 w-full rounded">
            <option value="">Type d'habitation</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="studio">Studio</option>
            <option value="espace">Espace</option>
          </select>

          <label className="block"><input type="checkbox" name="maisonPassive" onChange={handleChange} className="mr-2" />Maison passive</label>
          <textarea name="descriptionHabitation" placeholder="Description de l'habitation" onChange={handleChange} className="border p-2 w-full rounded" />

          <select name="facades" onChange={handleChange} className="border p-2 w-full rounded">
            <option value="">Nombre de façades</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <label className="block"><input type="checkbox" name="sauna" onChange={handleChange} className="mr-2" />Sauna</label>
          <label className="block"><input type="checkbox" name="piscine" onChange={handleChange} className="mr-2" />Piscine</label>
          <input name="chambres" type="number" placeholder="Nombre de chambres" onChange={handleChange} className="border p-2 w-full rounded" />
          <label className="block"><input type="checkbox" name="dressing" onChange={handleChange} className="mr-2" />Dressing</label>
          <label className="block"><input type="checkbox" name="chaufferie" onChange={handleChange} className="mr-2" />Chaufferie</label>
          <label className="block"><input type="checkbox" name="bureau" onChange={handleChange} className="mr-2" />Bureau</label>
          <label className="block"><input type="checkbox" name="veranda" onChange={handleChange} className="mr-2" />Véranda</label>
          <label className="block"><input type="checkbox" name="autrePiece" onChange={handleChange} className="mr-2" />Autre pièce</label>
          <label className="block"><input type="checkbox" name="salleJeu" onChange={handleChange} className="mr-2" />Salle de jeu</label>
          <label className="block"><input type="checkbox" name="garage" onChange={handleChange} className="mr-2" />Garage</label>

          <select name="nombreGarages" onChange={handleChange} className="border p-2 w-full rounded">
            <option value="">Nombre de garages</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          <label className="block"><input type="checkbox" name="cave" onChange={handleChange} className="mr-2" />Cave</label>

          <button type="submit" className="bg-[#6b123b] text-white px-6 py-2 rounded w-full">Suivant</button>
        </form>

        {success && <p className="text-green-600 mt-4">✅ Envoyé avec succès !</p>}
        {error && <p className="text-red-600 mt-4">❌ Une erreur est survenue</p>}

        <div className="bg-gray-800 text-white mt-10 p-6 rounded-lg text-center">
          <Image src={LogoJS} alt="Logo JS InnovIA" width={90} height={90} className="mx-auto mb-2" />
          <p>Application créée par <strong>JS-INNOV.IA</strong></p>
          <p>Julien Pagin – Agence de Dour à votre service 📞 0494/11.90.90</p>
          <p className="text-sm">© 2025 Tous droits réservés – <a href="/mentions-legales" className="underline">Mentions légales</a></p>
          <p className="text-sm">
            <a href="#" className="underline">Conditions générales</a> – <a href="#" className="underline">Fiche produit à consulter</a>
          </p>
          <p className="text-sm">
            <a href="#" className="underline">RGPD</a>
          </p>
        </div>
      </div>
    </div>
  );
}
