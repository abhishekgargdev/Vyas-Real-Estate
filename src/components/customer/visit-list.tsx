"use client"

import { Check, Clock, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import type { Visit } from "@/types"

function isUpcoming(visit: Visit) {
  return visit.status === "pending" || visit.status === "upcoming"
}

function isCompleted(visit: Visit) {
  return visit.status === "completed"
}

export function VisitCard({
  visit,
  showActions = true,
}: {
  visit: Visit
  showActions?: boolean
}) {
  return (
    <div className="border-b border-border px-4.5 py-3.5 last:border-b-0">
      <p className="truncate text-[13px] font-semibold text-foreground">
        {visit.property}
      </p>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
        <Clock className="size-2.5 shrink-0" />
        <span>
          {visit.date} · {visit.time}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Agent: {visit.broker}
      </p>
      {visit.location && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {visit.location}
        </p>
      )}

      {showActions && (
        <div className="mt-2.5">
          {isCompleted(visit) ? (
            <div className="flex items-center gap-1.5 text-[11px] text-success">
              <Check className="size-3" />
              Completed
            </div>
          ) : isUpcoming(visit) ? (
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 flex-1 text-[11px]"
                onClick={() =>
                  toast.add({
                    title: "Reschedule",
                    description: "Rescheduling will be available in a future update.",
                    type: "info",
                  })
                }
              >
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="size-7 shrink-0 text-destructive hover:text-destructive"
                onClick={() =>
                  toast.add({
                    title: "Visit cancelled",
                    type: "info",
                  })
                }
              >
                <X className="size-3" />
              </Button>
            </div>
          ) : (
            <Badge
              variant="secondary"
              className="rounded-full bg-muted text-[11px] capitalize"
            >
              {visit.status}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

export function VisitList({
  visits,
  title = "Upcoming Visits",
  compact = false,
}: {
  visits: Visit[]
  title?: string
  compact?: boolean
}) {
  return (
    <Card className={cn("surface-card overflow-hidden", compact && "h-fit")}>
      <CardHeader className="border-b border-border px-4.5 py-3.5">
        <CardTitle className="section-title-sm">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {visits.length === 0 ? (
          <p className="px-4.5 py-8 text-center text-sm text-muted-foreground">
            No visits scheduled.
          </p>
        ) : (
          visits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
