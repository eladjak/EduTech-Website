"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { ActivityCard, type Activity } from "@/components/shared/ActivityCard";

// Mock data per track - will be replaced with real Supabase queries
const trackActivitiesMock: Record<string, Activity[]> = {
  ai: [
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
      slug: "machine-learning-bootcamp",
      title_he: "בוטקאמפ למידת מכונה",
      title_en: "Machine Learning Bootcamp",
      description_he: "בוטקאמפ מעמיק ב-ML וניתוח נתונים",
      description_en: "Intensive ML and data analysis bootcamp",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b",
      track: "ai",
      type: "course",
      duration: "40h",
      participants: 12,
      startDate: "2025-02-15",
    },
  ],
  kids: [
    {
      id: "3",
      slug: "kids-scratch-camp",
      title_he: "מחנה קיץ - תכנות בסקרץ' לילדים",
      title_en: "Summer Camp - Scratch Programming",
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
  ],
  pro: [
    {
      id: "4",
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
  ],
  edu: [],
  camp: [],
};

interface TrackActivitiesProps {
  trackId: "ai" | "kids" | "pro" | "edu" | "camp";
}

export function TrackActivities({ trackId }: TrackActivitiesProps) {
  const t = useTranslations();
  const activities = trackActivitiesMock[trackId] || [];

  if (activities.length === 0) {
    return (
      <Section id="activities" title={t("tracks.activities.title")}>
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {t("tracks.activities.coming-soon")}
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="activities"
      title={t("tracks.activities.title")}
      subtitle={t("tracks.activities.subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, index) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            index={index}
            showTrackBadge={false}
          />
        ))}
      </div>
    </Section>
  );
}
