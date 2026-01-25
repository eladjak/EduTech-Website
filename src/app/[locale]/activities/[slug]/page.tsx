import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ActivityDetails } from "@/components/activities/ActivityDetails";
import type { Activity } from "@/components/shared/ActivityCard";

// Mock function - will be replaced with Supabase query
async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const mockActivities: Activity[] = [
    {
      id: "1",
      slug: "ai-fundamentals-adults",
      title_he: "יסודות בינה מלאכותית למבוגרים",
      title_en: "AI Fundamentals for Adults",
      description_he:
        "קורס מקיף בבינה מלאכותית המכסה את היסודות והטכנולוגיות המתקדמות. נלמד על למידת מכונה, רשתות נוירונים, עיבוד שפה טבעית ועוד.",
      description_en:
        "Comprehensive AI course covering fundamentals and advanced technologies. We'll learn about machine learning, neural networks, natural language processing and more.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      track: "ai",
      type: "course",
      duration: "24h",
      participants: 15,
      startDate: "2025-02-01",
    },
  ];

  return mockActivities.find((a) => a.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) {
    return {
      title: "Activity Not Found - EduTech",
    };
  }

  const title =
    params.locale === "he" ? activity.title_he : activity.title_en;

  return {
    title: `${title} - EduTech`,
    description:
      params.locale === "he"
        ? activity.description_he
        : activity.description_en,
  };
}

interface ActivityPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ActivityDetails activity={activity} />
    </div>
  );
}
