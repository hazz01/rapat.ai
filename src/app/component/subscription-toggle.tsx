"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, CircleDot } from "lucide-react"

interface SubscriptionToggleProps {
  value: "free" | "premium"
  onChange: (value: "free" | "premium") => void
}

export function SubscriptionToggle({ value, onChange }: SubscriptionToggleProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant={value === "free" ? "default" : "outline"}
        className={`rounded-full px-6 ${
          value === "free" ? "bg-black text-white hover:bg-gray-800" : "bg-white text-gray-500"
        }`}
        onClick={() => onChange("free")}
      >
        <CircleDot className="mr-2 h-4 w-4" /> Free
      </Button>

      <Button
        variant={value === "premium" ? "default" : "outline"}
        className={`rounded-full px-6 ${
          value === "premium" ? "bg-white text-black border-gray-200" : "bg-white text-gray-500"
        }`}
        onClick={() => onChange("premium")}
      >
        <Sparkles className="mr-2 h-4 w-4" /> Premium
      </Button>
    </div>
  )
}

