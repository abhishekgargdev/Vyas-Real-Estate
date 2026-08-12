"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function HeroSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "w-full cursor-pointer appearance-none border-0 border-r border-border bg-transparent py-2.5 pr-8 pl-3 text-[13px] outline-none",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-[13px] -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

export function HomeHero() {
  const [propType, setPropType] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState("")
  const [intent, setIntent] = useState("Buy")

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-primary">
      <Image
        src="https://images.unsplash.com/photo-1566908829550-e6551b00979b?w=1920&h=1080&fit=crop&auto=format"
        alt="Luxury property exterior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-b from-primary/72 via-primary/50 to-primary/82" />

      <div className="relative w-full max-w-[860px] px-8 text-center">
        <div className="mb-5 flex items-center justify-center gap-2">
          <div className="h-px w-6 bg-accent" />
          <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
            India&apos;s Trusted Real Estate Broker
          </span>
          <div className="h-px w-6 bg-accent" />
        </div>

        <h1 className="font-heading mb-5 text-[64px] leading-[1.1] font-bold tracking-tight text-white">
          Find Your
          <br />
          <em className="text-accent not-italic">Dream Property</em>
        </h1>

        <p className="mx-auto mb-11 max-w-[520px] text-[17px] leading-relaxed text-white/70">
          Discover verified residential, commercial, and luxury properties across
          India&apos;s top cities — with transparent pricing and end-to-end
          broker support.
        </p>

        <div className="overflow-hidden rounded-[10px] bg-card shadow-2xl">
          <div className="flex border-b border-border px-5">
            {["Buy", "Rent", "New Projects"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setIntent(tab)}
                className={cn(
                  "-mb-px cursor-pointer border-0 border-b-2 bg-transparent px-5 py-3 text-[13px]",
                  tab === intent
                    ? "border-accent font-bold text-accent"
                    : "border-transparent font-normal text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center">
            <HeroSelect
              label="Property Type"
              value={propType}
              onChange={setPropType}
              options={[
                "Apartment / Flat",
                "Villa",
                "Commercial Shop",
                "Plot / Land",
                "Penthouse",
              ]}
            />
            <div className="h-10 w-px shrink-0 bg-border" />
            <HeroSelect
              label="Location"
              value={location}
              onChange={setLocation}
              options={[
                "Mumbai",
                "Delhi NCR",
                "Bengaluru",
                "Pune",
                "Hyderabad",
                "Chennai",
              ]}
            />
            <div className="h-10 w-px shrink-0 bg-border" />
            <HeroSelect
              label="Budget"
              value={budget}
              onChange={setBudget}
              options={[
                "Under ₹50 L",
                "₹50L – ₹1 Cr",
                "₹1 Cr – ₹2 Cr",
                "₹2 Cr – ₹5 Cr",
                "Above ₹5 Cr",
              ]}
            />
            <div className="shrink-0 p-3 pl-4">
              <Button size="lg" nativeButton={false} render={<Link href="/properties" />}>
                <Search className="size-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs text-white/40">
          Popular: Bandra West · Whitefield · Jubilee Hills · Golf Course Road ·
          Koramangala
        </p>
      </div>
    </section>
  )
}
