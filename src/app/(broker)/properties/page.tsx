"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Edit2,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { properties as allProperties } from "@/data/properties"
import { cn } from "@/lib/utils"
import type { Property, PropertyStatus, PropertyType } from "@/types"

const PROPERTY_TYPES: PropertyType[] = ["Flat", "Villa", "Shop", "Studio"]

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: "ready", label: "Ready to Move" },
  { value: "under-construction", label: "Under Construction" },
  { value: "new-launch", label: "New Launch" },
  { value: "sold", label: "Sold" },
]

function statusBadgeVariant(
  status: PropertyStatus
): "ready" | "under-construction" | "sold" | "outline" {
  if (status === "ready") return "ready"
  if (status === "under-construction") return "under-construction"
  if (status === "sold") return "sold"
  return "outline"
}

const statusLabels: Record<PropertyStatus, string> = {
  ready: "Ready to Move",
  "under-construction": "Under Construction",
  "new-launch": "New Launch",
  sold: "Sold",
}

function formatListedDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BrokerPropertiesPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return allProperties.filter((property) => {
      if (typeFilter !== "all" && property.type !== typeFilter) return false
      if (statusFilter !== "all" && property.status !== statusFilter) return false
      if (search) {
        const query = search.toLowerCase()
        const haystack =
          `${property.title} ${property.location} ${property.city}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [search, typeFilter, statusFilter])

  const allSelected =
    filtered.length > 0 && filtered.every((property) => selected.has(property.id))

  const toggleSelected = (id: string) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(filtered.map((property) => property.id)) : new Set())
  }

  const resetFilters = () => {
    setSearch("")
    setTypeFilter("all")
    setStatusFilter("all")
    setPage(1)
  }

  const propertyToDelete = allProperties.find(
    (property) => property.id === deleteId
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative w-full max-w-[260px]">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search properties..."
              className="h-9 pl-8 text-xs"
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value ?? "")}
          >
            <SelectTrigger className="h-9 min-w-[130px] text-xs">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value ?? "")}
          >
            <SelectTrigger className="h-9 min-w-[140px] text-xs">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs"
            onClick={resetFilters}
          >
            <Filter className="size-3" />
            Reset
          </Button>
        </div>

        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-9 text-xs"
              onClick={() => setSelected(new Set())}
            >
              Delete ({selected.size})
            </Button>
          )}
          <Button
            size="sm"
            className="h-9 gap-1.5 text-xs font-bold"
            nativeButton={false}
            render={<Link href="/properties/new" />}
          >
            <Plus className="size-3.5" />
            Add Property
          </Button>
        </div>
      </div>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <CardTitle className="font-heading text-base font-semibold">
              All Properties
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {filtered.length} results
            </span>
          </div>
          {selected.size > 0 && (
            <span className="text-xs text-muted-foreground">
              {selected.size} selected
            </span>
          )}
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-10 px-4">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => toggleAll(checked === true)}
                  aria-label="Select all properties"
                />
              </TableHead>
              <TableHead className="px-4 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Property
              </TableHead>
              <TableHead className="px-4 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Type
              </TableHead>
              <TableHead className="px-4 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Location
              </TableHead>
              <TableHead className="px-4 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Price
              </TableHead>
              <TableHead className="px-4 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Status
              </TableHead>
              <TableHead className="px-4 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Date Added
              </TableHead>
              <TableHead className="w-28 px-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((property, index) => {
              const isSelected = selected.has(property.id)

              return (
                <TableRow
                  key={property.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={cn(
                    isSelected && "bg-accent/5",
                    !isSelected && index % 2 === 1 && "bg-muted/20"
                  )}
                >
                  <TableCell className="px-4 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelected(property.id)}
                      aria-label={`Select ${property.title}`}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={property.thumbnail}
                          alt={property.title}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-foreground">
                          {property.title}
                        </div>
                        {property.featured && (
                          <Badge className="mt-1 bg-accent/10 text-[10px] font-bold text-accent-foreground hover:bg-accent/10">
                            FEATURED
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="secondary" className="text-[11px] font-semibold">
                      {property.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[160px] px-4 py-3 text-xs text-muted-foreground">
                    <span className="block truncate">
                      {property.location}, {property.city}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="font-heading text-sm font-bold text-foreground">
                      {property.priceLabel}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant={statusBadgeVariant(property.status)}>
                      {statusLabels[property.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                    {formatListedDate(property.listedDate)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        className="size-7"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/properties/${property.id}`}
                            aria-label={`View ${property.title}`}
                          />
                        }
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        className="size-7"
                        nativeButton={false}
                        render={
                          <Link
                            href="/properties/new"
                            aria-label={`Edit ${property.title}`}
                          />
                        }
                      >
                        <Edit2 className="size-3.5 text-accent" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        className="size-7"
                        onClick={() => setDeleteId(property.id)}
                        aria-label={`Delete ${property.title}`}
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <CardContent className="flex items-center justify-between border-t border-border px-5 py-3">
          <span className="text-xs text-muted-foreground">
            Showing {filtered.length} of {allProperties.length} properties
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((pageNumber) => (
              <Button
                key={pageNumber}
                type="button"
                variant={pageNumber === page ? "default" : "outline"}
                size="icon-sm"
                className={cn(
                  pageNumber === page &&
                    "bg-accent/10 text-accent-foreground hover:bg-accent/15"
                )}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive-bg">
              <Trash2 className="size-5 text-destructive" />
            </div>
            <DialogTitle className="font-heading text-xl font-bold">
              Delete Property?
            </DialogTitle>
            <DialogDescription>
              {propertyToDelete
                ? `"${propertyToDelete.title}" will be permanently removed. This action cannot be undone.`
                : "This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-2 gap-2 sm:justify-center">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteId(null)}>
              Delete Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
