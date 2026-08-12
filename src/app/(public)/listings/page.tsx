"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  Building2,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react"

import { ListingsGridCard } from "@/components/public/listings-grid-card"
import {
  defaultListingsFilters,
  ListingsFiltersSidebar,
  type ListingsFilters,
} from "@/components/public/listings-filters"
import { ListingsListRow } from "@/components/public/listings-list-row"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { properties as allProperties } from "@/data/properties"
import { cn } from "@/lib/utils"
import type { Property } from "@/types"

const PER_PAGE = 9

const QUICK_CITIES = ["Mumbai", "Delhi", "Bengaluru", "Pune"] as const

type SortOption = "newest" | "price-asc" | "price-desc"

const sortLabels: Record<SortOption, string> = {
  newest: "Newest First",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
}

function filterProperties(
  items: Property[],
  filters: ListingsFilters
): Property[] {
  return items.filter((property) => {
    if (filters.types.size > 0 && !filters.types.has(property.type)) {
      return false
    }
    if (
      filters.locations.size > 0 &&
      !filters.locations.has(property.city)
    ) {
      return false
    }
    if (
      filters.beds.size > 0 &&
      !Array.from(filters.beds).some((bed) => property.beds >= bed)
    ) {
      return false
    }
    if (
      filters.statuses.size > 0 &&
      !filters.statuses.has(property.status)
    ) {
      return false
    }
    if (
      filters.furnishing.size > 0 &&
      !filters.furnishing.has(property.furnishing)
    ) {
      return false
    }
    if (
      property.price < filters.budgetMin ||
      property.price > filters.budgetMax
    ) {
      return false
    }
    return true
  })
}

function sortProperties(items: Property[], sort: SortOption): Property[] {
  return [...items].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    return (
      new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
    )
  })
}

export default function PropertiesPage() {
  const [filters, setFilters] = useState<ListingsFilters>({
    ...defaultListingsFilters,
  })
  const [sort, setSort] = useState<SortOption>("newest")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => filterProperties(allProperties, filters),
    [filters]
  )
  const sorted = useMemo(() => sortProperties(filtered, sort), [filtered, sort])
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = sorted.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  )

  const updateFilters = (next: ListingsFilters) => {
    setFilters(next)
    setPage(1)
  }

  const toggleQuickCity = (city: (typeof QUICK_CITIES)[number]) => {
    const locations = new Set(filters.locations)
    if (locations.has(city)) {
      locations.delete(city)
    } else {
      locations.add(city)
    }
    updateFilters({ ...filters, locations })
  }

  const rangeStart = sorted.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1
  const rangeEnd = Math.min(currentPage * PER_PAGE, sorted.length)

  return (
    <div className="min-h-screen bg-surface">
      <section className="bg-primary py-12 pb-14">
        <div className="mx-auto max-w-[1440px] px-12">
          <nav className="mb-5 flex items-center gap-2" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-[13px] text-white/50 transition-colors hover:text-white/70"
            >
              Home
            </Link>
            <ChevronRight className="size-3.5 text-white/30" />
            <span className="text-[13px] font-medium text-accent">Properties</span>
          </nav>

          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="font-heading mb-2 text-[44px] leading-tight font-bold text-white">
                Property Listings
              </h1>
              <p className="text-sm text-white/50">
                {filtered.length} properties found across India&apos;s prime
                locations
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {QUICK_CITIES.map((city) => {
                const selected = filters.locations.has(city)
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => toggleQuickCity(city)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                      selected
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-white/15 bg-white/7 text-white/70 hover:text-white/90"
                    )}
                  >
                    {city}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-12 py-8 pb-16">
        <div className="flex items-start gap-7">
          <ListingsFiltersSidebar
            filters={filters}
            onChange={updateFilters}
            matchCount={filtered.length}
          />

          <div className="min-w-0 flex-1">
            <Card className="mb-5 flex-row items-center justify-between gap-4 px-4 py-3">
              <p className="text-[13px] text-muted-foreground">
                Showing{" "}
                <strong className="text-foreground">
                  {rangeStart}–{rangeEnd}
                </strong>{" "}
                of <strong className="text-foreground">{sorted.length}</strong>{" "}
                properties
              </p>

              <div className="flex items-center gap-3">
                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as SortOption)}
                >
                  <SelectTrigger size="sm" className="min-w-[180px]">
                    <ArrowUpDown className="size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                      <SelectItem key={option} value={option}>
                        {sortLabels[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex rounded-md bg-muted p-0.5">
                  {(
                    [
                      ["grid", LayoutGrid],
                      ["list", List],
                    ] as const
                  ).map(([mode, Icon]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setView(mode)}
                      className={cn(
                        "flex size-[30px] items-center justify-center rounded transition-colors",
                        view === mode
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-label={`${mode} view`}
                    >
                      <Icon className="size-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {paginated.length === 0 ? (
              <Card className="items-center py-20 text-center">
                <Building2 className="mb-4 size-10 text-border" />
                <h2 className="font-heading mb-2 text-xl text-foreground">
                  No properties found
                </h2>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
              </Card>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {paginated.map((property) => (
                  <ListingsGridCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {paginated.map((property) => (
                  <ListingsListRow key={property.id} property={property} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Card className="mt-8 flex-row items-center justify-between px-5 py-4">
                <span className="text-[13px] text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    ← Prev
                  </Button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                      <Button
                        key={pageNumber}
                        type="button"
                        variant={pageNumber === currentPage ? "default" : "outline"}
                        size="icon-sm"
                        className={cn(
                          pageNumber === currentPage &&
                            "bg-accent/10 text-accent-foreground hover:bg-accent/15"
                        )}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    )
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                  >
                    Next →
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
