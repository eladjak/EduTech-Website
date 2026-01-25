"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { useToast, type Toast as ToastType } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: "bg-green-50 border-green-500 text-green-900",
  error: "bg-red-50 border-red-500 text-red-900",
  warning: "bg-yellow-50 border-yellow-500 text-yellow-900",
  info: "bg-blue-50 border-blue-500 text-blue-900",
};

const iconStyles = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border-l-4 shadow-lg",
        toastStyles[toast.type]
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconStyles[toast.type])} />
          <div className="flex-1 space-y-1">
            {toast.title && (
              <div className="text-sm font-semibold">{toast.title}</div>
            )}
            <div className="text-sm opacity-90">{toast.description}</div>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-4 sm:right-4 sm:flex-col md:max-w-[420px]"
      style={{ direction: "ltr" }} // Always LTR for toasts
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="mb-4 last:mb-0">
            <ToastItem toast={toast} onDismiss={dismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
