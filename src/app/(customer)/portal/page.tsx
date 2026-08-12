"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Heart,
  Sliders,
  Star,
} from "lucide-react"

import { EnquiryTrackerList } from "@/components/customer/enquiry-tracker"
import { CustomerPropertyGrid } from "@/components/customer/customer-property-card"
import { VisitList } from "@/components/customer/visit-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import {
  getCurrentCustomer,
  getCustomerEnquiries,
  getCustomerSavedProperties,
  getCustomerVisits,
  getUpcomingCustomerVisits,
  SAVED_PROPERTY_IDS,
} from "@/data/customer"
import { properties } from "@/data/properties"

export default function CustomerPortalPage() {
  const customer = getCurrentCustomer()
  const enquiries = getCustomerEnquiries()
  const savedProperties = getCustomerSavedProperties()
  const allVisits = getCustomerVisits()
  const upcomingVisits = getUpcomingCustomerVisits()

  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => new Set(SAVED_PROPERTY_IDS)
  )

  const displaySaved = useMemo(
    () => properties.filter((property) => savedIds.has(property.id)),
    [savedIds]
  )

  const toggleSaved = (propertyId: string) => {
    setSavedIds((current) => {
      const next = new Set(current)
      if (next.has(propertyId)) {
        next.delete(propertyId)
      } else {
        next.add(propertyId)
      }
      return next
    })
  }

  const quickStats = [
    {
      icon: BookOpen,
      label: "Active Enquiries",
      value: String(enquiries.length),
      iconClass: "text-purple-600",
      bgClass: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      icon: Heart,
      label: "Saved Properties",
      value: String(savedIds.size),
      iconClass: "text-accent",
      bgClass: "bg-accent/10",
    },
    {
      icon: Calendar,
      label: "Upcoming Visits",
      value: String(upcomingVisits.length),
      iconClass: "text-blue-600",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
    },
  ] as const

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-heading text-[26px] font-bold text-foreground">
          Welcome back, {customer.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a summary of your property journey with Vyas Realty
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <Card key={stat.label} className="gap-0 py-0">
                <CardContent className="px-4.5 py-4">
                  <div
                    className={`mb-3 flex size-10 items-center justify-center rounded-lg ${stat.bgClass}`}
                  >
                    <stat.icon className={`size-4.5 ${stat.iconClass}`} />
                  </div>
                  <div className="font-heading text-[26px] font-bold leading-none text-foreground">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-7">
            <EnquiryTrackerList enquiries={enquiries} />
          </div>

          <CustomerPropertyGrid
            properties={displaySaved.length > 0 ? displaySaved : savedProperties}
            savedIds={savedIds}
            onToggleSaved={toggleSaved}
            showBrowseLink
          />
        </div>

        <div className="flex flex-col gap-5">
          <VisitList visits={allVisits} title="Upcoming Visits" compact />

          <Card id="preferences" className="gap-0 py-0">
            <CardContent className="px-5 py-4.5">
              <div className="mb-3.5 flex items-center gap-2">
                <Sliders className="size-4 text-accent" />
                <h2 className="font-heading text-[15px] font-bold text-foreground">
                  My Preferences
                </h2>
              </div>
              <div className="mb-4 flex flex-col gap-2.5">
                {[
                  { label: "Property Type", val: "Flat, Villa" },
                  { label: "Budget", val: customer.budget },
                  { label: "Location", val: "Mumbai, Pune" },
                  { label: "Bedrooms", val: "3+ BHK" },
                ].map((pref) => (
                  <div
                    key={pref.label}
                    className="flex items-center justify-between border-b border-border/60 py-2 last:border-b-0"
                  >
                    <span className="text-xs text-muted-foreground">
                      {pref.label}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {pref.val}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent/10"
                onClick={() =>
                  toast.add({
                    title: "Preferences",
                    description: "Preference updates will be available soon.",
                    type: "info",
                  })
                }
              >
                Update Preferences
              </Button>
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden border-0 bg-primary py-0 text-primary-foreground">
            <CardContent className="px-5 py-4.5">
              <p className="mb-2.5 text-[11px] font-bold tracking-wider text-accent uppercase">
                Your Dedicated Broker
              </p>
              <div className="mb-3.5 flex items-center gap-3">
                <div className="flex size-11.5 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-primary">
                  RV
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Rajesh Vyas</p>
                  <div className="mt-0.5 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="size-2.5 fill-accent text-accent"
                      />
                    ))}
                    <span className="ml-1 text-[11px] text-white/50">5.0</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90"
                onClick={() =>
                  toast.add({
                    title: "Broker contacted",
                    description: "Rajesh Vyas will reach out shortly.",
                    type: "success",
                  })
                }
              >
                Contact Broker
              </Button>
            </CardContent>
          </Card>

          <Link
            href="/saved"
            className="flex items-center justify-center gap-1 text-xs font-semibold text-accent hover:underline xl:hidden"
          >
            View all saved properties
            <ChevronRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
