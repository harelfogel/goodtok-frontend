import { EnablePushButton } from "@/components/EnablePushButton";

// Replace with the real user ID (hardcoded for now, dynamic later)
const userId = "3e6aca25-92ee-42a3-bee5-eb3ddd3e8631";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 p-10">
      <h1 className="text-2xl font-bold">Welcome to GoodTok</h1>
      <EnablePushButton userId={userId} />
    </main>
  );
}
