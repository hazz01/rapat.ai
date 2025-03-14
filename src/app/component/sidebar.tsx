"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Sun, User, HelpCircle, LogOut, Edit, X, Check } from "lucide-react"
import { MessageSquare, Plus, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"

type Meeting = {
  id: string
  title: string
  userId: string
  createdAt: string
  updatedAt: string
}

export function Sidebar() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [newMeetingTitle, setNewMeetingTitle] = useState("")
  const [editingMeeting, setEditingMeeting] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)



  // Fetch meetings on component mount
  useEffect(() => {
    fetchMeetings()
  }, [])

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error("User ID not found");
      }
      const response = await fetch(`/api/meeting?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Pastikan `data` adalah array
      setMeetings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };
  



  const createMeeting = async () => {
    if (!newMeetingTitle.trim()) return
    const uid = parseInt(localStorage.getItem('userId') || '', 10)

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/meeting/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: uid, // Replace with actual user ID from your auth system
          title: newMeetingTitle
        })
      })

      if (!response.ok) throw new Error('Failed to create meeting')

      const newMeeting = await response.json()
      setMeetings([newMeeting, ...meetings])
      setNewMeetingOpen(false)
      setNewMeetingTitle("")
      toast.success("Meeting created successfully")
    } catch (error) {
      console.error("Failed to create meeting:", error)
      toast.error("Failed to create meeting")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateMeeting = async (id: string) => {
    if (!editTitle.trim()) return

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/meeting/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          title: editTitle
        })
      })

      if (!response.ok) throw new Error('Failed to update meeting')

      const updatedMeeting = await response.json()
      setMeetings(meetings.map(meeting =>
        meeting.id === id ? updatedMeeting : meeting
      ))
      setEditingMeeting(null)
      toast.success("Meeting updated successfully")
    } catch (error) {
      console.error("Failed to update meeting:", error)
      toast.error("Failed to update meeting")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteMeeting = async (id: string) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/meeting/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (!response.ok) throw new Error('Failed to delete meeting')

      setMeetings(meetings.filter(meeting => meeting.id !== id))
      if (selectedMeeting === id) setSelectedMeeting(null)
      toast.success("Meeting deleted successfully")
    } catch (error) {
      console.error("Failed to delete meeting:", error)
      toast.error("Failed to delete meeting")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMeetingClick = (id: string) => {
    setSelectedMeeting(id)
    // You can implement navigation or content loading here
  }

  return (
    <div className="w-60 border-r bg-background flex flex-col h-full">
      {/* New meeting button */}
      <div className="p-4">
        <Button
          variant="default"
          className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          onClick={() => setNewMeetingOpen(true)}
        >
          <Plus size={16} /> Rapat Baru
        </Button>
      </div>

      {/* Meeting list */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2">
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : meetings.length === 0 ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No meetings found
            </div>
          ) : (
            meetings.map(meeting => (
              <div key={meeting.id} className="relative group">
                {editingMeeting === meeting.id ? (
                  <div className="flex items-center gap-2 py-2 px-2 rounded-lg bg-accent">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => updateMeeting(meeting.id)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check size={14} />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => setEditingMeeting(null)}
                      disabled={isSubmitting}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-accent cursor-pointer ${selectedMeeting === meeting.id ? "bg-accent" : ""
                      }`}
                    onClick={() => handleMeetingClick(meeting.id)}
                  >
                    <MessageSquare size={18} className="mt-0.5" />
                    <span className="text-sm line-clamp-2 flex-1">{meeting.title}</span>
                    <div className="hidden group-hover:flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingMeeting(meeting.id);
                          setEditTitle(meeting.title);
                        }}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMeeting(meeting.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom buttons */}
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

      {/* New Meeting Dialog */}
      <Dialog open={newMeetingOpen} onOpenChange={setNewMeetingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Meeting title"
              value={newMeetingTitle}
              onChange={(e) => setNewMeetingTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewMeetingOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={createMeeting}
              disabled={!newMeetingTitle.trim() || isSubmitting}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}