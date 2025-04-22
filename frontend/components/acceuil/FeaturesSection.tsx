import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BarChart3, BotMessageSquare, Globe, Link } from "lucide-react";
import { Button } from "../ui/button";

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-400">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Notre Plateforme
            </h2>
            <p className="max-w-[900px] text-slate-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez les fonctionnalités qui vous permettent d&apos;analyser
              et de visualiser les données des ministères de Côte d&apos;Ivoire.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle>Tableaux de Bord</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visualisez les indicateurs clés de performance à travers des
                tableaux de bord interactifs et personnalisables.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle>Cartes Interactives</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explorez les données géographiques à travers des cartes
                interactives pour une meilleure compréhension territoriale.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BotMessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle>Assistant IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Posez des questions en langage naturel et obtenez des analyses
                et des visualisations générées par notre assistant IA.
              </p>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="">Explorer</Link>
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
