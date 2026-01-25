"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Activity } from "@/components/shared/ActivityCard";

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  const locale = useLocale();
  const t = useTranslations("activities");
  const tCommon = useTranslations("common");
  const isHebrew = locale === "he";

  const title = isHebrew ? activity.title_he : activity.title_en;
  const description = isHebrew
    ? activity.description_he
    : activity.description_en;

  return (
    <div>
      {/* Hero Section with Image */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src={activity.image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{activity.participants} {isHebrew ? "משתתפים" : "participants"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(activity.startDate).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isHebrew ? "על הפעילות" : "About This Activity"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isHebrew ? "מה תלמדו" : "What You'll Learn"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {isHebrew
                          ? `נושא לימוד מספר ${i} - יתווסף בקרוב`
                          : `Learning topic ${i} - Coming soon`}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isHebrew ? "דרישות קדם" : "Prerequisites"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {isHebrew
                    ? "אין צורך בידע מוקדם - הקורס מתאים לכולם"
                    : "No prior knowledge required - suitable for everyone"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-6">
                {/* Registration Button */}
                <Button
                  variant={`track${activity.track.charAt(0).toUpperCase()}${activity.track.slice(1)}` as any}
                  size="lg"
                  className="w-full"
                >
                  {tCommon("register")}
                </Button>

                {/* Info */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">
                        {isHebrew ? "מיקום" : "Location"}
                      </div>
                      <div className="font-medium">
                        {isHebrew ? "אונליין / פרונטלי" : "Online / On-site"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Award className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">
                        {isHebrew ? "תעודה" : "Certificate"}
                      </div>
                      <div className="font-medium">
                        {isHebrew ? "כן" : "Yes"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-gray-200">
                  <Button variant="outline" size="lg" className="w-full">
                    {tCommon("contactUs")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
