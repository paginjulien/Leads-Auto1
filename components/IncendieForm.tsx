// 🔧 Formulaire Incendie avec mise en page stylée, centrée, et branding P&V
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import LogoPV from '../public/pv-logo.png';

export default function IncendieForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '', prenom: '', datenaissance: '', adresse: '', email: '', telephone: '', numero: '',
    adresseBien: '', typeHabitation: '', maisonPassive: false, typeConstruction: '',
    descriptionHabitation: '', facades: '', facademoins5m: false, estimationContenu: '',
    sauna: false, piscine: false, dressing: false, chaufferie: false, bureau: false, veranda: false,
    autrePiece: false, salleJeu: false, cave: false, garage: '', chambres: '', fichier: ''
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incendie', formData);
      alert('✅ Formulaire envoyé avec succès !');
    } catch (error) {
      console.error('Erreur formulaire :', error);
      alert('❌ Une erreur est survenue.');
    }
  };

  const inputBaseClass = "border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pv text-sm text-pv";

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      {/* Logo P&V en arrière-plan */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src={LogoPV} alt="Logo P&V" width={300} height={300} />
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-pv text-center">Formulaire Assurance Incendie – Mons / Dour</h1>

        <div className="text-center text-gray-700 text-sm space-y-2">
          <p>
            Vous habitez <strong>Mons</strong> ou <strong>Dour</strong> ? <strong>JS-INNOV.IA</strong> vous accompagne avec une solution d’assurance incendie simple et rapide.<br />
            En tant que courtier digital et local, nous vous offrons un service avec un accompagnement humain.
          </p>
          <p>
            Remplissez le formulaire pour recevoir un devis personnalisé. Nos experts du Hainaut sont disponibles pour vous conseiller et vous protéger efficacement.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="nom" placeholder="Nom" onChange={handleChange} className={inputBaseClass} />
              <input name="prenom" placeholder="Prénom" onChange={handleChange} className={inputBaseClass} />
              <input name="datenaissance" type="date" placeholder="Date de naissance" onChange={handleChange} className={inputBaseClass} />
              <input name="adresse" placeholder="Adresse" onChange={handleChange} className={inputBaseClass} />
              <input name="numero" placeholder="Numéro" onChange={handleChange} className={inputBaseClass} />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} className={inputBaseClass} />
              <input name="telephone" type="tel" placeholder="Téléphone" onChange={handleChange} className={inputBaseClass} />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="adresseBien" placeholder="Adresse du bien" onChange={handleChange} className={inputBaseClass} />
              <select name="typeHabitation" onChange={handleChange} className={inputBaseClass}>
                <option value="">Type d'habitation</option>
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
              </select>
              <select name="typeConstruction" onChange={handleChange} className={inputBaseClass}>
                <option value="">Type de construction</option>
                <option value="traditionnelle">Traditionnelle</option>
                <option value="ossature bois">Ossature bois</option>
              </select>
              <label className="text-sm text-pv">
                <input type="checkbox" name="maisonPassive" onChange={handleChange} className="mr-2" /> Maison passive
              </label>
              <textarea name="descriptionHabitation" placeholder="Description de l'habitation" onChange={handleChange} className={inputBaseClass} />
              <select name="facades" onChange={handleChange} className={inputBaseClass}>
                <option value="">Nombre de façades</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <label className="text-sm text-pv">
                <input type="checkbox" name="facademoins5m" onChange={handleChange} className="mr-2" /> Façade à moins de 5m d’un autre bâtiment
              </label>
              <input name="estimationContenu" type="number" placeholder="Estimation du contenu (€)" onChange={handleChange} className={inputBaseClass} />
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["sauna", "piscine", "dressing", "chaufferie", "bureau", "veranda", "autrePiece", "salleJeu", "cave"].map((field) => (
                <label key={field} className="text-sm text-pv">
                  <input type="checkbox" name={field} onChange={handleChange} className="mr-2" />
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
              <select name="garage" onChange={handleChange} className={inputBaseClass}>
                <option value="">Garage</option>
                <option value="1">1 place</option>
                <option value="2">2 places</option>
                <option value="3">3 places</option>
              </select>
              <input name="chambres" placeholder="Nombre de chambres" onChange={handleChange} className={inputBaseClass} />
              <input name="fichier" placeholder="Lien vers un fichier (URL)" onChange={handleChange} className={inputBaseClass} />
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="bg-gray-200 text-pv px-4 py-2 rounded-md">
                Précédent
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="bg-pv text-white px-4 py-2 rounded-md">
                Suivant
              </button>
            ) : (
              <button type="submit" className="bg-pv text-white px-4 py-2 rounded-md">
                Envoyer
              </button>
            )}
          </div>
        </form>

        <footer className="text-xs text-center text-gray-500 pt-6 border-t border-gray-200">
          Julien Pagin est le seul référencier autorisé pour cette application. <br />
          Application créée par <strong>JS-INNOV.IA</strong> (non affiliée aux assurances).
        </footer>
      </div>
    </div>
  );
}
