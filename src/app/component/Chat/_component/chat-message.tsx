import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  avatar?: string
  initials?: string
}

export function ChatMessage({ role, content, avatar, initials }: ChatMessageProps) {
  return (
    <div className="flex items-start space-x-3 p-4">
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-white",
          role === "user" ? "bg-purple-500" : "bg-emerald-500",
        )}
      >
        {avatar ? (
          <img src={avatar || "/placeholder.svg"} alt="" className="w-full h-full rounded" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-900">{content}</p>
        </div>
      </div>

      {/* Feedback Buttons */}
      <div className="flex-shrink-0 flex space-x-2">
        <button className="p-1 text-gray-500 hover:text-gray-700">
          <ThumbsDown className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-700">
          <ThumbsUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

