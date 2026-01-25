"use client";

import { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  description: string;
  duration?: number;
}

type ToastState = {
  toasts: Toast[];
};

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function dispatch(action: { type: string; toast?: Toast; toastId?: string }) {
  if (action.type === "ADD_TOAST") {
    memoryState.toasts = [...memoryState.toasts, action.toast!];
  } else if (action.type === "REMOVE_TOAST") {
    memoryState.toasts = memoryState.toasts.filter((t) => t.id !== action.toastId);
  } else if (action.type === "DISMISS_ALL") {
    memoryState.toasts = [];
  }

  listeners.forEach((listener) => listener(memoryState));
}

let toastCount = 0;

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

export function toast(props: Omit<Toast, "id">) {
  const id = genId();

  const newToast: Toast = {
    ...props,
    id,
    duration: props.duration ?? 5000,
  };

  dispatch({ type: "ADD_TOAST", toast: newToast });

  return {
    id,
    dismiss: () => dispatch({ type: "REMOVE_TOAST", toastId: id }),
  };
}

toast.success = (description: string, title?: string) => {
  return toast({ type: "success", description, title });
};

toast.error = (description: string, title?: string) => {
  return toast({ type: "error", description, title });
};

toast.warning = (description: string, title?: string) => {
  return toast({ type: "warning", description, title });
};

toast.info = (description: string, title?: string) => {
  return toast({ type: "info", description, title });
};

export function useToast() {
  const [state, setState] = useState<ToastState>(memoryState);

  // Subscribe to toast state changes
  useCallback(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
    dismissAll: () => dispatch({ type: "DISMISS_ALL" }),
  };
}
