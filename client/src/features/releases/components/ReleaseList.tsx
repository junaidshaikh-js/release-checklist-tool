"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { ReleaseTable } from "./ReleaseTable"
import { NewReleaseModal } from "./NewReleaseModal"
import { Button } from "../../../components/ui/button"
import { Release } from "../types"

interface Props {
  data: Release[]
}

export function ReleaseList({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const router = useRouter()

  const handleSuccess = () => {
    setIsModalOpen(false)
    router.refresh()
  }

  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-white w-full">
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-indigo-300 border-b-2 border-indigo-100 pb-1">All releases</h2>
          <Button 
            className="bg-[#6b58ff] hover:bg-[#5b49e6] text-white gap-2 w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            New release
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-0 sm:p-6 bg-transparent pt-0 sm:pt-2">
           <ReleaseTable data={data} />
        </div>
      </div>

      <NewReleaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess}
      />
    </>
  )
}
