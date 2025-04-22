import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeamSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Notre Équipe
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez les experts qui travaillent à rendre les données
              accessibles et utiles pour tous.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Kouassi Aya"
              />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Kouassi Aya</h3>
              <p className="text-sm text-muted-foreground">
                Directrice de Projet
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Diallo Karim"
              />
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Diallo Karim</h3>
              <p className="text-sm text-muted-foreground">
                Ingénieur en Données
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Sanogo Tené"
              />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Sanogo Tené</h3>
              <p className="text-sm text-muted-foreground">
                Analyste de Données
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/team">
              Voir toute l&apos;équipe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
