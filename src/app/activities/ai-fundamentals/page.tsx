"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Activity, getActivityById } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function ActivityPage() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      const data = await getActivityById("ai-fundamentals");
      setActivity(data);
      setLoading(false);
    }
    fetchActivity();
  }, []);

  if (loading) {
    return (
      <Section className="min-h-screen">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Section>
    );
  }

  if (!activity) {
    return (
      <Section className="min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">הפעילות לא נמצאה</h1>
          <Button asChild>
            <a href="/">חזרה לדף הבית</a>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <main className="min-h-screen">
      <Section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <img
              src={activity.image_url}
              alt={activity.title}
              className="w-full h-[400px] object-cover rounded-2xl mb-8"
            />
            
            <h1 className="text-4xl font-bold mb-4 font-heebo">{activity.title}</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">משך</div>
                <div className="font-bold">{activity.duration}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">קהל יעד</div>
                <div className="font-bold">{activity.target_audience.join(", ")}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">מחיר</div>
                <div className="font-bold">₪{activity.price}</div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg mb-8">{activity.description}</p>
            </div>

            <div className="flex gap-4">
              <Button size="lg">הרשמה לפעילות</Button>
              <Button size="lg" variant="secondary">צור קשר</Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
