"use client";

import { useEffect } from "react";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service worker registered"))
        .catch((err) => console.error("❌ SW registration failed:", err));
    }
  }, []);

  return <>{children}</>;
}
