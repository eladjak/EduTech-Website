"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cpu, Users, Code, GraduationCap, Tent } from "lucide-react";

const trackIcons = {
  ai: Cpu,
  kids: Users,
  pro: Code,
  edu: GraduationCap,
  camp: Tent,
};

const trackGradients = {
  ai: "from-purple-600 via-pink-600 to-purple-800",
  kids: "from-blue-600 via-cyan-600 to-blue-800",
  pro: "from-orange-600 via-red-600 to-orange-800",
  edu: "from-green-600 via-emerald-600 to-green-800",
  camp: "from-yellow-600 via-amber-600 to-yellow-800",
};

interface TrackHeroProps {
  trackId: "ai" | "kids" | "pro" | "edu" | "camp";
}

export function TrackHero({ trackId }: TrackHeroProps) {
  const t = useTranslations("home.tracks");
  const Icon = trackIcons[trackId];
  const gradient = trackGradients[trackId];

  return (
    <section
      className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} text-white`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS0yMCAwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-12 h-12" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t(`${trackId}.title`)}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {t(`${trackId}.description`)}
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#activities"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              {t("viewActivities")}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              {t("contactUs")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
