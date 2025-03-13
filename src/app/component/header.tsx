import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Moon, HelpCircle, Search } from "lucide-react"

export function Header() {
  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <div className="font-bold text-xl">RapatAI</div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 bg-muted/50" />
        </div>

        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>

        <Button variant="ghost" size="icon">
          <Moon size={20} />
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle size={20} />
        </Button>

        <div className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden">
          <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  )
}

