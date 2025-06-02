import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/incendie');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen justify-between items-center bg-white">
      {/* Haut de page réservé à Julien Pagin */}
      <header className="bg-pv text-white text-center py-4 shadow-md w-full">
        <h1 className="text-lg font-semibold">Julien Pagin</h1>
        <p className="text-sm">Votre conseiller dédié – Spécialiste assurances Mons & Dour</p>
      </header>

      {/* Message de chargement */}
      <main className="flex-grow flex items-center justify-center">
        {loading && (
          <div className="text-center animate-pulse text-pv text-sm">
            Redirection en cours vers le formulaire...
          </div>
        )}
      </main>

      {/* Bas de page réservé à JS-INNOV.IA */}
      <footer className="bg-gray-900 text-gray-300 text-center text-xs py-6 space-y-1 w-full">
        <p>Application créée par <span className="text-white font-semibold">JS-INNOV.IA</span> (non affiliée aux assurances)</p>
        <p>Julien Pagin est le seul référencier autorisé pour cette application.</p>
        <p>© {new Date().getFullYear()} Tous droits réservés – <a href="/mentions-legales" className="underline text-gray-400">Mentions légales</a></p>
      </footer>
    </div>
  );
}
