import { Wrench } from "lucide-react";

export default function About() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">À Propos</h1>
      <div className="prose max-w-none">
        <p>
          Cette application permet de visualiser les indicateurs du système
          d'EFTP en Côte d'Ivoire une carte. <br />
          Elle offre également des fonctionnalités d'importation de données et
          des tableaux de bord statistiques.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-6">Fonctionnalités</h2>
        <ul className="space-y-2">
          <li>Importation de fichiers CSV </li>
          <li> Tableau de bord interactif </li>
          <li> Visualisation cartographique</li>
          <li> Personnalisation des palettes de couleurs</li>
        </ul>
      </div>
    </div>
  );
}
