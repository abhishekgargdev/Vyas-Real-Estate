"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  Bath,
  Bed,
  Heart,
  MapPin,
  Square,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

export function ListingsListRow({ property }: { property: Property }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(property.liked)

  return (
    <Card
      className={cn(
        "flex-row gap-0 overflow-hidden py-0 transition-shadow",
        hovered ? "shadow-md" : "shadow-sm"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-auto w-[220px] shrink-0 overflow-hidden bg-muted">
        <Image
          src={property.images[0]}
          alt={property.title}
          width={220}
          height={180}
          className={cn(
            "h-full min-h-[180px] w-full object-cover transition-transform duration-300",
            hovered && "scale-[1.04]"
          )}
        />
        <button
          type="button"
          onClick={() => setLiked((current) => !current)}
          className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full border-0 bg-white/92"
          aria-label={liked ? "Remove from saved" : "Save property"}
        >
          <Heart
            className={cn(
              "size-3",
              liked ? "fill-destructive text-destructive" : "text-foreground/70"
            )}
          />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between px-6 py-[18px]">
        <div>
          <div className="mb-1.5 flex items-start justify-between gap-6">
            <Link
              href={`/properties/${property.id}`}
              className="font-heading text-[17px] leading-snug font-semibold text-foreground hover:text-accent-foreground"
            >
              {property.title}
            </Link>
            <span className="font-heading shrink-0 text-xl font-bold text-foreground">
              {property.priceLabel}
            </span>
          </div>
          <div className="mb-3 flex items-center gap-1.5">
            <MapPin className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {property.location}, {property.city}
            </span>
          </div>
          <div className="mb-3.5 flex flex-wrap gap-2">
            <Badge variant="secondary">{property.type}</Badge>
            <Badge variant={statusBadgeVariant(property.status)}>
              {statusLabels[property.status]}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {property.furnishing}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-5">
            {property.beds > 0 && (
              <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Bed className="size-3.5" />
                {property.beds} Beds
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <Bath className="size-3.5" />
              {property.baths} Baths
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <Square className="size-3.5" />
              {property.area}
            </span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-auto gap-1.5 px-4 py-2 text-xs font-bold",
              !hovered && "bg-muted text-foreground/80 hover:bg-muted"
            )}
          >
            View Details
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
