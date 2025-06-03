// pages/incendie.js
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import LogoJS from '../public/Js-innov.IA.png';
import HeaderImage from '../public/assurance incendie banniere.svg';

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
      <div className="absolute inset-0 opacity-5">
        <Image src={require('../public/julien logo P&V.png')} alt="Logo P&V" layout="fill" objectFit="contain" />
      </div>
      <div className="relative z-10 max-w-xl w-full">
        <Image src={HeaderImage} alt="Maison" className="mx-auto mb-6 rounded shadow-lg w-full h-auto" />
        <h1 className="text-3xl font-bold mb-6 text-[#6b123b] text-center">Demandez votre devis gratuit</h1>
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
          <label className="block"><input type="checkbox" name="cave" onChange={handleChange} className="mr-2" />Cave</label>

          <button type="submit" className="bg-[#6b123b] text-white px-6 py-2 rounded w-full">Suivant</button>
        </form>

        {success && <p className="text-green-600 mt-4">✅ Envoyé avec succès !</p>}
        {error && <p className="text-red-600 mt-4">❌ Une erreur est survenue</p>}

        <div className="flex justify-center items-center gap-8 mt-10">
          <Image src={LogoJS} alt="Logo JS InnovIA" width={90} height={90} />
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">© 2025 JS Innov.IA - <a href="/mentions-legales" className="underline">Mentions légales</a></p>
        <p className="text-xs text-gray-400 text-center">Application réalisée par JS Innov.IA</p>
      </div>
    </div>
  );
}
