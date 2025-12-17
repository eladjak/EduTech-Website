"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <Section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#1abc9c] to-[#2c3e50] text-white p-0">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')] bg-cover bg-center opacity-20" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {t("title")}
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/tracks`}>
            <Button size="lg" variant="primary">
              {t("cta")}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </Link>
        </div>
      </motion.div>
    </Section>
  );
}
