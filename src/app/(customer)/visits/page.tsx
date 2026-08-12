"use client"

import { useMemo } from "react"
import { CalendarDays } from "lucide-react"

import { VisitCard } from "@/components/customer/visit-list"
import { PageHeader } from "@/components/shared/page-header"
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
      <PageHeader
        title="My Visits"
        description="Track scheduled site visits and past appointments"
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="surface-card overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <CardTitle className="section-title">
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

        <Card className="surface-card overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <CardTitle className="section-title">
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
