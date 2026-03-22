import { ReleaseDetail } from "../../../features/releases/components/ReleaseDetail"
import { Release } from "../../../features/releases/types"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

async function getRelease(id: string): Promise<Release | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/releases/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching release:", error)
    return null
  }
}

export default async function ReleasePage({ params }: Props) {
  const { id } = await params;
  const release = await getRelease(id)

  if (!release) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Release not found</h1>
        <p className="text-slate-600 mb-8">The release you are looking for does not exist or has been deleted.</p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Back to Dashboard
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <div className="text-center pt-16 pb-4">
        <h1 className="text-[2.75rem] font-bold text-[#2d3748] tracking-tight">ReleaseCheck</h1>
        <p className="mt-3 text-[#4a5568] font-medium text-lg">Your all-in-one release checklist tool</p>
      </div>
      <ReleaseDetail release={release} />
    </main>
  )
}
