"use client"

import { useState } from "react"
import { ChatMessage } from "./_component/chat-message"
import { RecordingStatus } from "./_component/recording-status"


// Dummy chat data
const initialMessages = [
  {
    role: "user" as const,
    content: "Write me an essay on inspiration led product design",
    initials: "MO",
  },
  {
    role: "assistant" as const,
    content:
      "Product design has come a long way from the early days of trial and error to the present day where inspiration, creativity and technology have combined to produce designs that are not only aesthetically appealing but also functional. In the world of product design, inspiration can come from a variety of sources including nature, art, culture and technology. This essay will examine how inspiration has led to the creation of some of the most innovative and unique products in the market today.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [isRecording, setIsRecording] = useState(true)

  const handlePauseRecording = () => {
    setIsRecording(false)
    // Add your recording pause logic here
  }

  return (
    <div className="flex flex-col h-screen mt-28">
      {/* Model Info */}
    <div className="p-4 border-b bg-white max-w-full">
      <span className="text-sm text-gray-600">Model: Legacy (GPT-3.5)</span>
    </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-white">
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role} content={message.content} initials={message.initials} />
        ))}
      </div>

      {/* Recording Status */}
      <RecordingStatus onPause={handlePauseRecording} />
    </div>
  )
}

