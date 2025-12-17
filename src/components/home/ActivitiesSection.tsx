"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Users as UsersIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Mock data - will be replaced with real Supabase data
const mockActivities = [
  {
    id: "1",
    slug: "ai-fundamentals-adults",
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
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    track: "pro",
    type: "course",
    duration: "32h",
    participants: 12,
    startDate: "2025-02-15",
  },
];

const trackColors: Record<string, string> = {
  ai: "bg-gradient-to-r from-purple-500 to-pink-500",
  kids: "bg-gradient-to-r from-blue-500 to-cyan-500",
  pro: "bg-gradient-to-r from-orange-500 to-red-500",
  edu: "bg-gradient-to-r from-green-500 to-emerald-500",
  camp: "bg-gradient-to-r from-yellow-500 to-amber-500",
};

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
        {mockActivities.map((activity, index) => {
          // Mock titles and descriptions - will be replaced with real data
          const titles: Record<string, Record<string, string>> = {
            he: {
              "ai-fundamentals-adults": "יסודות בינה מלאכותית למבוגרים",
              "kids-scratch-camp": "מחנה קיץ - תכנות בסקרץ' לילדים",
              "react-bootcamp-pro": "בוטקאמפ React למקצועיים",
            },
            en: {
              "ai-fundamentals-adults": "AI Fundamentals for Adults",
              "kids-scratch-camp": "Summer Camp - Scratch Programming for Kids",
              "react-bootcamp-pro": "React Bootcamp for Professionals",
            },
          };
          const descriptions: Record<string, Record<string, string>> = {
            he: {
              "ai-fundamentals-adults": "קורס מקיף בבינה מלאכותית המכסה את היסודות והטכנולוגיות המתקדמות",
              "kids-scratch-camp": "מחנה קיץ מרתק בו ילדים לומדים תכנות דרך יצירת משחקים",
              "react-bootcamp-pro": "בוטקאמפ מעמיק ב-React עבור מפתחים מקצועיים",
            },
            en: {
              "ai-fundamentals-adults": "Comprehensive AI course covering fundamentals and advanced technologies",
              "kids-scratch-camp": "Exciting summer camp where kids learn programming through game creation",
              "react-bootcamp-pro": "Intensive React bootcamp for professional developers",
            },
          };
          const title = titles[locale]?.[activity.slug] || activity.slug;
          const description = descriptions[locale]?.[activity.slug] || "";

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/${locale}/activities/${activity.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Track Badge */}
                    <div
                      className={`absolute top-4 ${
                        isRTL ? "right-4" : "left-4"
                      } px-3 py-1 rounded-full ${
                        trackColors[activity.track]
                      } text-white text-sm font-medium`}
                    >
                      {t(`home.tracks.${activity.track}.title`)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {description}
                    </p>

                    {/* Meta Info */}
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

      {/* View All Button */}
      <div className="flex justify-center">
        <Link href={`/${locale}/activities`}>
          <Button size="lg" variant="primary">
            {t("common.readMore")}
            {isRTL ? (
              <ArrowLeft className="w-5 h-5 ml-2" />
            ) : (
              <ArrowRight className="w-5 h-5 mr-2" />
            )}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
