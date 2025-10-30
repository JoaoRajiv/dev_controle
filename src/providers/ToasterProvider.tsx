// app/components/ToasterProvider.tsx
"use client";

import { Toaster } from "sonner";

export const ToasterProvider = () => {
  return <Toaster position="top-right" richColors closeButton />;
};
