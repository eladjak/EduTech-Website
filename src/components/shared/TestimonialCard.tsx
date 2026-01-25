"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export interface Testimonial {
  id: string;
  name_he: string;
  name_en: string;
  role_he: string;
  role_en: string;
  content_he: string;
  content_en: string;
  rating: number;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  const locale = useLocale();
  const isHebrew = locale === "he";

  const name = isHebrew ? testimonial.name_he : testimonial.name_en;
  const role = isHebrew ? testimonial.role_he : testimonial.role_en;
  const content = isHebrew ? testimonial.content_he : testimonial.content_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        variant="default"
        padding="default"
        className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
      >
        <CardContent className="flex flex-col h-full p-6">
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
          <div className="flex items-center gap-4 mt-auto">
            <div
              className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${testimonial.image})` }}
            />
            <div>
              <div className="font-bold text-gray-900">{name}</div>
              <div className="text-sm text-gray-500">{role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
