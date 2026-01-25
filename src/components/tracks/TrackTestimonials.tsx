"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/shared/TestimonialCard";

const trackTestimonialsMock: Record<string, Testimonial[]> = {
  ai: [
    {
      id: "1",
      name_he: "רונית כהן",
      name_en: "Ronit Cohen",
      role_he: "מהנדסת תוכנה",
      role_en: "Software Engineer",
      content_he:
        "הקורס של EduTech AI שינה לי את הקריירה! למדתי בינה מלאכותית בצורה מעשית ומקצועית.",
      content_en:
        "EduTech AI's course changed my career! I learned AI in a practical and professional way.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
  ],
  kids: [
    {
      id: "2",
      name_he: "דני לוי",
      name_en: "Danny Levi",
      role_he: "הורה",
      role_en: "Parent",
      content_he:
        "הבן שלי בן ה-10 נהנה מאוד במחנה הקיץ של EduTech Kids. הוא למד תכנות בסקרץ' ואף בנה משחק משלו.",
      content_en:
        "My 10-year-old son really enjoyed EduTech Kids' summer camp. He learned Scratch and built his own game.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  ],
  pro: [],
  edu: [
    {
      id: "3",
      name_he: "מיכל אברהם",
      name_en: "Michal Avraham",
      role_he: "מורה",
      role_en: "Teacher",
      content_he:
        "ההכשרה של EduTech Edu עזרה לי מאוד להטמיע טכנולוגיה בכיתה שלי.",
      content_en:
        "EduTech Edu's training helped me integrate technology in my classroom.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ],
  camp: [],
};

interface TrackTestimonialsProps {
  trackId: "ai" | "kids" | "pro" | "edu" | "camp";
}

export function TrackTestimonials({ trackId }: TrackTestimonialsProps) {
  const t = useTranslations("home.testimonials");
  const testimonials = trackTestimonialsMock[trackId] || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section
      className="bg-gray-50"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
