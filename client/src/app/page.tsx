import { ReleaseList } from "../features/releases/components/ReleaseList"
import { Release } from "../features/releases/types"

async function getReleases(): Promise<Release[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/releases`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      console.error("Failed to fetch releases:", res.status);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching releases:", error);
    return [];
  }
}

export default async function Home() {
  const releases = await getReleases();

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-[2.75rem] font-bold text-[#2d3748] tracking-tight">ReleaseCheck</h1>
          <p className="mt-3 text-[#4a5568] font-medium text-lg">Your all-in-one release checklist tool</p>
        </div>
        
        <ReleaseList data={releases} />
      </div>
    </main>
  )
}
