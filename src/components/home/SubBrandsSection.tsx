"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Cpu, Users, Code, GraduationCap, Tent } from "lucide-react";
import { Section } from "@/components/ui/Section";

const subBrands = [
  {
    id: "ai",
    icon: Cpu,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    hoverColor: "hover:from-purple-600 hover:to-pink-600",
  },
  {
    id: "kids",
    icon: Users,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-600 hover:to-cyan-600",
  },
  {
    id: "pro",
    icon: Code,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    hoverColor: "hover:from-orange-600 hover:to-red-600",
  },
  {
    id: "edu",
    icon: GraduationCap,
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
    hoverColor: "hover:from-green-600 hover:to-emerald-600",
  },
  {
    id: "camp",
    icon: Tent,
    color: "bg-gradient-to-br from-yellow-500 to-amber-500",
    hoverColor: "hover:from-yellow-600 hover:to-amber-600",
  },
];

export function SubBrandsSection() {
  const t = useTranslations("home.tracks");
  const locale = useLocale();

  return (
    <Section
      className="bg-gray-50"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subBrands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/${locale}/tracks/${brand.id}`}>
              <div
                className={`p-8 rounded-2xl ${brand.color} ${brand.hoverColor} text-white transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg`}
              >
                <brand.icon className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold mb-3">
                  {t(`${brand.id}.title`)}
                </h3>
                <p className="text-lg">
                  {t(`${brand.id}.description`)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
