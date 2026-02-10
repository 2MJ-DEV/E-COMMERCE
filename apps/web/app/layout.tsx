import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Market Fresh",
  description: "Découvrez Market Fresh, votre destination en ligne pour des produits frais et de qualité. Explorez notre marketplace pour trouver une variété de fruits, légumes, viandes et produits laitiers, tous soigneusement sélectionnés pour vous offrir le meilleur de la nature. Profitez d'une expérience d'achat conviviale et d'une livraison rapide directement à votre porte. Faites confiance à Market Fresh pour des produits frais, sains et délicieux à chaque commande.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
