"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Building2,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react"

import { GoldDivider } from "@/components/public/section-label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98210 00000",
    href: "tel:+919821000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@vyasrealty.in",
    href: "mailto:hello@vyasrealty.in",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "14B, Nariman Point, Mumbai — 400 021",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Sat, 9:00 AM – 7:00 PM IST",
  },
] as const

const inquiryTypes = [
  "Buying a Property",
  "Selling a Property",
  "Rental Inquiry",
  "Investment Advisory",
  "General Question",
] as const

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.inquiry) {
      toast.add({
        type: "error",
        title: "Select an inquiry type",
        description: "Please choose what you'd like to discuss.",
      })
      return
    }
    setForm({
      name: "",
      email: "",
      phone: "",
      inquiry: "",
      message: "",
    })
    toast.add({
      type: "success",
      title: "Message sent!",
      description: "Our team will get back to you within one business day.",
    })
  }

  return (
    <div className="min-h-screen bg-surface">
      <section className="bg-primary py-16 pb-[72px]">
        <div className="mx-auto max-w-[1440px] px-12">
          <nav className="mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-[13px] text-white/50 transition-colors hover:text-white/70"
            >
              Home
            </Link>
            <ChevronRight className="size-[13px] text-white/30" />
            <span className="text-[13px] font-medium text-accent">Contact</span>
          </nav>

          <GoldDivider />
          <h1 className="font-heading mt-1.5 mb-3.5 text-[52px] leading-[1.1] font-bold text-white">
            Get in Touch
          </h1>
          <p className="max-w-[560px] text-base leading-relaxed text-white/55">
            Whether you&apos;re buying, selling, or investing — our advisors are
            ready to help you take the next step with clarity and confidence.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-12 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <Card className="gap-0 py-0">
            <CardContent className="px-8 py-8">
              <h2 className="font-heading mb-1 text-2xl font-semibold text-foreground">
                Send Us a Message
              </h2>
              <p className="mb-7 text-sm text-muted-foreground">
                Fill out the form below and we&apos;ll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder="e.g. Priya Mehta"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      placeholder="+91 98210 00000"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-inquiry">Inquiry Type</Label>
                    <Select
                      value={form.inquiry}
                      onValueChange={(value) =>
                        setForm((current) => ({
                          ...current,
                          inquiry: value ?? "",
                        }))
                      }
                    >
                      <SelectTrigger id="contact-inquiry" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="gap-2 px-6 font-bold">
                  <Send className="size-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card className="gap-0 bg-primary py-0 text-primary-foreground">
              <CardContent className="px-7 py-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                    <Building2 className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold">
                      Vyas Real Estate
                    </div>
                    <div className="text-[10px] tracking-[0.1em] text-white/45 uppercase">
                      Verified · Trusted · Transparent
                    </div>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-white/55">
                  India&apos;s most trusted real estate brokerage — connecting
                  buyers, sellers, and investors across 12 cities since 2007.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/8">
                        <item.icon className="size-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-white/45 uppercase">
                          {item.label}
                        </div>
                        {"href" in item ? (
                          <a
                            href={item.href}
                            className="text-sm text-white/85 transition-colors hover:text-accent"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm text-white/85">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="gap-0 py-0">
              <CardContent className="px-7 py-6">
                <h3 className="font-heading mb-2 text-base font-semibold text-foreground">
                  Visit Our Office
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Walk-ins welcome. Schedule a consultation with a senior advisor
                  for personalized property recommendations.
                </p>
                <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <MapPin className="size-6 text-accent" />
                    <span className="text-xs text-muted-foreground">
                      Nariman Point, Mumbai
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
