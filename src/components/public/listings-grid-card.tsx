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

function statusBadgeVariant(
  status: PropertyStatus
): "ready" | "under-construction" | "sold" | "outline" {
  if (status === "ready") return "ready"
  if (status === "under-construction") return "under-construction"
  if (status === "sold") return "sold"
  return "outline"
}

export function ListingsGridCard({ property }: { property: Property }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(property.liked)
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden py-0 transition-shadow",
        hovered ? "shadow-md" : "shadow-sm"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[200px] overflow-hidden bg-muted">
        <Image
          src={property.images[imageIndex] ?? property.images[0]}
          alt={property.title}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            hovered && "scale-[1.04]"
          )}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="secondary" className="bg-white/92 text-foreground">
            {property.type}
          </Badge>
          <Badge variant={statusBadgeVariant(property.status)}>
            {statusLabels[property.status]}
          </Badge>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setLiked((current) => !current)
          }}
          className="absolute top-2.5 right-2.5 flex size-[30px] items-center justify-center rounded-full border-0 bg-white/92"
          aria-label={liked ? "Remove from saved" : "Save property"}
        >
          <Heart
            className={cn(
              "size-[13px]",
              liked ? "fill-destructive text-destructive" : "text-foreground/70"
            )}
          />
        </button>
        {property.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1">
            {property.images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setImageIndex(index)
                }}
                className={cn(
                  "h-1.5 rounded-full border-0 p-0 transition-all",
                  index === imageIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50"
                )}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="px-[18px] pt-4 pb-[18px]">
        <Link
          href={`/properties/${property.id}`}
          className="section-title-sm mb-1.5 block leading-snug font-semibold hover:text-accent-foreground"
        >
          {property.title}
        </Link>
        <div className="mb-3.5 flex items-center gap-1.5">
          <MapPin className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {property.location}, {property.city}
          </span>
        </div>
        <div className="mb-3.5 flex gap-3.5 border-b border-border pb-3.5">
          {property.beds > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bed className="size-3" />
              {property.beds}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bath className="size-3" />
            {property.baths}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Square className="size-3" />
            {property.area}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-[19px] font-bold text-foreground">
            {property.priceLabel}
          </span>
          <Link
            href={`/properties/${property.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-auto gap-1 px-3.5 py-1.5 text-xs font-semibold",
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
