"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, MapPin } from "lucide-react"

import { ClientStatusBadge } from "@/components/customer/customer-status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CustomerEnquiry } from "@/types"
import type { ClientStatus } from "@/types"

const PIPELINE_STEPS = [
  "Inquiry",
  "Contacted",
  "Visit",
  "Negotiation",
  "Closed",
] as const

function getPipelineIndex(status: ClientStatus) {
  switch (status) {
    case "new":
      return 0
    case "contacted":
      return 1
    case "visit-scheduled":
      return 2
    case "negotiation":
      return 3
    case "closed":
      return 4
    default:
      return 0
  }
}

export function EnquiryTracker({ enquiry }: { enquiry: CustomerEnquiry }) {
  const stepIndex = getPipelineIndex(enquiry.status)

  return (
    <Card className="mb-3 gap-0 py-0">
      <CardContent className="px-5 py-4">
        <div className="mb-3.5 flex gap-3.5">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={enquiry.property.images[0]}
              alt={enquiry.property.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {enquiry.property.title}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="size-2.5 shrink-0" />
              <span className="truncate">
                {enquiry.property.location}, {enquiry.property.city}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="font-heading text-[15px] font-bold text-foreground">
                {enquiry.property.priceLabel}
              </span>
              <ClientStatusBadge status={enquiry.status} />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {PIPELINE_STEPS.map((step, index) => (
            <div
              key={step}
              className={cn(
                "flex items-center",
                index < PIPELINE_STEPS.length - 1 && "flex-1"
              )}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex size-5.5 items-center justify-center rounded-full",
                    index <= stepIndex
                      ? "bg-accent"
                      : "bg-border",
                    index === stepIndex && "ring-2 ring-accent/40"
                  )}
                >
                  {index < stepIndex ? (
                    <Check className="size-2.5 text-accent-foreground" />
                  ) : (
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        index === stepIndex
                          ? "bg-accent-foreground"
                          : "bg-muted-foreground"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[9px] whitespace-nowrap",
                    index <= stepIndex
                      ? "font-bold text-accent"
                      : "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
              {index < PIPELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-0.5 mb-4 h-0.5 flex-1",
                    index < stepIndex ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function EnquiryTrackerList({
  enquiries,
  showViewAll = false,
}: {
  enquiries: CustomerEnquiry[]
  showViewAll?: boolean
}) {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-bold text-foreground">
          My Enquiries
        </h2>
        {showViewAll && (
          <Link
            href="/portal"
            className="text-xs font-semibold text-accent hover:underline"
          >
            View all →
          </Link>
        )}
      </div>
      {enquiries.map((enquiry) => (
        <EnquiryTracker key={enquiry.id} enquiry={enquiry} />
      ))}
    </div>
  )
}
