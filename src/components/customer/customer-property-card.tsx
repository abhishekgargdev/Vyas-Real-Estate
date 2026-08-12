"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Heart, MapPin } from "lucide-react"

import { PropertyStatusBadge } from "@/components/customer/customer-status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Property } from "@/types"

export function CustomerPropertyCard({
  property,
  saved,
  onToggleSaved,
}: {
  property: Property
  saved: boolean
  onToggleSaved?: (propertyId: string) => void
}) {
  const [liked, setLiked] = useState(saved)

  const handleToggle = () => {
    setLiked((current) => !current)
    onToggleSaved?.(property.id)
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="relative">
        <div className="relative h-[140px] w-full">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="absolute top-2.5 right-2.5 flex size-7.5 items-center justify-center rounded-full bg-background shadow-sm"
          aria-label={liked ? "Remove from saved" : "Save property"}
        >
          <Heart
            className={cn(
              "size-3.5",
              liked ? "fill-accent text-accent" : "text-muted-foreground"
            )}
          />
        </button>
        <PropertyStatusBadge status={property.status} />
      </div>
      <CardContent className="px-3.5 py-3">
        <h3 className="truncate text-[13px] font-semibold text-foreground">
          {property.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="size-2.5 shrink-0" />
          <span className="truncate">
            {property.location}, {property.city}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-heading text-[15px] font-bold text-foreground">
            {property.priceLabel}
          </span>
          <Link
            href={`/properties/${property.id}`}
            className="text-[11px] font-semibold text-accent hover:underline"
          >
            View →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function CustomerPropertyGrid({
  properties,
  savedIds,
  onToggleSaved,
  title = "Saved Properties",
  showBrowseLink = false,
}: {
  properties: Property[]
  savedIds: Set<string>
  onToggleSaved?: (propertyId: string) => void
  title?: string
  showBrowseLink?: boolean
}) {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-bold text-foreground">
          {title}
        </h2>
        {showBrowseLink && (
          <Link
            href="/listings"
            className="text-xs font-semibold text-accent hover:underline"
          >
            Browse more →
          </Link>
        )}
      </div>
      {properties.length === 0 ? (
        <Card className="gap-0 py-0">
          <CardContent className="px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No saved properties yet.
            </p>
            <Link
              href="/listings"
              className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
            >
              Browse listings
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <CustomerPropertyCard
              key={property.id}
              property={property}
              saved={savedIds.has(property.id)}
              onToggleSaved={onToggleSaved}
            />
          ))}
        </div>
      )}
    </div>
  )
}
