import { notFound } from "next/navigation";

interface PageProps {
  params: {
    topic: string;
  };
}

interface TrendData {
  title: string;
  summary: string;
  url: string;
}

export default async function TrendPage({ params }: PageProps) {
  const res = await fetch(`http://localhost:3000/trends/${params.topic}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const trend: TrendData = await res.json();

  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4">{trend.title}</h1>
      <p className="text-lg mb-6 text-center max-w-xl">{trend.summary}</p>
      <a
        href={trend.url}
        className="text-blue-600 underline text-lg hover:text-blue-800"
        target="_blank"
      >
        Read more →
      </a>
    </main>
  );
}
