import Link from "next/link";

export default function Footer() {
  const Liens = [
    {
      id: 1,
      href: "/about",
      label: "A propos",
    },
    {
      id: 2,
      href: "/team",
      label: "Notre Equipe",
    },
    {
      id: 3,
      href: "/contact",
      label: "Contacts",
    },
  ];

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="flex flex-col items-center justify-between gap-4 mx-9 px-4 md:px-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 Plateforme de Visualisation des Statistiques. Tous droits
          réservés.
        </p>
        <div className="flex gap-4">
          {Liens.map((lien) => (
            <Link
              key={lien.id}
              href={lien.href}
              className="text-sm text-muted-foreground hover:underline"
            >
              {lien.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
