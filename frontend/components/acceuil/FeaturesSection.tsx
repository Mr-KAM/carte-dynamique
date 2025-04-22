import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BarChart3, Globe, Link } from "lucide-react";
import { Button } from "../ui/button";

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-orange">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Notre Plateforme
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
            <CardFooter>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Explorer</Link>
              </Button>
            </CardFooter>
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
            <CardFooter>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard?tab=map">Explorer</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M14 9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2z" />
                </svg>
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
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard?tab=ai">Explorer</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
