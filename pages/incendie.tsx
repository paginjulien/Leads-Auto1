import Head from 'next/head';
import IncendieForm from '../components/IncendieForm';

export default function IncendieMonsDour() {
  return (
    <>
      <Head>
        <title>Assurance Incendie Mons & Dour – Formulaire rapide | JS-INNOV.IA</title>
        <meta name="description" content="Formulaire d’assurance incendie en ligne pour les habitants de Mons, Dour et du Hainaut. JS-INNOV.IA, courtier local à votre écoute." />
        <meta name="keywords" content="assurance incendie Mons, assurance Dour, formulaire assurance Hainaut, courtier JS-INNOV.IA, devis assurance habitation" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tonsite.com/incendie" />
        <meta property="og:title" content="Assurance Incendie Mons & Dour – JS-INNOV.IA" />
        <meta property="og:description" content="Complétez votre demande de devis d’assurance incendie pour Mons ou Dour en 3 minutes avec JS-INNOV.IA." />
        <meta property="og:url" content="https://www.tonsite.com/incendie" />
        <meta property="og:type" content="website" />
      </Head>

      <IncendieForm />

      <div className="p-6 max-w-xl mx-auto text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold text-pv mb-2">Protégez votre habitation à Mons et Dour</h2>
        <p>
          Vous habitez <strong>Mons</strong> ou <strong>Dour</strong> ? JS-INNOV.IA vous accompagne avec une solution d’assurance incendie simple et rapide. 
          En tant que courtier digital et local, nous vous offrons un service 100% en ligne avec un accompagnement humain.
        </p>
        <p className="mt-2">
          Remplissez le formulaire pour recevoir un devis personnalisé. Nos experts du Hainaut sont disponibles pour vous conseiller et vous protéger efficacement.
        </p>
      </div>
    </>
  );
}
