"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function HeroSection() {
  return (
    <Section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#1abc9c] to-[#2c3e50] text-white p-0">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')] bg-cover bg-center opacity-20" />
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heebo">
          פיתוח דור העתיד בטכנולוגיה
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-assistant">
          קורסים, סדנאות ומחנות המותאמים לילדים, נוער, מבוגרים ואנשי חינוך
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary">
            גלה את המסלולים שלנו
          </Button>
          <Button size="lg" variant="secondary">
            צור קשר
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
