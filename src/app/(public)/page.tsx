"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Handshake,
  HeadphonesIcon,
  Home as HomeIcon,
  Landmark,
  Phone,
  ShieldCheck,
  Star,
  Store,
  TreePine,
} from "lucide-react"

import { HomeHero } from "@/components/public/home-hero"
import { PropertyCard } from "@/components/public/property-card"
import {
  GoldDivider,
  SectionLabel,
} from "@/components/public/section-label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { properties } from "@/data/properties"
import { testimonials } from "@/data/testimonials"
import { cn } from "@/lib/utils"

const featuredHomeProperties = properties.slice(0, 6)

const homeTestimonials = testimonials.slice(0, 3)

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    body: "Every listing undergoes RERA compliance checks and physical verification before it appears on our platform.",
  },
  {
    icon: Handshake,
    title: "Trusted Broker Network",
    body: "Over 200 certified agents across 12 cities with a proven track record of transparent, ethical transactions.",
  },
  {
    icon: HeadphonesIcon,
    title: "End-to-End Support",
    body: "From shortlisting to registration, dedicated relationship managers handle every step for you.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    body: "We negotiate directly with developers to secure the best market rate — no hidden charges, ever.",
  },
] as const

const categories = [
  {
    label: "Residential Flats",
    count: "840+ listings",
    icon: HomeIcon,
    image:
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop&auto=format",
    desc: "2BHK, 3BHK, 4BHK and studio apartments across prime locations",
  },
  {
    label: "Commercial Shops",
    count: "210+ listings",
    icon: Store,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop&auto=format",
    desc: "Retail outlets, showrooms, and high-street commercial spaces",
  },
  {
    label: "Luxury Villas",
    count: "95+ listings",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&h=400&fit=crop&auto=format",
    desc: "Independent villas with private pools, gardens, and premium finishes",
  },
  {
    label: "Plots & Land",
    count: "320+ listings",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&h=400&fit=crop&auto=format",
    desc: "Residential and agricultural plots in developing micro-markets",
  },
] as const

const stats = [
  { value: "1,460+", label: "Properties Listed" },
  { value: "3,200+", label: "Happy Clients" },
  { value: "18", label: "Years of Experience" },
  { value: "12", label: "Cities Covered" },
] as const

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <>
      <HomeHero />

      <section className="bg-card py-24">
        <div className="mx-auto max-w-[1440px] px-12">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <SectionLabel>Featured Properties</SectionLabel>
              <h2 className="font-heading text-[40px] leading-[1.15] font-bold text-foreground">
                Handpicked Listings
                <br />
                For Every Budget
              </h2>
            </div>
            <Link
              href="/listings"
              className="inline-flex items-center gap-1.5 border-b border-accent pb-0.5 text-[13px] font-semibold text-accent-foreground"
            >
              View All Properties
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none]">
            {featuredHomeProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-[1440px] px-12">
          <div className="mb-16 text-center">
            <GoldDivider center />
            <span className="text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
              Why Choose Us
            </span>
            <h2 className="font-heading mt-2.5 mb-3.5 text-[40px] leading-[1.15] font-bold text-foreground">
              The Vyas Difference
            </h2>
            <p className="mx-auto max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
              We combine deep local expertise with transparent processes to make
              property buying genuinely stress-free.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="gap-0 py-8">
                <CardContent className="px-7">
                  <div className="mb-4.5 flex size-[52px] items-center justify-center rounded-[10px] bg-accent/15 text-accent">
                    <Icon className="size-[26px]" />
                  </div>
                  <h3 className="font-heading mb-2.5 text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="mx-auto max-w-[1440px] px-12">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <SectionLabel>Browse by Category</SectionLabel>
              <h2 className="font-heading text-[40px] leading-[1.15] font-bold text-foreground">
                What Are You
                <br />
                Looking For?
              </h2>
            </div>
            <p className="max-w-[320px] text-sm leading-relaxed text-muted-foreground">
              Explore curated property categories — from first homes to
              investment-grade commercial spaces.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {categories.map((category, index) => {
              const Icon = category.icon
              const isHovered = hoveredCategory === index

              return (
                <Link
                  key={category.label}
                  href="/listings"
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={cn(
                    "relative h-[280px] overflow-hidden rounded-[10px] p-0 shadow-sm transition-shadow",
                    isHovered && "shadow-lg"
                  )}
                >
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-300",
                      isHovered && "scale-105"
                    )}
                    sizes="360px"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-colors",
                      isHovered
                        ? "bg-linear-to-t from-primary/92 to-primary/40"
                        : "bg-linear-to-t from-primary/85 via-primary/20 to-primary/20"
                    )}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                    <div className="mb-2.5 text-accent">
                      <Icon className="size-[30px]" />
                    </div>
                    <div className="font-heading mb-1 text-xl font-bold text-white">
                      {category.label}
                    </div>
                    <div className="mb-2 text-[11px] font-bold tracking-wide text-accent">
                      {category.count}
                    </div>
                    {isHovered ? (
                      <p className="text-xs leading-relaxed text-white/70">
                        {category.desc}
                      </p>
                    ) : null}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-[1440px] px-12">
          <div className="grid grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "px-8 text-center",
                  index < stats.length - 1 && "border-r border-white/7"
                )}
              >
                <div className="font-heading mb-2.5 text-[52px] leading-none font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm tracking-wide text-white/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-[1440px] px-12">
          <div className="mb-16 text-center">
            <GoldDivider center />
            <span className="text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
              Client Stories
            </span>
            <h2 className="font-heading mt-2.5 text-[40px] leading-[1.15] font-bold text-foreground">
              Trusted by Thousands
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {homeTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={cn(
                  "cursor-pointer gap-0 py-8 transition-colors",
                  index === activeTestimonial
                    ? "border-accent shadow-md"
                    : "shadow-sm"
                )}
                onClick={() => setActiveTestimonial(index)}
              >
                <CardContent className="px-7">
                  <div className="mb-4.5 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <Star
                        key={star}
                        className="size-[13px] fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-foreground/80 italic">
                    &ldquo;{testimonial.review}&rdquo;
                  </p>
                  <div className="border-t border-border pt-5">
                    <div className="mb-2 flex items-center gap-3">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={44}
                        height={44}
                        className="size-11 shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-heading text-[15px] font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="size-[11px] text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground">
                        {testimonial.property}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {homeTestimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveTestimonial(index)}
                className={cn(
                  "h-2 cursor-pointer rounded border-0 transition-all",
                  index === activeTestimonial
                    ? "w-6 bg-accent"
                    : "w-2 bg-border"
                )}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-12">
        <div className="relative flex items-center justify-between gap-12 overflow-hidden rounded-[14px] bg-primary px-20 py-[72px]">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=500&fit=crop&auto=format"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="1440px"
          />
          <div className="relative flex-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-5 bg-accent" />
              <Badge variant="outline" className="border-accent/30 text-accent">
                For Property Owners
              </Badge>
            </div>
            <h2 className="font-heading mb-3.5 text-[42px] leading-[1.15] font-bold text-white">
              List Your Property
              <br />
              With Us
            </h2>
            <p className="max-w-[440px] text-[15px] leading-relaxed text-white/55">
              Reach 50,000+ serious buyers monthly. Our verified listings get 4×
              more enquiries than market average — with zero brokerage for
              sellers.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-col gap-3">
            <Button size="lg">
              List Property Free
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              <Phone className="size-3.5" />
              Request a Callback
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
