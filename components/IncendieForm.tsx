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
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-4 pb-16">
      <Head>
        <title>Assurance Incendie Mons & Dour – Formulaire rapide | JS-INNOV.IA</title>
        <meta name="description" content="Formulaire d’assurance incendie pour les habitants de Mons, Dour et du Hainaut." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tonsite.com/incendie" />
      </Head>

      <div className="relative z-10 w-full max-w-xl bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
        {/* VIDÉO RONDE À LA PLACE DE LA BANNIÈRE */}
        <div className="w-full flex justify-center py-4">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <video src="/video-jingle.mp4" autoPlay loop muted className="w-full h-full object-cover" />
          </div>
        </div>

        {/* LOGO PV EN FOND */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
          <img src="/pv-logo.png" alt="Logo PV" className="w-[400px] h-[400px] object-contain" />
        </div>

        <div className="relative z-10 p-6 pb-12">
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

          <div className="mt-6 text-center text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-pv">Je vous accompagne avec une solution d’assurance sur mesure</p>
            <p className="mt-1">
              Humain et local, un service à votre écoute. Devis et analyse gratuite afin d'optimiser votre budget et vous protéger efficacement.
            </p>
          </div>

          <div className="mt-6 border-t border-pv pt-4 text-center text-xs text-pv">
            <p>Application créée par <span className="font-semibold text-pv">JS-INNOV.IA</span></p>
            <p>Julien Pagin est le seul référencier autorisé pour cette application.</p>
            <p>© {new Date().getFullYear()} Tous droits réservés – <a href="/mentions-legales" className="underline text-pv">Mentions légales</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
