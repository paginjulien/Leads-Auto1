
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import LogoJS from '../public/Js-innov.IA.png';
import LogoPV from '../public/pv-logo.png';
import MaisonImage from '../public/maison-rond.png';
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
    chambres: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incendie', formData);
      setSuccess(true);
      setError(false);
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };

  const inputClass = "border border-gray-300 p-2 w-full rounded-md text-sm text-pv focus:outline-none focus:ring-2 focus:ring-pv";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src={LogoPV} alt="Logo PV" width={280} height={280} />
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white bg-opacity-90 rounded-3xl shadow-xl overflow-hidden">
        <div className="w-full flex justify-center mt-4">
          <div className="rounded-full border-4 border-white overflow-hidden w-40 h-40 -mt-10 shadow-md">
            <Image src={MaisonImage} alt="Maison" layout="responsive" />
          </div>
        </div>

        <Image src={HeaderImage} alt="Bannière" className="w-full object-cover h-32" />

        <div className="p-6 flex flex-col gap-4 text-pv">
          {!success ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <input name="nom" placeholder="Nom *" onChange={handleChange} className={inputClass} />
                  <input name="prenom" placeholder="Prénom *" onChange={handleChange} className={inputClass} />
                  <input name="naissance" type="date" onChange={handleChange} className={inputClass} />
                  <input name="adresse" placeholder="Adresse *" onChange={handleChange} className={inputClass} />
                  <input name="email" type="email" placeholder="Email *" onChange={handleChange} className={inputClass} />
                  <input name="telephone" type="tel" placeholder="Téléphone *" onChange={handleChange} className={inputClass} />
                </>
              )}

              {step === 2 && (
                <>
                  <input name="adresseBien" placeholder="Adresse du bien à assurer" onChange={handleChange} className={inputClass} />
                  <select name="typeHabitation" onChange={handleChange} className={inputClass}>
                    <option value="">Type d'habitation</option>
                    <option value="maison">Maison</option>
                    <option value="appartement">Appartement</option>
                  </select>
                  <label className="text-sm text-pv">
                    <input type="checkbox" name="maisonPassive" onChange={handleChange} className="mr-2" />
                    Maison passive
                  </label>
                  <textarea name="descriptionHabitation" placeholder="Description de l'habitation" onChange={handleChange} className={inputClass} />
                  <select name="facades" onChange={handleChange} className={inputClass}>
                    <option value="">Nombre de façades</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <input name="estimationContenu" type="number" placeholder="Estimation contenu (€)" onChange={handleChange} className={inputClass} />
                  <input name="chambres" type="number" placeholder="Nombre de chambres" onChange={handleChange} className={inputClass} />
                </>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-pv px-4 py-2 rounded-md">
                    Précédent
                  </button>
                )}
                {step < 2 ? (
                  <button type="button" onClick={handleNext} className="bg-pv text-white px-4 py-2 rounded-md">
                    Suivant
                  </button>
                ) : (
                  <button type="submit" className="bg-pv text-white px-4 py-2 rounded-md">
                    Envoyer
                  </button>
                )}
              </div>
              {error && <p className="text-red-600 text-sm text-center">❌ Une erreur est survenue</p>}
            </form>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-xl font-semibold text-pv">✅ Merci pour votre demande !</p>
              <p className="text-sm">Vous recevrez votre devis personnalisé sous 24h.</p>
              <p className="text-sm">Julien Pagin – Agence de Dour<br/>0494/11.90.90</p>
              <a href="https://www.pv.be/fr/conditions-generales" className="text-xs underline text-pv/80 hover:text-pv">📄 Conditions générales</a><br/>
              <a href="/Fiche Produit Ideal Habitation.pdf" className="text-xs underline text-pv/80 hover:text-pv" download>📘 Fiche produit à consulter</a><br/>
              <a href="/Mentions_Legales.pdf" className="text-xs underline text-pv/80 hover:text-pv" download>📄 Mentions légales</a><br/>
              <a href="https://calendly.com/julien-pagin/rdv" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">📅 Planifiez un rendez-vous en ligne</a>
            </div>
          )}

          <div className="bg-[#1f2a3f] text-white text-center py-4 rounded-xl mt-6">
            <div className="flex flex-col items-center gap-2">
              <Image src={LogoJS} alt="Logo JS-INNOV.IA" width={80} height={80} className="rounded-full" />
              <p className="text-sm font-light">Application créée par <strong>JS-INNOV.IA</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<div className="text-center text-xs text-white mt-8">
  <p>Tous droits réservés – <a href="/mentions-legales" className="underline">Mentions légales RGPD</a></p>
  <p><a href="https://www.pv.be/fr/conditions-generales" target="_blank" className="underline">Conditions générales</a> – 
     <a href="/Fiche Produit Ideal Habitation.pdf" target="_blank" className="underline">Fiche produit à consulter</a></p>
  <p>© 2025</p>
</div>
