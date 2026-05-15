"use client"

import { useState, useEffect } from "react"
import { Star, Quote, Loader2 } from "lucide-react"
import type { Testimonial } from "@/lib/types/database"

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        console.error("Error fetching testimonials:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 texture-bg">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="w-8 h-8 text-[var(--chiya-brown)] animate-spin" />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20 texture-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--chiya-brown)] mb-4">
            What Our Guests Say
          </h2>
          <p className="text-[var(--chiya-brown)]/70 max-w-xl mx-auto">
            Real reviews from our beloved customers
          </p>
          <div className="w-24 h-1 bg-[var(--chiya-bamboo)] mx-auto rounded-full mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[var(--chiya-warm)] rounded-xl p-6 shadow-md border border-[var(--chiya-bamboo)]/20 hover:shadow-lg transition-all relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[var(--chiya-bamboo)]/30" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-[var(--chiya-bamboo)] fill-[var(--chiya-bamboo)]"
                        : "text-[var(--chiya-bamboo)]/30"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[var(--chiya-brown)]/80 text-sm mb-4 leading-relaxed">
                {`"${testimonial.review_text}"`}
              </p>

              {/* Customer Name */}
              <p className="font-serif text-[var(--chiya-brown)] font-medium">
                {testimonial.customer_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
