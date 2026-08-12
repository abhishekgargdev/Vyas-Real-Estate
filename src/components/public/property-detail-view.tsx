"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Bath,
  Bed,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronDown,
  Dumbbell,
  Flame,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Shield,
  Square,
  Star,
  Trees,
  Waves,
  Wifi,
  Wind,
  ArrowUpDown as Lift,
} from "lucide-react"

import { PropertyCard } from "@/components/public/property-card"
import { PropertyGallery } from "@/components/public/property-gallery"
import { ScheduleVisitDialog } from "@/components/public/schedule-visit-dialog"
import { SectionLabel } from "@/components/public/section-label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { teamMembers } from "@/data/team"
import { cn } from "@/lib/utils"
import type { Property, PropertyStatus } from "@/types"

const statusLabels: Record<PropertyStatus, string> = {
  ready: "Ready to Move",
  "under-construction": "Under Construction",
  "new-launch": "New Launch",
  sold: "Sold",
}

function statusBadgeVariant(
  status: PropertyStatus
): "ready" | "under-construction" | "sold" | "outline" {
  if (status === "ready") return "ready"
  if (status === "under-construction") return "under-construction"
  if (status === "sold") return "sold"
  return "outline"
}

const AMENITIES = [
  { icon: Car, label: "Covered Parking" },
  { icon: Dumbbell, label: "Gymnasium" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Lift, label: "High-Speed Lift" },
  { icon: Trees, label: "Landscaped Garden" },
  { icon: Wifi, label: "Broadband Ready" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: Flame, label: "Power Backup" },
  { icon: Wind, label: "Central AC" },
  { icon: Building2, label: "Clubhouse" },
] as const

const NEARBY = [
  { name: "Lilavati Hospital", dist: "1.2 km", type: "Healthcare" },
  { name: "American School of Bombay", dist: "0.8 km", type: "Education" },
  { name: "Linking Road Metro", dist: "600 m", type: "Transit" },
  { name: "Bandra-Kurla Complex", dist: "4.1 km", type: "Business" },
  { name: "Bandstand Promenade", dist: "950 m", type: "Leisure" },
  { name: "D-Mart Bandra", dist: "1.5 km", type: "Shopping" },
] as const

const DEFAULT_BROKER = teamMembers.find(
  (member) => member.name === "Meera Krishnan"
)

function possessionLabel(status: PropertyStatus) {
  if (status === "ready") return "Immediate"
  if (status === "under-construction") return "Q2 2027"
  if (status === "new-launch") return "Pre-booking"
  return "Sold"
}

function propertyTypeLabel(type: Property["type"]) {
  if (type === "Flat") return "Apartment"
  return type
}

function formatFurnishing(furnishing: Property["furnishing"]) {
  return furnishing
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-")
}

interface PropertyDetailViewProps {
  property: Property
  similarProperties: Property[]
}

