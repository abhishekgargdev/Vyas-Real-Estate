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
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Property, PropertyStatus } from "@/types"

const statusLabels: Record<PropertyStatus, string> = {
  ready: "Ready to Move",
  "under-construction": "Under Construction",
  "new-launch": "New Launch",
  sold: "Sold",
}

export function PropertyCard({ property }: { property: Property }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(property.liked)

  return (
    <Card
      className={cn(
        "w-[340px] shrink-0 gap-0 py-0 transition-shadow",
        hovered ? "shadow-md" : "shadow-sm"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[210px] overflow-hidden bg-muted">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            hovered && "scale-105"
          )}
          sizes="340px"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary">{property.type}</Badge>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setLiked((current) => !current)
          }}
          className="absolute top-2.5 right-2.5 flex size-[30px] items-center justify-center rounded-full border-0 bg-white/90"
          aria-label={liked ? "Remove from saved" : "Save property"}
        >
          <Heart
            className={cn(
              "size-[13px]",
              liked ? "fill-destructive text-destructive" : "text-foreground/70"
            )}
          />
        </button>
        <div className="absolute right-3 bottom-3 rounded bg-primary/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {statusLabels[property.status]}
        </div>
      </div>

      <CardContent className="px-[18px] pt-4 pb-[18px]">
        <h3 className="font-heading mb-1.5 text-base leading-snug font-semibold text-foreground">
          {property.title}
        </h3>
        <div className="mb-3.5 flex items-center gap-1.5">
          <MapPin className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {property.location}, {property.city}
          </span>
        </div>
        <div className="mb-3.5 flex gap-4 border-b border-border pb-3.5">
          {property.beds > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Bed className="size-3" />
              {property.beds} Beds
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Bath className="size-3" />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Square className="size-3" />
            {property.area}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-foreground">
            {property.priceLabel}
          </span>
          <Link
            href={`/properties/${property.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-auto gap-1 px-3.5 py-2 text-xs font-semibold",
              hovered && "border-accent bg-accent/10 text-accent-foreground"
            )}
          >
            View Details
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
