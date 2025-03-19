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
  {
    role: "user" as const,
    content: "What are the key principles of user-centered design?",
    initials: "JD",
  },
  {
    role: "assistant" as const,
    content:
      "User-centered design (UCD) is a design philosophy that places the user at the center of the design process. Key principles include: 1) Understanding user needs and goals, 2) Involving users throughout the design process, 3) Iterative design and testing, 4) Designing for accessibility and inclusivity, and 5) Balancing user needs with business goals.",
  },
  {
    role: "user" as const,
    content: "Can you explain the double diamond design process?",
    initials: "MO",
  },
  {
    role: "assistant" as const,
    content:
      "The double diamond design process is a framework developed by the UK Design Council. It consists of four phases: Discover, Define, Develop, and Deliver. The first diamond focuses on exploring the problem space (Discover and Define), while the second diamond focuses on exploring the solution space (Develop and Deliver). This approach encourages divergent and convergent thinking to arrive at innovative solutions.",
  },
  {
    role: "user" as const,
    content: "What are the benefits of using design systems?",
    initials: "JD",
  },
  {
    role: "assistant" as const,
    content:
      "Design systems provide a centralized source of truth for design and development teams. Benefits include: 1) Consistency across products, 2) Faster development cycles, 3) Improved collaboration between designers and developers, 4) Scalability for large projects, and 5) Enhanced user experience through cohesive design.",
  },
  {
    role: "user" as const,
    content: "How do you approach accessibility in design?",
    initials: "MO",
  },
  {
    role: "assistant" as const,
    content:
      "Approaching accessibility in design involves: 1) Following accessibility standards like WCAG, 2) Designing with inclusivity in mind, 3) Using semantic HTML and ARIA roles, 4) Ensuring sufficient color contrast, 5) Providing keyboard and screen reader support, and 6) Testing with assistive technologies to identify and fix issues.",
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
    <div className=" flex flex-col relative" style={{ height: "calc(100vh - 120px)" }}>
      {/* Model Info */}
      <div className="p-4 border-b max-w-full items-center text-center justify-between flex ">
        <span className="text-sm text-gray-600">Model: Legacy (GPT-3.5)</span>
      </div>
  
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role} content={message.content} initials={message.initials} />
        ))}
      </div>
  
      {/* Recording Status (Fixed at Bottom) */}
      <div className="absolute bottom-0 w-full ">
        <RecordingStatus onPause={handlePauseRecording} />
      </div>
    </div>
  );
  
  
  
}

