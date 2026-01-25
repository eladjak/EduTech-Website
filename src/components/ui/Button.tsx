"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 shadow-lg hover:shadow-xl focus-visible:ring-blue-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md focus-visible:ring-gray-400",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg focus-visible:ring-red-500",
        outline:
          "border-2 border-gray-300 bg-transparent hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-400",
        ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",

        // Track-specific variants with brand gradients
        trackAi:
          "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 text-white hover:from-purple-600 hover:via-pink-600 hover:to-purple-800 shadow-[0_20px_40px_-12px_rgba(168,85,247,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.5)] focus-visible:ring-purple-500",
        trackKids:
          "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-700 text-white hover:from-blue-600 hover:via-cyan-600 hover:to-blue-800 shadow-[0_20px_40px_-12px_rgba(56,189,248,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.5)] focus-visible:ring-blue-500",
        trackPro:
          "bg-gradient-to-r from-orange-500 via-red-500 to-orange-700 text-white hover:from-orange-600 hover:via-red-600 hover:to-orange-800 shadow-[0_20px_40px_-12px_rgba(251,146,60,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(251,146,60,0.5)] focus-visible:ring-orange-500",
        trackEdu:
          "bg-gradient-to-r from-green-500 via-emerald-500 to-green-700 text-white hover:from-green-600 hover:via-emerald-600 hover:to-green-800 shadow-[0_20px_40px_-12px_rgba(52,211,153,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(52,211,153,0.5)] focus-visible:ring-green-500",
        trackCamp:
          "bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-700 text-white hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-800 shadow-[0_20px_40px_-12px_rgba(251,191,36,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(251,191,36,0.5)] focus-visible:ring-yellow-500",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
