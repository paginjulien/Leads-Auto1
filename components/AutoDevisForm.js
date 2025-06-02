import React, { useState } from "react";
import axios from "axios";

const AutoDevisForm = () => {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', date_naissance: '', adresse: '',
    email: '', telephone: '', date_permis: '',
    carburant: '', kilometrage_annuel: '', sinistres: '', website: ''
  });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/leads", formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <div className="p-4 text-green-600">✅ Merci pour votre demande !</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      {step === 1 && (
        <>
          <input name="nom" placeholder="Nom" onChange={handleChange} required className="border w-full p-2" />
          <input name="prenom" placeholder="Prénom" onChange={handleChange} required className="border w-full p-2" />
          <input type="date" name="date_naissance" onChange={handleChange} required className="border w-full p-2" />
          <input name="adresse" placeholder="Adresse" onChange={handleChange} required className="border w-full p-2" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border w-full p-2" />
          <input name="telephone" placeholder="Téléphone" onChange={handleChange} required className="border w-full p-2" />
          <button type="button" onClick={() => setStep(2)} className="bg-purple-600 text-white px-4 py-2">Suivant</button>
        </>
      )}
      {step === 2 && (
        <>
          <input type="date" name="date_permis" onChange={handleChange} required className="border w-full p-2" />
          <select name="carburant" onChange={handleChange} required className="border w-full p-2">
            <option value="">Type de carburant</option>
            <option>Essence</option>
            <option>Diesel</option>
            <option>Hybride</option>
            <option>Électrique</option>
          </select>
          <select name="kilometrage_annuel" onChange={handleChange} required className="border w-full p-2">
            <option value="">Kilométrage annuel</option>
            <option value="5000">-5 000 km</option>
            <option value="10000">5 000 à 10 000 km</option>
            <option value="20000">10 000 à 20 000 km</option>
          </select>
          <textarea name="sinistres" placeholder="Remarques" onChange={handleChange} className="border w-full p-2" />
          <button type="button" onClick={() => setStep(1)} className="border px-4 py-2 mr-2">Retour</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2">{loading ? "Envoi..." : "Envoyer"}</button>
        </>
      )}
    </form>
  );
};

export default AutoDevisForm;
