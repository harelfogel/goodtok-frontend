"use client";

import { useState } from "react";
import { subscribeToPush } from "@/lib/push/subscribeToPush";

interface EnablePushButtonProps {
  userId: string;
}

export const EnablePushButton = ({ userId }: EnablePushButtonProps) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async () => {
    try {
      setStatus("loading");
      const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
      await subscribeToPush(userId, key);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <button
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      onClick={handleSubscribe}
      disabled={status === "loading"}
    >
      {status === "idle" && "🔔 Enable Notifications"}
      {status === "loading" && "Enabling..."}
      {status === "success" && "✅ Enabled!"}
      {status === "error" && "❌ Failed. Try again"}
    </button>
  );
};
