"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Users as UsersIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export interface Activity {
  id: string;
  slug: string;
  title_he: string;
  title_en: string;
  description_he?: string;
  description_en?: string;
  image: string;
  track: "ai" | "kids" | "pro" | "edu" | "camp";
  type: string;
  duration: string;
  participants: number;
  startDate: string;
}

interface ActivityCardProps {
  activity: Activity;
  index?: number;
  trackLabel?: string;
  showTrackBadge?: boolean;
}

const trackColors: Record<string, string> = {
  ai: "bg-gradient-to-r from-purple-500 to-pink-500",
  kids: "bg-gradient-to-r from-blue-500 to-cyan-500",
  pro: "bg-gradient-to-r from-orange-500 to-red-500",
  edu: "bg-gradient-to-r from-green-500 to-emerald-500",
  camp: "bg-gradient-to-r from-yellow-500 to-amber-500",
};

export function ActivityCard({
  activity,
  index = 0,
  trackLabel,
  showTrackBadge = true,
}: ActivityCardProps) {
  const locale = useLocale();
  const isRTL = locale === "he";
  const isHebrew = locale === "he";

  const title = isHebrew ? activity.title_he : activity.title_en;
  const description = isHebrew
    ? activity.description_he
    : activity.description_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/${locale}/activities/${activity.slug}`}>
        <Card
          variant="default"
          padding="none"
          interactive
          className="h-full flex flex-col"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={activity.image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Track Badge */}
            {showTrackBadge && trackLabel && (
              <div
                className={`absolute top-4 ${
                  isRTL ? "right-4" : "left-4"
                } px-3 py-1 rounded-full ${
                  trackColors[activity.track]
                } text-white text-sm font-medium shadow-lg`}
              >
                {trackLabel}
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                {description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-auto">
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
                  {new Date(activity.startDate).toLocaleDateString(locale)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
