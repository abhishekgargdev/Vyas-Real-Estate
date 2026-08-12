"use client"

import { useMemo, useState } from "react"

import { CustomerPropertyGrid } from "@/components/customer/customer-property-card"
import { PageHeader } from "@/components/shared/page-header"
import {
  getCustomerSavedProperties,
  SAVED_PROPERTY_IDS,
} from "@/data/customer"
import { properties } from "@/data/properties"

export default function CustomerSavedPage() {
  const initialSaved = getCustomerSavedProperties()
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => new Set(SAVED_PROPERTY_IDS)
  )

  const savedProperties = useMemo(
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

  return (
    <div>
      <PageHeader
        title="Saved Properties"
        description={`${savedProperties.length} propert${savedProperties.length === 1 ? "y" : "ies"} saved to your shortlist`}
      />

      <CustomerPropertyGrid
        properties={savedProperties.length > 0 ? savedProperties : initialSaved}
        savedIds={savedIds}
        onToggleSaved={toggleSaved}
        title="Your Shortlist"
        showBrowseLink
      />
    </div>
  )
}
