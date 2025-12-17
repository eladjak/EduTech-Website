"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Users, BookOpen, GraduationCap, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";

const statsConfig = [
  { key: "students", value: "5,000+", icon: Users },
  { key: "courses", value: "150+", icon: BookOpen },
  { key: "instructors", value: "50+", icon: GraduationCap },
  { key: "satisfaction", value: "98%", icon: Star },
];

export function StatsSection() {
  const t = useTranslations("home.stats");

  return (
    <Section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {stat.value}
            </div>
            <div className="text-lg md:text-xl text-blue-100">
              {t(stat.key)}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
