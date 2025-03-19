"use client"

import { useState } from "react"
import { SubscriptionToggle } from "./subscription-toggle"
import { WelcomeSection } from "./welcome-section"
import ChatPage from "./Chat/page"

export function MainContent() {
  const [subscriptionType, setSubscriptionType] = useState<"free" | "premium">("free")
  const [isRecording, setIsRecording] = useState(false)

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  return (
    <div className="w-full max-w-fit flex flex-col items-center gap-8">
      {isRecording ? (
        <ChatPage />
      ) : (
        <>
          <SubscriptionToggle value={subscriptionType} onChange={setSubscriptionType} />
          <WelcomeSection subscriptionType={subscriptionType} onStartRecording={handleStartRecording} />
        </>
      )}
    </div>
  )
}