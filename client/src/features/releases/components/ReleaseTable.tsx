import Link from "next/link"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import { Release } from "../types"

export function ReleaseTable({ data }: { data: Release[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg bg-white border border-slate-200">
        <p className="text-slate-500 text-lg">No releases found.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="border-b border-slate-200 text-slate-900">
          <tr>
            <th className="px-6 py-4 font-semibold">Release</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((release) => (
            <tr key={release.id} className="group hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{release.name}</td>
              <td className="px-6 py-4 text-slate-700">
                {release.date ? format(new Date(release.date), "MMMM d, yyyy") : "N/A"}
              </td>
              <td className="px-6 py-4">
                <span className="text-slate-700 capitalize">{release.status}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <Link 
                  href={`/release/${release.id}`}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <span className="font-medium">View</span>
                  <Eye className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
