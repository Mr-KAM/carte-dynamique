import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import teamMembers from "@/utils/teamMembers";

export default function TeamPage() {
  return (
    <div className="mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Notre Équipe</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez les experts qui travaillent à rendre les données accessibles
          et utiles pour tous.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-center mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={member.photo} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-center text-2xl">
                {member.name}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {member.role}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-center">{member.bio}</p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
