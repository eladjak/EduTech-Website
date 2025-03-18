"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function Section({
  children,
  className,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-24 px-4", className)} {...props}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className={cn("text-4xl font-bold mb-4 font-heebo", titleClassName)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn("text-xl text-gray-600 font-assistant", subtitleClassName)}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
