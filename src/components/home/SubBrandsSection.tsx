"use client";

import { motion } from "framer-motion";
import { Cpu, Users, Code, GraduationCap, Tent } from "lucide-react";
import { Section } from "@/components/ui/Section";

const subBrands = [
  {
    id: "ai",
    title: "EduTech AI",
    description: "לימודי בינה מלאכותית וטכנולוגיות מתקדמות",
    icon: Cpu,
    color: "bg-[#7209b7]",
    hoverColor: "hover:bg-[#7209b7]/90",
  },
  {
    id: "kids",
    title: "EduTech Kids",
    description: "קורסי טכנולוגיה ומחנות לילדים ונוער",
    icon: Users,
    color: "bg-[#4cc9f0]",
    hoverColor: "hover:bg-[#4cc9f0]/90",
  },
  {
    id: "pro",
    title: "EduTech Pro",
    description: "הכשרה מקצועית למבוגרים ואנשי תעשייה",
    icon: Code,
    color: "bg-[#4361ee]",
    hoverColor: "hover:bg-[#4361ee]/90",
  },
  {
    id: "edu",
    title: "EduTech Edu",
    description: "הכשרה ופיתוח מקצועי לאנשי חינוך",
    icon: GraduationCap,
    color: "bg-[#06d6a0]",
    hoverColor: "hover:bg-[#06d6a0]/90",
  },
  {
    id: "camp",
    title: "EduTech Camp",
    description: "מחנות קיץ, מחנות טכנולוגיה ופעילויות מרוכזות",
    icon: Tent,
    color: "bg-[#fb8500]",
    hoverColor: "hover:bg-[#fb8500]/90",
  },
];

export function SubBrandsSection() {
  return (
    <Section
      className="bg-gray-50"
      title="המסלולים שלנו"
      subtitle="חמישה מסלולים מותאמים לצרכים שונים בעולם הטכנולוגיה"
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
            <div 
              className={`p-8 rounded-2xl ${brand.color} text-white transition-all duration-300 transform hover:scale-105 ${brand.hoverColor} cursor-pointer`}
            >
              <brand.icon className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-3 font-heebo">{brand.title}</h3>
              <p className="text-lg font-assistant">{brand.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
