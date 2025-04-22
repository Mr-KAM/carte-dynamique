import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/navbar/Sidebar";
import Header from "@/components/acceuil/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Visualisation des statistiques des ministères en CI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <main className="flex w-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
