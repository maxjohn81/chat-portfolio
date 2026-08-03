
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastPosition,
} from "./toast";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export interface ToasterProps {
  position?: ToastPosition;
}

export function Toaster({ position = "top-right" }: ToasterProps) {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      <ToastViewport position={position}>
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, title, description, action, type, variant, duration, icon, avatar, ...props }) => {
            const toastVariant = variant || (
              type === "success" ? "success" :
                type === "warning" ? "warning" :
                  type === "info" ? "info" :
                    type === "destructive" ? "destructive" :
                      type === "loading" ? "loading" :
                        "default"
            );

            return (
              <Toast
                key={id}
                {...props}
                variant={toastVariant}
                duration={duration}
                icon={icon}
                avatar={avatar}
                onOpenChange={(open) => {
                  if (!open) dismiss(id);
                }}
              >
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && <ToastDescription>{description}</ToastDescription>}
                </div>
                {action}
              </Toast>
            );
          })}
        </AnimatePresence>
      </ToastViewport>
    </ToastProvider>
  );
}