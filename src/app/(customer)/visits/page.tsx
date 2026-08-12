"use client"

import { useMemo } from "react"
import { CalendarDays } from "lucide-react"

import { VisitCard } from "@/components/customer/visit-list"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCustomerVisits } from "@/data/customer"
import type { Visit } from "@/types"

function isUpcoming(visit: Visit) {
  return visit.status === "pending" || visit.status === "upcoming"
}

function isCompleted(visit: Visit) {
  return visit.status === "completed"
}

export default function CustomerVisitsPage() {
  const visits = getCustomerVisits()

  const { upcoming, past } = useMemo(() => {
    return {
      upcoming: visits.filter(isUpcoming),
      past: visits.filter((visit) => !isUpcoming(visit)),
    }
  }, [visits])

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-heading text-[26px] font-bold text-foreground">
          My Visits
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track scheduled site visits and past appointments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <CardTitle className="font-heading text-base font-semibold">
              Upcoming
            </CardTitle>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              {upcoming.length}
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {upcoming.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <CalendarDays className="mx-auto mb-2 size-8 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  No upcoming visits scheduled
                </p>
              </div>
            ) : (
              upcoming.map((visit) => (
                <VisitCard key={visit.id} visit={visit} />
              ))
            )}
          </CardContent>
        </Card>

        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <CardTitle className="font-heading text-base font-semibold">
              Past Visits
            </CardTitle>
            <Badge variant="secondary">{past.length}</Badge>
          </CardHeader>
          <CardContent className="p-0">
            {past.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No past visits yet
                </p>
              </div>
            ) : (
              past.map((visit) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  showActions={!isCompleted(visit)}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
