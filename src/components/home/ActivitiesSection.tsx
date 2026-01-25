"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ActivityCard, type Activity } from "@/components/shared/ActivityCard";

// Mock data - will be replaced with real Supabase data
const mockActivities: Activity[] = [
  {
    id: "1",
    slug: "ai-fundamentals-adults",
    title_he: "יסודות בינה מלאכותית למבוגרים",
    title_en: "AI Fundamentals for Adults",
    description_he:
      "קורס מקיף בבינה מלאכותית המכסה את היסודות והטכנולוגיות המתקדמות",
    description_en:
      "Comprehensive AI course covering fundamentals and advanced technologies",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    track: "ai",
    type: "course",
    duration: "24h",
    participants: 15,
    startDate: "2025-02-01",
  },
  {
    id: "2",
    slug: "kids-scratch-camp",
    title_he: "מחנה קיץ - תכנות בסקרץ' לילדים",
    title_en: "Summer Camp - Scratch Programming for Kids",
    description_he:
      "מחנה קיץ מרתק בו ילדים לומדים תכנות דרך יצירת משחקים",
    description_en:
      "Exciting summer camp where kids learn programming through game creation",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    track: "kids",
    type: "camp",
    duration: "40h",
    participants: 20,
    startDate: "2025-02-10",
  },
  {
    id: "3",
    slug: "react-bootcamp-pro",
    title_he: "בוטקאמפ React למקצועיים",
    title_en: "React Bootcamp for Professionals",
    description_he: "בוטקאמפ מעמיק ב-React עבור מפתחים מקצועיים",
    description_en: "Intensive React bootcamp for professional developers",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    track: "pro",
    type: "course",
    duration: "32h",
    participants: 12,
    startDate: "2025-02-15",
  },
];

export function ActivitiesSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "he";

  return (
    <Section
      title={t("home.activities.title")}
      subtitle={t("home.activities.subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {mockActivities.map((activity, index) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            index={index}
            trackLabel={t(`home.tracks.${activity.track}.title`)}
            showTrackBadge={true}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <Link href={`/${locale}/activities`}>
          <Button size="lg" variant="primary">
            {t("common.readMore")}
            {isRTL ? (
              <ArrowLeft className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
