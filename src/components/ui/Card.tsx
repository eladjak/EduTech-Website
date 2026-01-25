"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-md hover:shadow-xl",
        elevated: "bg-white shadow-lg hover:shadow-2xl",
        outlined: "bg-transparent border-2 border-gray-300 hover:border-gray-400",
        ghost: "bg-transparent hover:bg-gray-50",
        gradient:
          "bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 shadow-md hover:shadow-xl",

        // Track-specific variants
        trackAi:
          "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-[0_20px_40px_-12px_rgba(168,85,247,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.4)]",
        trackKids:
          "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-[0_20px_40px_-12px_rgba(56,189,248,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.4)]",
        trackPro:
          "bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 shadow-[0_20px_40px_-12px_rgba(251,146,60,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(251,146,60,0.4)]",
        trackEdu:
          "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-[0_20px_40px_-12px_rgba(52,211,153,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(52,211,153,0.4)]",
        trackCamp:
          "bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 shadow-[0_20px_40px_-12px_rgba(251,191,36,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(251,191,36,0.4)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  animate?: boolean;
  animationDelay?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      interactive,
      animate = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref
  ) => {
    const cardContent = (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive, className }))}
        {...props}
      >
        {children}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: animationDelay }}
        >
          {cardContent}
        </motion.div>
      );
    }

    return cardContent;
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold leading-tight tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 border-t border-gray-200", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
