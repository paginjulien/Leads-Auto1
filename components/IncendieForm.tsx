import Head from 'next/head';
import React, { useState, useEffect } from 'react';

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
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Assurance Incendie Mons & Dour – Formulaire rapide | JS-INNOV.IA</title>
        <meta name="description" content="Formulaire d’assurance incendie pour les habitants de Mons, Dour et du Hainaut." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tonsite.com/incendie" />
      </Head>

      {/* Fond avec logo PV */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <img src="/pv-logo.png" alt="Logo PV" className="w-[600px] h-[600px] object-contain" />
      </div>

      {/* Modal Formulaire */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-end justify-center px-4 pb-16">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl w-full max-w-xl p-6 animate-fade-in">
          <h1 className="text-xl font-bold text-pv mb-6 text-center">Formulaire Assurance Incendie</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required className="border p-2 rounded bg-white/70" />
            <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required className="border p-2 rounded bg-white/70" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 rounded bg-white/70" />
            <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} required className="border p-2 rounded bg-white/70" />
            <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required className="border p-2 rounded bg-white/70" />
            <input type="text" name="codePostal" placeholder="Code Postal" value={formData.codePostal} onChange={handleChange} required className="border p-2 rounded bg-white/70" />
            <input type="text" name="ville" placeholder="Ville" value={formData.ville} onChange={handleChange} required className="border p-2 rounded bg-white/70" />

            <button type="submit" disabled={isSubmitting} className="bg-pv text-white py-2 px-4 rounded hover:bg-pv-dark">
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
          {confirmationMessage && (
            <p className="mt-4 text-center text-sm font-medium text-pv animate-pulse">{confirmationMessage}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full bg-gray-900 text-gray-300 text-center text-xs py-6">
        <p>Application créée par <span className="text-white font-semibold">JS-INNOV.IA</span> (non affiliée aux assurances)</p>
        <p>Julien Pagin est le seul référencier autorisé pour cette application.</p>
        <p>© {new Date().getFullYear()} Tous droits réservés – <a href="/mentions-legales" className="underline text-gray-400">Mentions légales</a></p>
      </footer>
    </div>
  );
}

