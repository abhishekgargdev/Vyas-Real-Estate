import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ClientStatus, PropertyStatus } from "@/types"

const CLIENT_STATUS_META: Record<
  ClientStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New Inquiry",
    className: "bg-muted text-foreground",
  },
  contacted: {
    label: "Contacted",
    className: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  "visit-scheduled": {
    label: "Visit Scheduled",
    className: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
  },
  negotiation: {
    label: "Negotiation",
    className: "bg-warning-bg text-warning",
  },
  closed: {
    label: "Closed",
    className: "bg-success-bg text-success",
  },
  lost: {
    label: "Lost",
    className: "bg-muted text-muted-foreground",
  },
}

const PROPERTY_STATUS_META: Record<
  PropertyStatus,
  { label: string; className: string }
> = {
  ready: {
    label: "Ready",
    className: "bg-success-bg text-success",
  },
  "under-construction": {
    label: "Under Construction",
    className: "bg-warning-bg text-warning",
  },
  "new-launch": {
    label: "New Launch",
    className: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  sold: {
    label: "Sold",
    className: "bg-muted text-muted-foreground",
  },
}

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const meta = CLIENT_STATUS_META[status]
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full text-[11px] font-bold", meta.className)}
    >
      {meta.label}
    </Badge>
  )
}

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  const meta = PROPERTY_STATUS_META[status]
  return (
    <Badge
      variant="secondary"
      className={cn(
        "absolute top-2.5 left-2.5 rounded-full text-[11px] font-bold",
        meta.className
      )}
    >
      {meta.label}
    </Badge>
  )
}
