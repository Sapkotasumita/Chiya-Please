"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Mail, Send, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Koteshower, Kathmandu, Nepal",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+977 9800000000",
  },
  {
    icon: Mail,
    title: "Email",
    content: "chiyaplease@gmail.com",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    content: "7 AM – 9 PM (Everyday)",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 texture-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--chiya-brown)] mb-4">
            Find Us
          </h2>
          <p className="text-[var(--chiya-brown)]/70 max-w-xl mx-auto">
            {"We'd love to see you! Drop by for a cup of chiya anytime."}
          </p>
          <div className="w-24 h-1 bg-[var(--chiya-bamboo)] mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bamboo-border rounded-xl overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2499999999995!2d85.30999999999999!3d27.715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzU0LjAiTiA4NcKwMTgnMzYuMCJF!5e0!3m2!1sen!2snp!4v1600000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chiya Please Location"
            />
          </div>

          {/* Contact Info Grid */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-[var(--chiya-warm)] rounded-xl p-4 shadow-md border border-[var(--chiya-bamboo)]/20 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--chiya-bamboo)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon
                        className="w-5 h-5 text-[var(--chiya-brown)]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm text-[var(--chiya-brown)]">
                        {info.title}
                      </h3>
                      <p className="text-[var(--chiya-brown)]/70 text-sm">{info.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--chiya-warm)] rounded-xl p-6 shadow-md border border-[var(--chiya-bamboo)]/20">
              <h3 className="font-serif text-xl text-[var(--chiya-brown)] mb-4">
                Send us a Message
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-12 h-12 text-[var(--chiya-leaf)] mb-4" />
                  <p className="text-[var(--chiya-brown)] font-medium">
                    Thank you for your message!
                  </p>
                  <p className="text-[var(--chiya-brown)]/70 text-sm mt-1">
                    {"We'll get back to you soon."}
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-4 border-[var(--chiya-bamboo)] text-[var(--chiya-brown)]"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-white/50 border-[var(--chiya-bamboo)]/30 focus:border-[var(--chiya-brown)]"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-white/50 border-[var(--chiya-bamboo)]/30 focus:border-[var(--chiya-brown)]"
                    />
                  </div>
                  <Input
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-white/50 border-[var(--chiya-bamboo)]/30 focus:border-[var(--chiya-brown)]"
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={3}
                    className="bg-white/50 border-[var(--chiya-bamboo)]/30 focus:border-[var(--chiya-brown)]"
                  />
                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--chiya-brown)] hover:bg-[var(--chiya-brown)]/90 text-[var(--chiya-cream)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
