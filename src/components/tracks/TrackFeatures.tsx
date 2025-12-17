"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  Target,
  Users,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Section } from "@/components/ui/Section";

const trackFeatures = {
  ai: [
    { icon: Target, key: "practical" },
    { icon: TrendingUp, key: "cutting-edge" },
    { icon: Award, key: "certified" },
    { icon: Users, key: "expert-instructors" },
  ],
  kids: [
    { icon: Users, key: "age-appropriate" },
    { icon: CheckCircle2, key: "fun-learning" },
    { icon: Award, key: "achievement" },
    { icon: Clock, key: "flexible" },
  ],
  pro: [
    { icon: TrendingUp, key: "industry-relevant" },
    { icon: Award, key: "certification" },
    { icon: Users, key: "networking" },
    { icon: Target, key: "career-boost" },
  ],
  edu: [
    { icon: Users, key: "teacher-focused" },
    { icon: CheckCircle2, key: "practical-tools" },
    { icon: TrendingUp, key: "modern-methods" },
    { icon: Award, key: "recognition" },
  ],
  camp: [
    { icon: Clock, key: "intensive" },
    { icon: Users, key: "group-learning" },
    { icon: CheckCircle2, key: "hands-on" },
    { icon: Award, key: "completion" },
  ],
};

interface TrackFeaturesProps {
  trackId: "ai" | "kids" | "pro" | "edu" | "camp";
}

export function TrackFeatures({ trackId }: TrackFeaturesProps) {
  const t = useTranslations("tracks.features");
  const features = trackFeatures[trackId];

  return (
    <Section
      title={t("title")}
      subtitle={t("subtitle")}
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">
                {t(`${trackId}.${feature.key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`${trackId}.${feature.key}.description`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
