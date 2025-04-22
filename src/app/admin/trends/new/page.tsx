"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTrend } from "@/lib/api";

export default function NewTrendPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    topic: "",
    title: "",
    summary: "",
    url: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setIsAdmin(token === "letmein");
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createTrend(form);
      router.push("/trends");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🔐 Enter Admin Password
        </h2>
        <input
          type="password"
          className="border border-gray-300 px-4 py-2 rounded-lg w-64 text-center shadow"
          placeholder="Admin Password"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value === "letmein") {
              localStorage.setItem("admin_token", "letmein");
              setIsAdmin(true);
            }
          }}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-slate-800">
          🧠 Create New AI Trend
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["topic", "title", "url"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="mb-2 text-sm font-medium text-gray-700"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label
              htmlFor="summary"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg min-h-[120px]"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "🚀 Create Trend"}
          </button>
        </form>
      </div>
    </main>
  );
}
