"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { SubBrandsSection } from "@/components/home/SubBrandsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SubBrandsSection />
    </main>
  );
}
