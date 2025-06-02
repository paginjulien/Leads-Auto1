import '../styles/globals.css'; // 👈 importe Tailwind

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
