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

      <div className="relative z-10 w-full max-w-xl bg-white/30 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
        {/* VIDÉO RONDE */}
        <div className="w-full flex flex-col items-center justify-center pt-6">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <video src="/video-jingle.mp4" autoPlay loop muted className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-pv">Assurance incendie – votre DEVIS GRATUIT !</h2>
        </div>

        {/* LOGO PV EN FOND */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
          <img src="/pv-logo.png" alt="Logo PV" className="w-[400px] h-[400px] object-contain" />
        </div>

        <div className="relative z-10 p-6 pb-16">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required className="border p-2 rounded bg-white/30" />
            <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required className="border p-2 rounded bg-white/30" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 rounded bg-white/30" />
            <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} required className="border p-2 rounded bg-white/30" />
            <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required className="border p-2 rounded bg-white/30" />
            <input type="text" name="codePostal" placeholder="Code Postal" value={formData.codePostal} onChange={handleChange} required className="border p-2 rounded bg-white/30" />
            <input type="text" name="ville" placeholder="Ville" value={formData.ville} onChange={handleChange} required className="border p-2 rounded bg-white/30" />

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
            <p className="mt-4 text-xs italic text-pv">Protégez votre habitation à Mons et Dour</p>
          </div>

          <div className="mt-6 border-t border-pv pt-4 text-center text-xs text-pv">
            <img src="/Js-innov.IA.png" alt="JS-INNOV.IA" className="mx-auto w-16 h-16 mb-2 rounded-full" />
            <p>Application créée par <span className="font-semibold text-pv">JS-INNOV.IA</span></p>
            <p className="text-sm">Julien Pagin – Agence de Dour à votre service 📞 0494/11.90.90</p>
            <p>© {new Date().getFullYear()} Tous droits réservés – <a href="/Mentions_Legales.pdf" className="underline text-pv">Mentions légales</a></p>
            <p><a href="https://www.pv.be/fr/conditions-generales" className="underline text-pv">Conditions générales</a> – <a href="/Fiche%20Produit%20Ideal%20Habitation.pdf" className="underline text-pv">Fiche produit à consulter</a></p>
            <button className="mt-2 underline text-pv hover:text-pv-dark text-xs">RGPD</button>
          </div>
        </div>
      </div>
    </div>
  );
}
