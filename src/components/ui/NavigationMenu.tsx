"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const subBrands = [
  {
    id: "ai",
    title: "EduTech AI",
    description: "לימודי בינה מלאכותית וטכנולוגיות מתקדמות",
    href: "/tracks/ai",
  },
  {
    id: "kids",
    title: "EduTech Kids",
    description: "קורסי טכנולוגיה ומחנות לילדים ונוער",
    href: "/tracks/kids",
  },
  {
    id: "pro",
    title: "EduTech Pro",
    description: "הכשרה מקצועית למבוגרים ואנשי תעשייה",
    href: "/tracks/pro",
  },
  {
    id: "edu",
    title: "EduTech Edu",
    description: "הכשרה ופיתוח מקצועי לאנשי חינוך",
    href: "/tracks/edu",
  },
  {
    id: "camp",
    title: "EduTech Camp",
    description: "מחנות קיץ, מחנות טכנולוגיה ופעילויות מרוכזות",
    href: "/tracks/camp",
  },
];

export function NavigationMenu() {
  return (
    <NavigationMenuPrimitive.Root className="relative z-50">
      <NavigationMenuPrimitive.List className="flex justify-center gap-8 p-4">
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger className="group flex items-center gap-1 text-lg font-medium">
            מסלולים
            <ChevronDown className="h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
          </NavigationMenuPrimitive.Trigger>
          <NavigationMenuPrimitive.Content className="absolute top-full right-0 w-[500px] p-4 bg-white rounded-lg shadow-lg">
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {subBrands.map((brand) => (
                <a
                  key={brand.id}
                  href={brand.href}
                  className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-bold mb-1">{brand.title}</div>
                  <div className="text-sm text-gray-600">{brand.description}</div>
                </a>
              ))}
            </motion.div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link
            href="/activities"
            className="text-lg font-medium"
          >
            פעילויות
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link
            href="/blog"
            className="text-lg font-medium"
          >
            בלוג
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link
            href="/about"
            className="text-lg font-medium"
          >
            אודות
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link
            href="/contact"
            className="text-lg font-medium"
          >
            צור קשר
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}
