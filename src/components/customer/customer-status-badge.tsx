import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  clientStatusStyles,
  propertyStatusStyles,
} from "@/lib/status-styles"
import type { ClientStatus, PropertyStatus } from "@/types"

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const meta = clientStatusStyles[status]
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
  const meta = propertyStatusStyles[status]
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
