// 🔧 Formulaire Incendie étendu avec champs supplémentaires

import { useState } from 'react';
import axios from 'axios';

export default function IncendieForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    datenaissance: '',
    adresse: '',
    email: '',
    telephone: '',
    numero: '',
    adresseBien: '',
    typeHabitation: '',
    maisonPassive: false,
    typeConstruction: '',
    descriptionHabitation: '',
    facades: '',
    facademoins5m: false,
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
    fichier: ''
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {step === 1 && (
        <>
          <input name="nom" placeholder="Nom" onChange={handleChange} />
          <input name="prenom" placeholder="Prénom" onChange={handleChange} />
          <input name="datenaissance" type="date" placeholder="Date de naissance" onChange={handleChange} />
          <input name="adresse" placeholder="Adresse" onChange={handleChange} />
          <input name="numero" placeholder="Numéro" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="telephone" type="tel" placeholder="Téléphone" onChange={handleChange} />
        </>
      )}

      {step === 2 && (
        <>
          <input name="adresseBien" placeholder="Adresse du bien" onChange={handleChange} />
          <select name="typeHabitation" onChange={handleChange}>
            <option value="">Type d'habitation</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
          </select>
          <select name="typeConstruction" onChange={handleChange}>
            <option value="">Type de construction</option>
            <option value="traditionnelle">Traditionnelle</option>
            <option value="ossature bois">Ossature bois</option>
          </select>
          <label>
            <input type="checkbox" name="maisonPassive" onChange={handleChange} /> Maison passive
          </label>
          <textarea name="descriptionHabitation" placeholder="Description" onChange={handleChange} />
          <select name="facades" onChange={handleChange}>
            <option value="">Façades</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label>
            <input type="checkbox" name="facademoins5m" onChange={handleChange} /> Façade à moins de 5m d’un autre bâtiment
          </label>
          <input name="estimationContenu" type="number" placeholder="Estimation du contenu (€)" onChange={handleChange} />
        </>
      )}

      {step === 3 && (
        <>
          {["sauna", "piscine", "dressing", "chaufferie", "bureau", "veranda", "autrePiece", "salleJeu", "cave"].map((field) => (
            <label key={field}>
              <input type="checkbox" name={field} onChange={handleChange} /> {field}
            </label>
          ))}
          <select name="garage" onChange={handleChange}>
            <option value="">Garage</option>
            <option value="1">1 place</option>
            <option value="2">2 places</option>
            <option value="3">3 places</option>
          </select>
          <input name="chambres" placeholder="Nombre de chambres" onChange={handleChange} />
          <input name="fichier" placeholder="Lien vers un fichier (URL)" onChange={handleChange} />
        </>
      )}

      <div className="flex justify-between mt-4">
        {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Précédent</button>}
        {step < 3 ? (
          <button type="button" onClick={() => setStep(step + 1)}>Suivant</button>
        ) : (
          <button type="submit">Envoyer</button>
        )}
      </div>
    </form>
  );
}
