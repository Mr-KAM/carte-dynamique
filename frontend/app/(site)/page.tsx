import FeaturesSection from "@/components/acceuil/FeaturesSection";
import HeroSection from "@/components/acceuil/HeroSection";
import { TeamSection } from "@/components/acceuil/TeamSection";
import React from "react";

export default function page() {
  return (
    <main className="flex-1 justify-center items-center">
      <HeroSection />
      <FeaturesSection />
      <TeamSection />
    </main>
  );
}
