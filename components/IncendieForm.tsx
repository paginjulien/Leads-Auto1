import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import LogoJS from '../public/Js-innov.IA.png';
import LogoPV from '../public/pv-logo.png';
import HeaderImage from '../public/banniere-pv.png';

export default function IncendieForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    naissance: '',
    adresse: '',
    email: '',
    telephone: '',
    adresseBien: '',
    typeHabitation: '',
    maisonPassive: false,
    descriptionHabitation: '',
    facades: '',
    estimationContenu: '',
    sauna: false,
    piscine: false,
    dressing: false,
    chaufferie: false,
    bureau: false,
    veranda: false,
    autrePiece: false,
    salleJeu: false,
    cave: false,
    garage: '',
    chambres: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
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

  const inputBaseClass =
    "border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pv text-sm text-pv";

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input name="nom" placeholder="Nom *" onChange={handleChange} className={inputBaseClass} />
            <input name="prenom" placeholder="Prénom *" onChange={handleChange} className={inputBaseClass} />
            <label className="text-sm text-pv">
              Date de naissance *
              <input name="naissance" type="date" onChange={handleChange} className={inputBaseClass} />
            </label>
            <input name="adresse" placeholder="Adresse *" onChange={handleChange} className={inputBaseClass} />
            <input name="email" type="email" placeholder="Email *" onChange={handleChange} className={inputBaseClass} />
            <input name="telephone" type="tel" placeholder="Téléphone *" onChange={handleChange} className={inputBaseClass} />
            {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
          </>
        );

      case 2:
        return (
          <>
            <input name="adresseBien" placeholder="Adresse du bien à assurer" onChange={handleChange} className={inputBaseClass} />
            <select name="typeHabitation" onChange={handleChange} className={inputBaseClass}>
              <option value="">Type d'habitation</option>
              <option value="maison">Maison</option>
              <option value="appartement">Appartement</option>
            </select>
            <label className="text-sm text-pv">
              <input type="checkbox" name="maisonPassive" onChange={handleChange} className="mr-2" />
              Maison passive
            </label>
            <textarea name="descriptionHabitation" placeholder="Description de l'habitation" onChange={handleChange} className={inputBaseClass} />
            <select name="facades" onChange={handleChange} className={inputBaseClass}>
              <option value="">Nombre de façades</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <label className="block text-sm font-medium text-pv">Estimation du contenu (€)</label>
            <input name="estimationContenu" type="number" placeholder="Montant" onChange={handleChange} className={inputBaseClass} />
          </>
        );

      case 3:
        return (
          <>
            {[
              "sauna",
              "piscine",
              "dressing",
              "chaufferie",
              "bureau",
              "veranda",
              "autrePiece",
              "salleJeu",
              "cave",
            ].map((field) => (
              <label key={field} className="block text-sm text-pv">
                <input type="checkbox" name={field} onChange={handleChange} className="mr-2" />
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            ))}

            <label className="block text-sm text-pv">
              Nombre de places de garage
              <select name="garage" onChange={handleChange} className={inputBaseClass}>
                <option value="">Aucune</option>
                <option value="1">1 place</option>
                <option value="2">2 places</option>
                <option value="3">3 places</option>
                <option value="4">4 places</option>
                <option value="5">5 places</option>
              </select>
            </label>

            <input name="chambres" type="number" placeholder="Nombre de chambres" onChange={handleChange} className={inputBaseClass} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 relative">
      {/* ✅ Logo P&V en arrière-plan */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src={LogoPV} alt="Logo P&V" width={320} height={320} />
      </div>

      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <Image src={HeaderImage} alt="Bannière" width={1000} height={300} className="w-full object-cover" />

        <div className="p-6 flex flex-col gap-4 text-pv">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {renderStep()}

            <div className={`pt-4 flex ${step === 1 ? 'justify-center' : 'flex-col sm:flex-row justify-between gap-2'}`}>
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="bg-gray-200 text-pv px-4 py-2 rounded-md w-full sm:w-auto">
                  Précédent
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={handleNext} className="bg-pv text-white px-4 py-2 rounded-md w-full sm:w-auto">
                  Suivant
                </button>
              ) : (
                <button type="submit" className="bg-pv text-white px-4 py-2 rounded-md w-full sm:w-auto">
                  Envoyer
                </button>
              )}
            </div>
          </form>

          {success && <p className="text-green-600 text-center text-sm">✅ Envoyé avec succès !</p>}
          {error && <p className="text-red-600 text-center text-sm">❌ Une erreur est survenue</p>}

          {/* ✅ Footer stylisé */}
          <div className="bg-white text-pv text-center py-6 rounded-md mt-6">
            <div className="flex flex-col items-center gap-2">
              <Image src={LogoJS} alt="Logo JS-INNOV.IA" width={80} height={80} className="rounded-full" />
              <p className="text-sm font-light">Application créée par <strong>JS-INNOV.IA</strong></p>
              <a href="/mentions-legales" className="text-xs underline text-pv/80 hover:text-pv">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

