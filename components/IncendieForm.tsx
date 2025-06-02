import Head from 'next/head';
import React, { useState } from 'react';

export default function IncendiePage() {
  const initialFormData = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setConfirmationMessage('');
    try {
      const response = await fetch('/api/incendie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setConfirmationMessage('✅ Formulaire envoyé avec succès !');
        setFormData({ ...initialFormData });
      } else {
        setConfirmationMessage('❌ Erreur lors de l\'envoi du formulaire.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setConfirmationMessage("❌ Une erreur s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <Head>
        <title>Assurance Incendie Mons & Dour – Formulaire rapide | JS-INNOV.IA</title>
        <meta name="description" content="Formulaire d’assurance incendie en ligne pour les habitants de Mons, Dour et du Hainaut. JS-INNOV.IA, courtier local à votre écoute." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tonsite.com/incendie" />
      </Head>

      {/* Logo PV en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <img src="/pv-logo.png" alt="Logo PV" className="w-96 h-96 object-contain" />
      </div>

      <main className="z-10 w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl animate-fade-in">
        <h1 className="text-xl font-bold text-pv mb-6 text-center">Formulaire Assurance Incendie</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required className="border p-2 rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 rounded" />
          <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="codePostal" placeholder="Code Postal" value={formData.codePostal} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="ville" placeholder="Ville" value={formData.ville} onChange={handleChange} required className="border p-2 rounded" />

          <button type="submit" disabled={isSubmitting} className="bg-pv text-white py-2 px-4 rounded hover:bg-pv-dark">
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
        {confirmationMessage && (
          <p className="mt-4 text-center text-sm font-medium text-pv animate-pulse">{confirmationMessage}</p>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-300 text-center text-xs py-6 w-full mt-4">
        <p>Application créée par <span className="text-white font-semibold">JS-INNOV.IA</span> (non affiliée aux assurances)</p>
        <p>Julien Pagin est le seul référencier autorisé pour cette application.</p>
        <p>© {new Date().getFullYear()} Tous droits réservés – <a href="/mentions-legales" className="underline text-gray-400">Mentions légales</a></p>
      </footer>
    </div>
  );
}

