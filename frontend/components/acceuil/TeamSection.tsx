import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamMember from "./TeamMember";
import teamMembers from "@/utils/teamMembers";

export function TeamSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="px-4 md:px-6">
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

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 mt-8">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              avatarSrc={member.photo}
              avatarAlt={member.name}
              avatarFallback={member.name}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/team">
              En savoir plus sur l&apos;équipe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
