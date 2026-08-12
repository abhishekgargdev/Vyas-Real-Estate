"use client"

import { SlidersHorizontal, X } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import type { Furnishing, PropertyStatus, PropertyType } from "@/types"

export const PROP_TYPES: PropertyType[] = ["Flat", "Villa", "Shop", "Studio"]
export const LOCATIONS = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chennai",
] as const
export const BED_OPTIONS = [1, 2, 3, 4, 5] as const
export const FILTER_STATUSES: PropertyStatus[] = [
  "ready",
  "under-construction",
  "new-launch",
  "sold",
]
export const FURNISH_OPTIONS: Furnishing[] = [
  "furnished",
  "semi-furnished",
  "unfurnished",
]

export const BUDGET_MIN = 0
export const BUDGET_MAX = 100_000_000
export const BUDGET_STEP = 1_000_000

export const statusFilterLabels: Record<PropertyStatus, string> = {
  ready: "Ready to Move",
  "under-construction": "Under Construction",
  "new-launch": "New Launch",
  sold: "Sold",
}

export interface ListingsFilters {
  types: Set<PropertyType>
  locations: Set<string>
  beds: Set<number>
  statuses: Set<PropertyStatus>
  furnishing: Set<Furnishing>
  budgetMin: number
  budgetMax: number
}

export const defaultListingsFilters: ListingsFilters = {
  types: new Set(),
  locations: new Set(),
  beds: new Set(),
  statuses: new Set(),
  furnishing: new Set(),
  budgetMin: BUDGET_MIN,
  budgetMax: BUDGET_MAX,
}

export function formatBudget(value: number) {
  if (value >= 10_000_000) {
    return `₹${(value / 10_000_000).toFixed(1)} Cr`
  }
  return `₹${(value / 100_000).toFixed(0)} L`
}

function hasActiveFilters(filters: ListingsFilters) {
  return (
    filters.types.size > 0 ||
    filters.locations.size > 0 ||
    filters.beds.size > 0 ||
    filters.statuses.size > 0 ||
    filters.furnishing.size > 0 ||
    filters.budgetMin > BUDGET_MIN ||
    filters.budgetMax < BUDGET_MAX
  )
}

function FilterCheckboxRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <Label
        htmlFor={id}
        className="cursor-pointer text-[13px] font-normal text-foreground/80"
      >
        {label}
      </Label>
    </div>
  )
}

interface ListingsFiltersSidebarProps {
  filters: ListingsFilters
  onChange: (filters: ListingsFilters) => void
  matchCount: number
}

export function ListingsFiltersSidebar({
  filters,
  onChange,
  matchCount,
}: ListingsFiltersSidebarProps) {
  const toggleSetValue = <K extends keyof ListingsFilters>(
    key: K,
    value: ListingsFilters[K] extends Set<infer U> ? U : never
  ) => {
    const current = new Set(filters[key] as Set<typeof value>)
    if (current.has(value)) {
      current.delete(value)
    } else {
      current.add(value)
    }
    onChange({ ...filters, [key]: current })
  }

  const clearAll = () => onChange({ ...defaultListingsFilters })

  return (
    <aside className="sticky top-[88px] max-h-[calc(100vh-104px)] w-[260px] shrink-0 self-start overflow-y-auto rounded-[10px] border border-border bg-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-[15px] text-accent" />
          <span className="font-heading text-base font-semibold text-foreground">
            Filters
          </span>
        </div>
        {hasActiveFilters(filters) && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="h-auto gap-1 px-0 text-[11px] font-semibold text-destructive hover:bg-transparent hover:text-destructive"
            onClick={clearAll}
          >
            <X className="size-3" />
            Clear all
          </Button>
        )}
      </div>

      <Accordion
        multiple
        defaultValue={[
          "property-type",
          "budget",
          "location",
          "bedrooms",
          "status",
        ]}
        className="w-full"
      >
        <AccordionItem value="property-type" className="border-border">
          <AccordionTrigger className="py-0 pb-3.5 text-xs font-bold tracking-wider text-foreground uppercase hover:no-underline">
            Property Type
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-5">
            {PROP_TYPES.map((type) => (
              <FilterCheckboxRow
                key={type}
                id={`type-${type}`}
                label={type}
                checked={filters.types.has(type)}
                onCheckedChange={() => toggleSetValue("types", type)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="budget" className="border-border">
          <AccordionTrigger className="py-0 pb-3.5 text-xs font-bold tracking-wider text-foreground uppercase hover:no-underline">
            Budget Range
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <div className="mb-3 flex justify-between text-xs">
              <span className="text-muted-foreground">
                {formatBudget(filters.budgetMin)}
              </span>
              <span className="font-semibold text-foreground">
                {formatBudget(filters.budgetMax)}
              </span>
            </div>
            <Slider
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={[filters.budgetMin, filters.budgetMax]}
              onValueChange={(value) => {
                const values = Array.isArray(value) ? value : [value]
                const [budgetMin = BUDGET_MIN, budgetMax = BUDGET_MAX] = values
                onChange({ ...filters, budgetMin, budgetMax })
              }}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-border">
          <AccordionTrigger className="py-0 pb-3.5 text-xs font-bold tracking-wider text-foreground uppercase hover:no-underline">
            Location
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-5">
            {LOCATIONS.map((location) => (
              <FilterCheckboxRow
                key={location}
                id={`location-${location}`}
                label={location}
                checked={filters.locations.has(location)}
                onCheckedChange={() => toggleSetValue("locations", location)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bedrooms" className="border-border">
          <AccordionTrigger className="py-0 pb-3.5 text-xs font-bold tracking-wider text-foreground uppercase hover:no-underline">
            Bedrooms
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <div className="flex flex-wrap gap-2">
              {BED_OPTIONS.map((bed) => {
                const selected = filters.beds.has(bed)
                return (
                  <button
                    key={bed}
                    type="button"
                    onClick={() => toggleSetValue("beds", bed)}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors",
                      selected
                        ? "border-accent bg-accent/10 text-accent-foreground"
                        : "border-border text-foreground/80 hover:border-accent/50"
                    )}
                  >
                    {bed}+
                  </button>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="status" className="border-border">
          <AccordionTrigger className="py-0 pb-3.5 text-xs font-bold tracking-wider text-foreground uppercase hover:no-underline">
            Status
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-5">
            {FILTER_STATUSES.map((status) => (
              <FilterCheckboxRow
                key={status}
                id={`status-${status}`}
                label={statusFilterLabels[status]}
                checked={filters.statuses.has(status)}
                onCheckedChange={() => toggleSetValue("statuses", status)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="furnishing" className="border-border">
          <AccordionTrigger className="py-0 pb-3.5 text-xs font-bold tracking-wider text-foreground uppercase hover:no-underline">
            Furnishing
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-5">
            {FURNISH_OPTIONS.map((option) => (
              <FilterCheckboxRow
                key={option}
                id={`furnish-${option}`}
                label={option.charAt(0).toUpperCase() + option.slice(1)}
                checked={filters.furnishing.has(option)}
                onCheckedChange={() => toggleSetValue("furnishing", option)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="pt-1 text-center text-xs text-muted-foreground">
        {matchCount} properties match
      </p>
    </aside>
  )
}
