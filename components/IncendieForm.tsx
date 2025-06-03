# Créons maintenant un fichier React TSX nommé IncendieForm.tsx avec le contenu final attendu

tsx_content = """
import { useState } from 'react';
import Image from 'next/image';
import HeaderImage from '../public/banniere-pv.png';
import LogoPV from '../public/pv-logo.png';
import LogoJS from '../public/Js-innov.IA.png';
import MaisonImage from '../public/ExtraLarge.jpg';

export default function IncendieForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '', prenom: '', naissance: '', adresse: '',
    email: '', telephone: '', adresseBien: '',
    typeHabitation: '', maisonPassive: false,
    descriptionHabitation: '', facades: '',
    estimationContenu: '', sauna: false, piscine: false,
    dressing: false, chaufferie: false, bureau: false,
    veranda: false, autrePiece: false, salleJeu: false,
    cave: false, garage: '', chambres: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/incendie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Erreur lors de l’envoi');
      setSuccess(true);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 relative">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src={LogoPV} alt="Logo P&V" width={300} height={300} />
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
        <div className="flex justify-center mt-4">
          <div className="rounded-full overflow-hidden border-4 border-white shadow-md w-32 h-32">
            <Image src={MaisonImage} alt="Maison" width={128} height={128} />
          </div>
        </div>

        <h1 className="text-center text-xl text-[#6b123b] font-bold mt-2">Assurance incendie – votre DEVIS GRATUIT !</h1>
        <Image src={HeaderImage} alt="Bannière" width={1000} height={300} className="w-full object-cover" />

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-pv">
          <input name="nom" placeholder="Nom" onChange={handleChange} className="input" required />
          <input name="prenom" placeholder="Prénom" onChange={handleChange} className="input" required />
          <input type="date" name="naissance" onChange={handleChange} className="input" required />
          <input name="adresse" placeholder="Adresse" onChange={handleChange} className="input" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
          <input name="telephone" type="tel" placeholder="Téléphone" onChange={handleChange} className="input" required />
          <input name="adresseBien" placeholder="Adresse du bien" onChange={handleChange} className="input" />
          <input name="typeHabitation" placeholder="Type d'habitation" onChange={handleChange} className="input" />
          <input name="facades" placeholder="Nombre de façades" onChange={handleChange} className="input" />
          <input name="estimationContenu" placeholder="Estimation contenu (€)" onChange={handleChange} className="input" />
          <input name="chambres" placeholder="Nombre de chambres" onChange={handleChange} className="input" />
          <input name="garage" placeholder="Nombre de garages" onChange={handleChange} className="input" />

          <button type="submit" className="bg-[#6b123b] text-white px-4 py-2 rounded-md">
            Envoyer
          </button>

          {success && <p className="text-green-600 text-center">✅ Envoyé avec succès !</p>}
          {error && <p className="text-red-600 text-center">❌ Une erreur est survenue.</p>}
        </form>

        <div className="text-white text-sm text-center bg-gradient-to-r from-[#6b123b] via-[#7b2c4e] to-[#6b123b] py-4">
          <div className="flex flex-col items-center gap-2">
            <Image src={LogoJS} alt="Logo JS-INNOV.IA" width={60} height={60} className="rounded-full" />
            <p>Application créée par JS-INNOV.IA</p>
            <p>Julien Pagin – 📞 0494/11.90.90 – Agence de Dour</p>
            <a href="https://www.pv.be/fr/conditions-generales" className="underline">Conditions Générales</a>
            <a href="/Mentions_Legales.pdf" className="underline">Mentions légales</a>
            <a href="/Fiche Produit Ideal Habitation.pdf" className="underline">Fiche produit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

# Sauvegarder ce fichier
tsx_path = "/mnt/data/IncendieForm.tsx"
with open(tsx_path, "w", encoding="utf-8") as f:
    f.write(tsx_content.strip())

tsx_path
