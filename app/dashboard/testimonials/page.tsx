"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { Star, Check, X, Trash2 } from "lucide-react"
import type { Testimonial } from "@/lib/types/database"

export default function TestimonialsDashboardPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all")

  const supabase = createClient()

  const fetchTestimonials = async () => {
    setLoading(true)
    let query = supabase.from("testimonials").select("*").order("created_at", { ascending: false })
    
    if (filter === "pending") {
      query = query.eq("is_approved", false)
    } else if (filter === "approved") {
      query = query.eq("is_approved", true)
    }
    
    const { data, error } = await query
    if (!error && data) {
      setTestimonials(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [filter])

  const approveTestimonial = async (id: string) => {
    await supabase.from("testimonials").update({ is_approved: true }).eq("id", id)
    fetchTestimonials()
  }

  const rejectTestimonial = async (id: string) => {
    await supabase.from("testimonials").update({ is_approved: false }).eq("id", id)
    fetchTestimonials()
  }

  const deleteTestimonial = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await supabase.from("testimonials").delete().eq("id", id)
      fetchTestimonials()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    )
  }

  const pendingCount = testimonials.filter((t) => !t.is_approved).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            Customer reviews {pendingCount > 0 && `(${pendingCount} pending)`}
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
              All Reviews
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              <X className="w-4 h-4 mr-2" />
              Pending
            </Button>
            <Button
              variant={filter === "approved" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("approved")}
            >
              <Check className="w-4 h-4 mr-2" />
              Approved
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="font-serif">Customer Reviews</CardTitle>
          <CardDescription>Approve or reject customer testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="w-6 h-6" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No testimonials found.
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`p-4 rounded-lg border ${
                    testimonial.is_approved
                      ? "border-green-200 bg-green-50/50"
                      : "border-yellow-200 bg-yellow-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">{testimonial.customer_name}</span>
                        {renderStars(testimonial.rating)}
                        <Badge variant={testimonial.is_approved ? "default" : "secondary"}>
                          {testimonial.is_approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {testimonial.review_text}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(testimonial.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-primary/10">
                    {!testimonial.is_approved ? (
                      <Button
                        size="sm"
                        onClick={() => approveTestimonial(testimonial.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectTestimonial(testimonial.id)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Unapprove
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
