"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Filter } from "lucide-react";

export function ActivitiesHero() {
  const t = useTranslations("activities");

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS0yMCAwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {/* Subtitle will be added later */}
          </p>

          {/* Search and Filter - Coming soon */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white/70">
              <Search className="w-5 h-5" />
              <span className="text-sm">Search coming soon...</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white/70">
              <Filter className="w-5 h-5" />
              <span className="text-sm">Filters coming soon...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
