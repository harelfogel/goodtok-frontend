import { fetchTrends } from "@/lib/api";

interface Trend {
  topic: string;
  title: string;
  summary: string;
}

export default async function TrendsFeedPage() {
  let trends: Trend[] = [];

  try {
    trends = await fetchTrends();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load trends: {errorMessage}
      </p>
    );
  }

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        📈 Trending Topics
      </h1>
      <ul className="space-y-6">
        {trends.map((trend) => (
          <li
            key={trend.topic}
            className="border rounded p-4 hover:shadow-lg transition"
          >
            <a
              href={`/trends/${trend.topic}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {trend.title}
            </a>
            <p className="text-gray-700 mt-2">{trend.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
