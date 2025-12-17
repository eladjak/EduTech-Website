"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Users as UsersIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";

// Mock data per track - will be replaced with real Supabase queries
type Activity = {
  id: string;
  slug: string;
  image: string;
  duration: string;
  participants: number;
  startDate: string;
};

const trackActivitiesMock: Record<string, Activity[]> = {
  ai: [
    {
      id: "1",
      slug: "ai-fundamentals-adults",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      duration: "24h",
      participants: 15,
      startDate: "2025-02-01",
    },
    {
      id: "2",
      slug: "machine-learning-bootcamp",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b",
      duration: "40h",
      participants: 12,
      startDate: "2025-02-15",
    },
  ],
  kids: [
    {
      id: "3",
      slug: "kids-scratch-camp",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      duration: "40h",
      participants: 20,
      startDate: "2025-02-10",
    },
  ],
  pro: [
    {
      id: "4",
      slug: "react-bootcamp-pro",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
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
  const locale = useLocale();
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
        {activities.map((activity, index) => {
          const titles: Record<string, Record<string, string>> = {
            he: {
              "ai-fundamentals-adults": "יסודות בינה מלאכותית למבוגרים",
              "machine-learning-bootcamp": "בוטקאמפ למידת מכונה",
              "kids-scratch-camp": "מחנה קיץ - תכנות בסקרץ' לילדים",
              "react-bootcamp-pro": "בוטקאמפ React למקצועיים",
            },
            en: {
              "ai-fundamentals-adults": "AI Fundamentals for Adults",
              "machine-learning-bootcamp": "Machine Learning Bootcamp",
              "kids-scratch-camp": "Summer Camp - Scratch Programming",
              "react-bootcamp-pro": "React Bootcamp for Professionals",
            },
          };
          const title = titles[locale]?.[activity.slug] || activity.slug;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${locale}/activities/${activity.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48">
                    <Image
                      src={activity.image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>{activity.participants}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(activity.startDate).toLocaleDateString(
                            locale
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
