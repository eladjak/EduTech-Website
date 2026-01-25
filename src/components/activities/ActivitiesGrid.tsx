"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { ActivityCard, type Activity } from "@/components/shared/ActivityCard";

// Mock data - will be replaced with Supabase
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
  {
    id: "3",
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
  {
    id: "5",
    slug: "python-for-educators",
    title_he: "Python למורים",
    title_en: "Python for Educators",
    description_he: "קורס Python מותאם במיוחד לאנשי חינוך",
    description_en: "Python course specially designed for educators",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    track: "edu",
    type: "course",
    duration: "20h",
    participants: 18,
    startDate: "2025-02-20",
  },
  {
    id: "6",
    slug: "robotics-summer-camp",
    title_he: "מחנה רובוטיקה - קיץ 2025",
    title_en: "Robotics Summer Camp 2025",
    description_he: "מחנה קיץ מרתק ברובוטיקה ותכנות",
    description_en: "Exciting summer camp in robotics and programming",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb",
    track: "camp",
    type: "camp",
    duration: "80h",
    participants: 25,
    startDate: "2025-07-01",
  },
];

export function ActivitiesGrid() {
  const t = useTranslations();

  return (
    <Section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Coming soon message */}
      <div className="mt-12 text-center">
        <p className="text-gray-500">
          More activities will be loaded from Supabase soon...
        </p>
      </div>
    </Section>
  );
}
