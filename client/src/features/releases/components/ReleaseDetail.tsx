"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Check } from "lucide-react"
import { format } from "date-fns"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"
import { Checkbox } from "../../../components/ui/checkbox"
import { Release, ReleaseChecklist } from "../types"

interface Props {
  release: Release
}

export function ReleaseDetail({ release }: Props) {
  const [checklist, setChecklist] = React.useState<Partial<ReleaseChecklist>>(
    release.checklist || {
      prMerged: false,
      changelogUpdated: false,
      testsPassing: false,
      githubReleaseCreated: false,
      deployedToDemo: false,
      testedInDemo: false,
      deployedToProd: false,
    }
  )

  const [name, setName] = React.useState(release.name)
  const [date, setDate] = React.useState(release.date ? format(new Date(release.date), "yyyy-MM-dd") : "")
  const [additionalInfo, setAdditionalInfo] = React.useState(release.additionalInfo || "")
  const [isSaving, setIsSaving] = React.useState(false)

  const handleCheckboxChange = (field: keyof ReleaseChecklist) => {
    setChecklist((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save or actually call API if needed later. 
    // User only asked for UI for now but added a 'Save' button in screenshot.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const checklistItems = [
    { field: "prMerged", label: "All relevant GitHub pull requests have been merged" },
    { field: "changelogUpdated", label: "CHANGELOG.md files have been updated" },
    { field: "testsPassing", label: "All tests are passing" },
    { field: "githubReleaseCreated", label: "Releases in Github created" },
    { field: "deployedToDemo", label: "Deployed in demo" },
    { field: "testedInDemo", label: "Tested thoroughly in demo" },
    { field: "deployedToProd", label: "Deployed in production" },
  ] as const

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Header with Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="text-indigo-500 hover:text-indigo-600">
            All releases
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-400">{name}</span>
        </nav>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Release Details Row */}
        <div className="p-8 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Release</label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="border-slate-200 text-slate-900 font-medium focus:bg-white" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
            <Input 
              type="date"
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="border-slate-200 text-slate-900 font-medium focus:bg-white" 
            />
          </div>
        </div>

        {/* Checklist Section */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {checklistItems.map((item) => (
              <Checkbox
                key={item.field}
                label={item.label}
                checked={checklist[item.field as keyof ReleaseChecklist] as boolean}
                onChange={() => handleCheckboxChange(item.field as keyof ReleaseChecklist)}
              />
            ))}
          </div>

          <div className="pt-8 space-y-3">
            <label className="text-sm font-bold text-slate-700">Additional remarks / tasks</label>
            <Textarea
              placeholder="Please enter any other important notes for the release"
              className="min-h-[160px] bg-white border-slate-200 resize-none text-slate-600 placeholder:text-slate-400"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#6b58ff] hover:bg-[#5b49e6] text-white gap-2 px-6 h-11"
            >
              Save
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
