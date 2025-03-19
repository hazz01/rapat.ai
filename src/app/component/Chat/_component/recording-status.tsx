"use client"

import { Button } from "@/components/ui/button"

interface RecordingStatusProps {
  onPause: () => void
}

export function RecordingStatus({ onPause }: RecordingStatusProps) {
  return (
    <div className="flex items-center justify-between py-4 px-12 border-t bg-white">
      <span className="text-gray-600">Recording in progress....</span>
      <Button variant="secondary" onClick={onPause} className="bg-gray-900 text-white hover:bg-gray-800">
        Pause Recording
      </Button>
    </div>
  )
}