export function PropertyDetailView({
  property,
  similarProperties,
}: PropertyDetailViewProps) {
  const [visitOpen, setVisitOpen] = useState(false)
  const [liked, setLiked] = useState(property.liked)
  const [sticky, setSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const broker = DEFAULT_BROKER ?? teamMembers[0]
  const address =
    property.address ?? `${property.location}, ${property.city}`
  const description =
    property.description ??
    `${property.title} is a premium ${property.beds > 0 ? `${property.beds} BHK` : property.type.toLowerCase()} in ${property.location}, ${property.city}. Contact our broker for a private viewing and full documentation.`

  useEffect(() => {
    const handler = () => {
      if (headerRef.current) {
        setSticky(window.scrollY > headerRef.current.offsetTop + 60)
      }
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const keyDetails = [
    {
      icon: Square,
      label: "Total Area",
      value: property.area,
    },
    {
      icon: Bed,
      label: "Bedrooms",
      value: property.beds > 0 ? `${property.beds} BHK` : "N/A",
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: `${property.baths} Full`,
    },
    {
      icon: Building2,
      label: "Property Type",
      value: propertyTypeLabel(property.type),
    },
    {
      icon: Calendar,
      label: "Possession",
      value: possessionLabel(property.status),
    },
    {
      icon: ChevronDown,
      label: "Furnishing",
      value: formatFurnishing(property.furnishing),
    },
  ] as const

  return (
    <div className="min-h-screen bg-surface">
      <PropertyGallery images={property.images} title={property.title} />

      {sticky && (
        <div className="fixed top-[68px] right-0 left-0 z-40 border-b border-border bg-card shadow-sm">
          <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-12">
            <div>
              <div className="font-heading text-base font-semibold text-foreground">
                {property.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {property.location}, {property.city}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-heading text-[22px] font-bold text-accent">
                {property.priceLabel}
              </span>
              <Button
                size="sm"
                className="gap-1.5 font-bold"
                onClick={() => setVisitOpen(true)}
              >
                <Calendar className="size-3.5" />
                Schedule Visit
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 font-semibold">
                <Phone className="size-3.5" />
                Contact Broker
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-12">
        <nav
          className="flex items-center gap-2 pt-5"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <span className="text-xs text-muted-foreground">/</span>
          <Link
            href="/listings"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Properties
          </Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs font-medium text-foreground/80">
            {property.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-9 pt-7 pb-20 lg:grid-cols-[1fr_340px]">
          <div>
            <Card ref={headerRef} className="mb-6 gap-0 py-0">
              <CardContent className="px-8 py-7">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <Badge
                      variant={statusBadgeVariant(property.status)}
                      className="mb-2.5"
                    >
                      ● {statusLabels[property.status]}
                    </Badge>
                    <h1 className="font-heading mb-1 text-[32px] leading-tight font-bold text-foreground">
                      {property.title}
                      {property.type === "Flat" ? " Apartment" : ""}
                    </h1>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {address}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        liked && "border-destructive bg-destructive-bg"
                      )}
                      onClick={() => setLiked((current) => !current)}
                      aria-label={liked ? "Remove from saved" : "Save property"}
                    >
                      <Heart
                        className={cn(
                          "size-4",
                          liked
                            ? "fill-destructive text-destructive"
                            : "text-foreground/70"
                        )}
                      />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Share property"
                    >
                      <Share2 className="size-4 text-foreground/70" />
                    </Button>
                  </div>
                </div>

                <div className="mb-5 flex items-baseline gap-3.5">
                  <span className="font-heading text-[40px] font-bold text-accent">
                    {property.priceLabel}
                  </span>
                  {property.pricePerSqft && (
                    <span className="text-[13px] text-muted-foreground">
                      {property.pricePerSqft}
                    </span>
                  )}
                </div>

                <div className="flex gap-2.5">
                  <Button
                    className="h-12 flex-1 gap-2 text-sm font-bold"
                    onClick={() => setVisitOpen(true)}
                  >
                    <Calendar className="size-4" />
                    Schedule a Visit
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 flex-1 gap-2 text-sm font-semibold"
                  >
                    <Phone className="size-4" />
                    Contact Broker
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 gap-0 py-0">
              <CardContent className="px-8 py-6">
                <h2 className="font-heading mb-5 text-xl font-semibold text-foreground">
                  Key Details
                </h2>
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                  {keyDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-start gap-3.5 bg-card p-5"
                    >
                      <detail.icon className="mt-0.5 size-[18px] shrink-0 text-accent" />
                      <div>
                        <div className="mb-1 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                          {detail.label}
                        </div>
                        <div className="font-heading text-base font-semibold text-foreground">
                          {detail.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 gap-0 py-0">
              <CardContent className="px-8 py-6">
                <h2 className="font-heading mb-4 text-xl font-semibold text-foreground">
                  About This Property
                </h2>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {description}
                </p>
                {property.reraId && (
                  <p className="mt-3.5 text-sm leading-relaxed text-foreground/80">
                    RERA registration: {property.reraId}. Professional society
                    management with 24-hour security and dedicated maintenance.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="mb-6 gap-0 py-0">
              <CardContent className="px-8 py-6">
                <h2 className="font-heading mb-5 text-xl font-semibold text-foreground">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
                  {AMENITIES.map((amenity) => (
                    <div
                      key={amenity.label}
                      className="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-4 text-center"
                    >
                      <amenity.icon className="size-5 text-accent" />
                      <span className="text-[11px] leading-snug font-medium text-foreground/80">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 gap-0 py-0">
              <CardContent className="px-8 py-6">
                <h2 className="font-heading mb-5 text-xl font-semibold text-foreground">
                  Location & Nearby
                </h2>
                <div className="relative mb-5 h-[280px] overflow-hidden rounded-[10px] border border-border bg-muted">
                  <Image
                    src={property.images[0]}
                    alt={`${property.title} location`}
                    fill
                    className="object-cover opacity-40"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                    <div className="flex size-11 items-center justify-center rounded-full bg-accent shadow-md">
                      <MapPin className="size-5 fill-primary text-primary" />
                    </div>
                    <div className="rounded-lg bg-card px-4 py-2 shadow-sm">
                      <span className="text-[13px] font-semibold text-foreground">
                        {property.title}, {property.location}
                      </span>
                    </div>
                    <span className="rounded bg-white/80 px-2 py-0.5 text-[11px] text-foreground/80">
                      Interactive map — click to open in Google Maps
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {NEARBY.map((place) => (
                    <div
                      key={place.name}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent/10">
                        <MapPin className="size-3.5 text-accent" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-foreground">
                          {place.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {place.type} · {place.dist}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-[88px] gap-0 py-0">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="mr-2 h-[18px] w-1 rounded-sm bg-accent" />
                  <span className="text-[11px] font-bold tracking-wider text-foreground/70 uppercase">
                    Listed By
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-3.5 border-b border-border pb-4">
                  <Image
                    src={broker.image}
                    alt={broker.name}
                    width={60}
                    height={60}
                    className="size-[60px] rounded-full border-2 border-accent object-cover"
                  />
                  <div>
                    <div className="section-title">
                      {broker.name}
                    </div>
                    <div className="text-xs font-semibold text-accent">
                      {broker.role} · Vyas Real Estate
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={cn(
                            "size-2.5",
                            index < 4
                              ? "fill-accent text-accent"
                              : "text-accent"
                          )}
                        />
                      ))}
                      <span className="ml-1 text-[11px] text-muted-foreground">
                        4.9 (62 reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 space-y-2.5">
                  <div className="flex items-center gap-2.5 rounded-md border border-border bg-muted/40 px-3 py-2.5">
                    <Phone className="size-3.5 shrink-0 text-accent" />
                    <span className="text-[13px] text-foreground/80">
                      +91 98210 34567
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-md border border-border bg-muted/40 px-3 py-2.5">
                    <Mail className="size-3.5 shrink-0 text-accent" />
                    <span className="text-[13px] text-foreground/80">
                      {broker.email}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Button
                    className="w-full gap-1.5 font-bold"
                    onClick={() => setVisitOpen(true)}
                  >
                    <Calendar className="size-3.5" />
                    Book a Visit
                  </Button>
                  <Button variant="outline" className="w-full gap-1.5 font-semibold">
                    <Phone className="size-3.5" />
                    Call Broker
                  </Button>
                </div>

                <div className="mt-4 flex gap-2.5 rounded-md bg-muted p-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-success-bg">
                    <Check className="size-3.5 text-success" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-foreground/80">
                    RERA Verified · {broker.deals} · Responds within 30 min
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {similarProperties.length > 0 && (
          <section className="pb-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <SectionLabel>You May Also Like</SectionLabel>
                <h2 className="font-heading text-[28px] font-bold text-foreground">
                  Similar Properties
                </h2>
              </div>
              <Link
                href="/listings"
                className="inline-flex items-center gap-1.5 border-b border-accent pb-px text-[13px] font-semibold text-accent-foreground"
              >
                View All
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none]">
              {similarProperties.map((similar) => (
                <PropertyCard key={similar.id} property={similar} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ScheduleVisitDialog
        property={property}
        open={visitOpen}
        onOpenChange={setVisitOpen}
        brokerName={broker.name}
      />
    </div>
  )
}
