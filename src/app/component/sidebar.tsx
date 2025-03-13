import { Button } from "@/components/ui/button"
import { Trash2, Sun, User, HelpCircle, LogOut } from "lucide-react"
import { MessageSquare, Plus } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-60 border-r bg-background flex flex-col h-full">
      <div className="p-4">
        <Button variant="default" className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-2">
          <Plus size={16} /> Rapat Baru
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2">
          {/* Meeting list */}
          <div className="flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-accent cursor-pointer">
            <MessageSquare size={18} className="mt-0.5" />
            <span className="text-sm">Rapat baru</span>
          </div>

          <div className="flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-accent cursor-pointer">
            <MessageSquare size={18} className="mt-0.5" />
            <span className="text-sm">Meeting Project Web Kuri...</span>
          </div>

          <div className="flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-accent cursor-pointer">
            <MessageSquare size={18} className="mt-0.5" />
            <span className="text-sm">Pembahasan MokletDev...</span>
          </div>
        </div>
      </div>

      <div className="border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Trash2 size={16} /> Clear conversations
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Sun size={16} /> Light mode
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <User size={16} /> My account
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <HelpCircle size={16} /> Updates & FAQ
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut size={16} /> Log out
        </Button>
      </div>
    </div>
  )
}

