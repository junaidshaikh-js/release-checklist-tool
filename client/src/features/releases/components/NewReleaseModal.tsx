import { useState } from "react"
import { Modal } from "../../../components/ui/modal"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NewReleaseModal({ isOpen, onClose, onSuccess }: Props) {
  const [name, setName] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required.")
      return
    }
    if (!date) {
      setError("Date is required.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:3001/api/v1/releases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, date, additionalInfo }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Failed to create release")
      }

      setName("")
      setDate(new Date().toISOString().split('T')[0])
      setAdditionalInfo("")
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New release">
      <div className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
          <Input 
            id="name" 
            placeholder="e.g. Version 1.0.1" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-slate-700">Date</label>
          <Input 
            id="date" 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="additionalInfo" className="text-sm font-medium text-slate-700">Additional Info</label>
          <Textarea 
            id="additionalInfo" 
            placeholder="Any extra details about this release..." 
            className="min-h-[120px]"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="pt-2 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button 
            className="bg-indigo-500 text-white" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
