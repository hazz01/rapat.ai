"use client"

import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"

interface WelcomeSectionProps {
  subscriptionType: "free" | "premium"
  onStartRecording: () => void
}

export function WelcomeSection({ subscriptionType, onStartRecording }: WelcomeSectionProps) {
  const handleStartRecording = () => {
    console.log("Start recording with", subscriptionType, "plan")
    onStartRecording()
  }

  return (
    <div className="w-5xl border rounded-lg p-8 flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold text-primary mb-4">Selamat Datang di RapatAI!</h1>

      <p className="text-muted-foreground mb-6 max-w-lg">
        Anda ingin rapat tanpa perlu membuat notulen, dengan RapatAI membantu anda mencatat dan merangkum meeting anda
        secara otomatis.
      </p>

      <a href="#" className="text-blue-500 hover:underline mb-8">
        Cari Tahu Cara Menggunakannya!
      </a>

      <Button onClick={handleStartRecording} className="bg-black text-white hover:bg-gray-800 gap-2">
        <Mic className="h-4 w-4" /> Start Recording
      </Button>
    </div>
  )
}