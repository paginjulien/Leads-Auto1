from pathlib import Path

# Créer le nouveau fichier IncendieForm.tsx avec couleur ajustée en bas
incendie_form_code = """
import { useState } from 'react';
import Image from 'next/image';
import LogoJS from '../public/Js-innov.IA.png';
import LogoPV from '../public/pv-logo.png';
import MaisonImage from '../public/ExtraLarge.jpg';

export default function IncendieForm() {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', naissance: '', adresse: '',
    email: '', telephone: '', adresseBien: '', typeHabitation: '',
    maisonPassive: false, descriptionHabitation: '', facades: '',
    estimationContenu: '', sauna: false, piscine: false,
    dressing: false, chaufferie: false, bureau: false,
    veranda: false, autrePiece: false, salleJeu: false,
    cave: false, garage: '', chambres: ''
  });
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateStep1 = () => {
    const { nom, prenom, naissance, adresse, email, telephone } = formData;
    if (!nom || !prenom || !naissance || !adresse || !email || !telephone) {
      setValidationError('Tous les champs marqués sont obligatoires.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/incendie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess(true);
        setError(false);
      } else {
        throw new Error('Erreur lors de l’envoi');
      }
    } catch {
      setError(true);
      setSuccess(false);
    }
  };

  const inputStyle = "border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pv text-sm text-pv";

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input name="nom" placeholder="Nom *" onChange={handleChange} className={inputStyle} />
            <input name="prenom" placeholder="Prénom *" onChange={handleChange} className={inputStyle} />
            <input name="naissance" type="date" onChange={handleChange} className={inputStyle} />
            <input name="adresse" placeholder="Adresse *" onChange={handleChange} className={inputStyle} />
            <input name="email" type="email" placeholder="Email *" onChange={handleChange} className={inputStyle} />
            <input name="telephone" type="tel" placeholder="Téléphone *" onChange={handleChange} className={inputStyle} />
            {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
          </>
        );
      case 2:
        return (
          <>
            <input name="adresseBien" placeholder="Adresse du bien" onChange={handleChange} className={inputStyle} />
            <select name="typeHabitation" onChange={handleChange} className={inputStyle}>
              <option value="">Type d'habitation</option>
              <option value="maison">Maison</option>
              <option value="appartement">Appartement</option>
            </select>
            <label className="text-sm text-pv"><input type="checkbox" name="maisonPassive" onChange={handleChange} className="mr-2" />Maison passive</label>
            <textarea name="descriptionHabitation" placeholder="Description" onChange={handleChange} className={inputStyle} />
            <select name="facades" onChange={handleChange} className={inputStyle}>
              <option value="">Nombre de façades</option>
              <option value="2">2</option><option value="3">3</option><option value="4">4</option>
            </select>
            <input name="estimationContenu" type="number" placeholder="Estimation contenu (€)" onChange={handleChange} className={inputStyle} />
          </>
        );
      case 3:
        return (
          <>
            {["sauna", "piscine", "dressing", "chaufferie", "bureau", "veranda", "autrePiece", "salleJeu", "cave"].map((field) => (
              <label key={field} className="text-sm text-pv"><input type="checkbox" name={field} onChange={handleChange} className="mr-2" />{field}</label>
            ))}
            <select name="garage" onChange={handleChange} className={inputStyle}>
              <option value="">Garage</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
            </select>
            <input name="chambres" type="number" placeholder="Nombre de chambres" onChange={handleChange} className={inputStyle} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="absolute top-4 left-4 z-0 opacity-10">
        <Image src={LogoPV} alt="Logo P&V" width={300} height={300} />
      </div>
      <div className="relative z-10 max-w-2xl w-full bg-white/80 rounded-2xl shadow-2xl p-6">
        <div className="flex justify-center mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image src={MaisonImage} alt="Maison" width={112} height={112} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-center text-pv mb-2">Assurance incendie – votre DEVIS GRATUIT !</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {renderStep()}
          <div className="flex justify-between pt-4">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="bg-gray-200 text-pv px-4 py-2 rounded-md">Précédent</button>}
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="bg-pv text-white px-4 py-2 rounded-md">Suivant</button>
            ) : (
              <button type="submit" className="bg-pv text-white px-4 py-2 rounded-md">Envoyer</button>
            )}
          </div>
        </form>
        {success && <p className="text-green-600 text-center mt-4">✅ Merci Julien Pagin vous contactera sous 24h au 0494/11.90.90</p>}
        {error && <p className="text-red-600 text-center mt-4">❌ Une erreur est survenue</p>}
        <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#1F2A44' }}>
          <div className="flex flex-col items-center gap-2 text-white text-sm text-center">
            <Image src={LogoJS} alt="JS-INNOV.IA" width={80} height={80} className="rounded-full" />
            <p>Application créée par JS-INNOV.IA</p>
            <a href="https://www.pv.be/fr/conditions-generales" target="_blank" className="underline">Conditions Générales</a>
            <a href="/Fiche Produit Ideal Habitation.pdf" target="_blank" className="underline">Fiche Produit à consulter</a>
            <a href="/Mentions_Legales.pdf" target="_blank" className="underline">Mentions légales</a>
          </div>
        </div>
      </div>
    </div>
  );
}
