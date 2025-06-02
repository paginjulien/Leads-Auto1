// pages/incendie.tsx
import Head from 'next/head';
import IncendieForm from '../components/IncendieForm';

export default function IncendiePage() {
  return (
    <>
      <Head>
        <title>Formulaire Incendie</title>
        <meta name="description" content="Demande d'assurance incendie" />
      </Head>
      <IncendieForm />
    </>
  );
}
