import { MinistrySelector } from "@/utils/MinistrySelector";
import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRight,
  BarChart3,
  BotMessageSquare,
  Globe,
  PieChart,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 px-9">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Visualisez les Statistiques des Ministères de Côte d'Ivoire : Bienvenue 👋🏾
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Une plateforme intuitive pour explorer, analyser et visualiser
                les indicateurs clés des ministères ivoiriens.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <MinistrySelector />
              <Button variant="orange" asChild>
                <Link href="/map">
                  Accéder au tableau de bord
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted/50 p-4 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="bg-background rounded-lg shadow-md p-4 flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-primary opacity-80" />
                </div>
                <div className="bg-background rounded-lg shadow-md p-4 flex items-center justify-center">
                  <PieChart className="h-24 w-24 text-primary opacity-80" />
                </div>
                <div className="bg-background rounded-lg shadow-md p-4 flex items-center justify-center">
                  <Globe className="h-24 w-24 text-primary opacity-80" />
                </div>
                <div className="bg-background rounded-lg shadow-md p-4 flex items-center justify-center">
                  <BotMessageSquare className="h-24 w-24 text-primary opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
