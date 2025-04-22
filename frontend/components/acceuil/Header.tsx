"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Globe, Users } from "lucide-react";

export default function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const Liens = [
    {
      id: 1,
      href: "/about",
      label: "Accueil",
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Globe className="h-6 w-6" />
          <span>StatViz CI</span>
        </Link>
        <nav className="hidden md:flex ml-auto gap-6">
          {Liens.map((lien) => (
            <Link
              key={lien.id}
              href={lien.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {lien.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
