"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, MailOpen, Trash2, Phone, Calendar } from "lucide-react"
import type { ContactSubmission } from "@/lib/types/database"

export default function MessagesDashboardPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  const supabase = createClient()

  const fetchMessages = async () => {
    setLoading(true)
    let query = supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })
    
    if (filter === "unread") {
      query = query.eq("is_read", false)
    } else if (filter === "read") {
      query = query.eq("is_read", true)
    }
    
    const { data, error } = await query
    if (!error && data) {
      setMessages(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [filter])

  const openMessage = async (message: ContactSubmission) => {
    setSelectedMessage(message)
    if (!message.is_read) {
      await supabase.from("contact_submissions").update({ is_read: true }).eq("id", message.id)
      fetchMessages()
    }
  }

  const markAsUnread = async (id: string) => {
    await supabase.from("contact_submissions").update({ is_read: false }).eq("id", id)
    setSelectedMessage(null)
    fetchMessages()
  }

  const deleteMessage = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await supabase.from("contact_submissions").delete().eq("id", id)
      setSelectedMessage(null)
      fetchMessages()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Contact form submissions {unreadCount > 0 && `(${unreadCount} unread)`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-primary/10">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Messages
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Unread
            </Button>
            <Button
              variant={filter === "read" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("read")}
            >
              <MailOpen className="w-4 h-4 mr-2" />
              Read
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="font-serif">Inbox</CardTitle>
          <CardDescription>Click on a message to view details</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="w-6 h-6" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages found.
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    message.is_read
                      ? "border-primary/10 hover:bg-accent/50"
                      : "border-primary/20 bg-accent/30 hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${message.is_read ? "bg-muted" : "bg-primary/10"}`}>
                        {message.is_read ? (
                          <MailOpen className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Mail className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${!message.is_read ? "text-foreground" : ""}`}>
                            {message.name}
                          </span>
                          {!message.is_read && <Badge variant="secondary" className="text-xs">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(message.created_at)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 pl-11">
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-primary">Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>{selectedMessage?.email}</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {selectedMessage.phone}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedMessage.created_at)}
                </div>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAsUnread(selectedMessage.id)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Mark as Unread
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMessage(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
