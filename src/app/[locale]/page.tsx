import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { SubBrandsSection } from "@/components/home/SubBrandsSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SubBrandsSection />
      <ActivitiesSection />
      <TestimonialsSection />
    </>
  );
}
