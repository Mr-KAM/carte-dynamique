import { BarChart3, BotMessageSquare, Globe } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Tableaux de Bord",
      description:
        "Visualisez les indicateurs clés de performance à travers des tableaux de bord interactifs et personnalisables.",
    },
    {
      icon: Globe,
      title: "Cartes Interactives",
      description:
        "Explorez les données géographiques à travers des cartes interactives pour une meilleure compréhension territoriale.",
    },
    {
      icon: BotMessageSquare,
      title: "Assistant IA",
      description:
        "Posez des questions en langage naturel et obtenez des analyses et des visualisations générées par notre assistant IA.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-400">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Notre Plateforme
            </h2>
            <p className="max-w-[900px] text-slate-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez les fonctionnalités qui vous permettent d&apos;analyser
              et de visualiser les données des ministères de Côte d&apos;Ivoire.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
