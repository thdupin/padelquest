import "../app/globals.css"; // Ajuste le chemin vers tes styles Tailwind si besoin
import Navbar from "@/components/Navbar"; // L'alias @ pointe vers la racine /src

export const metadata = {
  title: "PadelQuest",
  description: "La couche compétitive du padel local",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-bg text-text antialiased">
        {children}
        
        <Navbar />
      </body>
    </html>
  );
}