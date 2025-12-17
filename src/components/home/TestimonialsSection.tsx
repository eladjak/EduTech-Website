"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Star, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";

// Mock data - will be replaced with real Supabase data
const mockTestimonials = [
  {
    id: "1",
    name_he: "רונית כהן",
    name_en: "Ronit Cohen",
    role_he: "מהנדסת תוכנה",
    role_en: "Software Engineer",
    content_he:
      "הקורס של EduTech AI שינה לי את הקריירה! למדתי בינה מלאכותית בצורה מעשית ומקצועית. המרצים מעולים והתוכן רלוונטי מאוד לתעשייה.",
    content_en:
      "EduTech AI's course changed my career! I learned artificial intelligence in a practical and professional way. The instructors are excellent and the content is very relevant to the industry.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: "2",
    name_he: "דני לוי",
    name_en: "Danny Levi",
    role_he: "הורה",
    role_en: "Parent",
    content_he:
      "הבן שלי בן ה-10 נהנה מאוד במחנה הקיץ של EduTech Kids. הוא למד תכנות בסקרץ' ואף בנה משחק משלו. חוויה מדהימה!",
    content_en:
      "My 10-year-old son really enjoyed EduTech Kids' summer camp. He learned Scratch programming and even built his own game. Amazing experience!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: "3",
    name_he: "מיכל אברהם",
    name_en: "Michal Avraham",
    role_he: "מורה",
    role_en: "Teacher",
    content_he:
      "ההכשרה של EduTech Edu עזרה לי מאוד להטמיע טכנולוגיה בכיתה שלי. קיבלתי כלים מעשיים ורעיונות לשיעורים מעניינים.",
    content_en:
      "EduTech Edu's training helped me a lot to integrate technology in my classroom. I received practical tools and ideas for interesting lessons.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale();
  const isHebrew = locale === "he";

  return (
    <Section
      className="bg-gray-50"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockTestimonials.map((testimonial, index) => {
          const name = isHebrew ? testimonial.name_he : testimonial.name_en;
          const role = isHebrew ? testimonial.role_he : testimonial.role_en;
          const content = isHebrew
            ? testimonial.content_he
            : testimonial.content_en;

          return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-blue-500 opacity-50" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 flex-1 leading-relaxed">
                  {content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                  <div>
                    <div className="font-bold text-gray-900">{name}</div>
                    <div className="text-sm text-gray-500">{role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
