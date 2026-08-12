"use client"

import { useMemo, useState } from "react"
import {
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Phone,
  Plus,
  RotateCcw,
} from "lucide-react"
import type { DayButton } from "react-day-picker"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { clients } from "@/data/clients"
import { properties } from "@/data/properties"
import { visits as initialVisits } from "@/data/visits"
import { cn } from "@/lib/utils"
import type { Visit, VisitType } from "@/types"

const TYPE_LABELS: Record<VisitType, string> = {
  "site-visit": "Site Visit",
  "follow-up": "Follow-up",
  handover: "Handover",
}

const TYPE_DOT_CLASS: Record<VisitType, string> = {
  "site-visit": "bg-accent",
  "follow-up": "bg-purple-600",
  handover: "bg-success",
}

const TYPE_PILL_CLASS: Record<VisitType, string> = {
  "site-visit": "bg-accent text-accent-foreground",
  "follow-up": "bg-purple-600 text-white",
  handover: "bg-success text-success-foreground",
}

const DEMO_TODAY = new Date(2026, 7, 12)

function visitMatchesDate(visit: Visit, date: Date) {
  return (
    visit.day === date.getDate() &&
    visit.month === date.getMonth() + 1 &&
    visit.year === date.getFullYear()
  )
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}

function formatPanelTitle(date: Date) {
  if (isSameDay(date, DEMO_TODAY)) return "Today's Visits"
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function createVisitDayButton(visits: Visit[]) {
  return function VisitDayButton(
    props: React.ComponentProps<typeof DayButton>
  ) {
    const { day, modifiers, ...rest } = props
    const dayVisits = visits.filter((visit) => visitMatchesDate(visit, day.date))

    return (
      <CalendarDayButton day={day} modifiers={modifiers} {...rest}>
        <span className="text-xs leading-none">{day.date.getDate()}</span>
        {dayVisits.length > 0 && (
          <div className="mt-0.5 flex w-full flex-col gap-px px-0.5">
            {dayVisits.slice(0, 2).map((visit) => (
              <span
                key={visit.id}
                className={cn(
                  "truncate rounded px-1 py-px text-[8px] font-semibold leading-tight",
                  TYPE_PILL_CLASS[visit.type]
                )}
              >
                {visit.time}
              </span>
            ))}
            {dayVisits.length > 2 && (
              <span className="text-[8px] text-muted-foreground">
                +{dayVisits.length - 2} more
              </span>
            )}
          </div>
        )}
      </CalendarDayButton>
    )
  }
}

function ScheduleVisitDialog({
  open,
  onOpenChange,
  onSchedule,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSchedule: (visit: Visit) => void
}) {
  const [form, setForm] = useState({
    client: "",
    property: "",
    date: "",
    time: "",
    type: "",
    notes: "",
  })

  const resetForm = () => {
    setForm({
      client: "",
      property: "",
      date: "",
      time: "",
      type: "",
      notes: "",
    })
  }

  const handleSchedule = () => {
    if (!form.client || !form.property || !form.date || !form.time || !form.type) {
      toast.add({
        title: "Missing fields",
        description: "Please fill in all required visit details.",
        type: "error",
      })
      return
    }

    const parsed = new Date(form.date)
    const typeMap: Record<string, VisitType> = {
      "Site Visit": "site-visit",
      "Follow-up": "follow-up",
      Handover: "handover",
    }
    const client = clients.find((item) => item.name === form.client)

    const visit: Visit = {
      id: `V${String(Date.now()).slice(-3)}`,
      client: form.client,
      property: form.property,
      location: properties.find((item) => item.title === form.property)?.city,
      time: new Date(`1970-01-01T${form.time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      date: parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      day: parsed.getDate(),
      month: parsed.getMonth() + 1,
      year: parsed.getFullYear(),
      type: typeMap[form.type] ?? "site-visit",
      phone: client?.phone ?? "",
      broker: "Rajesh Vyas",
      notes: form.notes,
      status: "pending",
      confirmed: false,
    }

    onSchedule(visit)
    resetForm()
    onOpenChange(false)
    toast.add({
      title: "Visit scheduled",
      description: `${visit.client} — ${visit.date} at ${visit.time}`,
      type: "success",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-heading">Schedule Visit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3.5">
          <div className="grid gap-2">
            <Label>Client</Label>
            <Select
              value={form.client}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, client: value ?? "" }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select client..." />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.name}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Property</Label>
            <Select
              value={form.property}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, property: value ?? "" }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select property..." />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.title}>
                    {property.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, date: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, time: event.target.value }))
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Visit Type</Label>
            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, type: value ?? "" }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Site Visit">Site Visit</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Handover">Handover</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Notes</Label>
            <Textarea
              placeholder="Special instructions..."
              rows={2}
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>Schedule Visit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>(initialVisits)
  const [selectedDate, setSelectedDate] = useState<Date>(DEMO_TODAY)
  const [displayMonth, setDisplayMonth] = useState<Date>(
    new Date(DEMO_TODAY.getFullYear(), DEMO_TODAY.getMonth(), 1)
  )
  const [addOpen, setAddOpen] = useState(false)

  const selectedVisits = useMemo(
    () => visits.filter((visit) => visitMatchesDate(visit, selectedDate)),
    [visits, selectedDate]
  )

  const monthVisits = useMemo(
    () =>
      visits.filter(
        (visit) =>
          visit.month === displayMonth.getMonth() + 1 &&
          visit.year === displayMonth.getFullYear()
      ),
    [visits, displayMonth]
  )

  const monthStats = useMemo(
    () => ({
      total: monthVisits.length,
      completed: monthVisits.filter((visit) => visit.status === "completed").length,
      pending: monthVisits.filter(
        (visit) => visit.status === "pending" || visit.status === "upcoming"
      ).length,
    }),
    [monthVisits]
  )

  const VisitDayButton = useMemo(() => createVisitDayButton(visits), [visits])

  const markComplete = (id: string) => {
    setVisits((prev) =>
      prev.map((visit) =>
        visit.id === id ? { ...visit, status: "completed" } : visit
      )
    )
    toast.add({
      title: "Visit completed",
      type: "success",
    })
  }

  return (
    <div className="flex flex-col gap-5 xl:flex-row">
      <div className="min-w-0 flex-1">
        <Card className="gap-0 overflow-hidden py-0">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              className="w-full p-3 [--cell-size:2.75rem] md:p-4 md:[--cell-size:3.25rem]"
              classNames={{
                month: "w-full gap-3",
                month_caption: "mb-1",
                caption_label: "font-heading text-lg font-bold text-foreground",
                weekdays: "border-b border-border",
                weekday:
                  "flex-1 py-2 text-[11px] font-bold tracking-wide text-muted-foreground uppercase",
                week: "mt-0 w-full border-b border-border last:border-b-0",
                day: "aspect-auto min-h-[5.5rem] w-full rounded-none p-0.5 md:min-h-[6.25rem]",
                today: "bg-accent/10 text-foreground",
              }}
              components={{
                DayButton: VisitDayButton,
              }}
            />
          </CardContent>
        </Card>

        <Card className="mt-3.5 gap-0 py-0">
          <CardContent className="flex flex-wrap gap-4 px-4 py-3">
            {(Object.keys(TYPE_LABELS) as VisitType[]).map((type) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className={cn("size-2.5 rounded-sm", TYPE_DOT_CLASS[type])}
                />
                <span className="text-[11px] text-muted-foreground">
                  {TYPE_LABELS[type]}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="w-full shrink-0 xl:w-[300px]">
        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="flex-row items-center justify-between gap-3 border-b border-border px-4 py-3.5">
            <div>
              <CardTitle className="font-heading text-[15px] font-bold">
                {formatPanelTitle(selectedDate)}
              </CardTitle>
              <p className="text-[11px] text-muted-foreground">
                {selectedVisits.length} scheduled
              </p>
            </div>
            <Button size="sm" className="gap-1" onClick={() => setAddOpen(true)}>
              <Plus className="size-3" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="max-h-[520px] overflow-y-auto p-0">
            {selectedVisits.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <CalendarDays className="mx-auto mb-2 size-8 text-muted-foreground/60" />
                <p className="text-[13px] text-muted-foreground">
                  No visits for this day
                </p>
              </div>
            ) : (
              selectedVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="border-b border-border px-4 py-3.5 last:border-b-0"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            TYPE_DOT_CLASS[visit.type]
                          )}
                        />
                        <span
                          className={cn(
                            "text-[11px] font-bold tracking-wide uppercase",
                            visit.type === "site-visit" && "text-accent",
                            visit.type === "follow-up" && "text-purple-600",
                            visit.type === "handover" && "text-success"
                          )}
                        >
                          {TYPE_LABELS[visit.type]}
                        </span>
                        {visit.confirmed !== undefined && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[9px] font-bold",
                              visit.confirmed
                                ? "bg-success-bg text-success"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {visit.confirmed ? "Confirmed" : "Unconfirmed"}
                          </Badge>
                        )}
                      </div>
                      <div className="text-[13px] font-semibold text-foreground">
                        {visit.client}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="size-2.5 shrink-0" />
                        <span className="truncate">{visit.property}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Clock className="size-3 text-accent" />
                      <span className="text-xs font-bold text-foreground">
                        {visit.time}
                      </span>
                    </div>
                  </div>

                  {visit.status === "completed" ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-success">
                      <Check className="size-3" />
                      Completed
                    </div>
                  ) : visit.status === "cancelled" ? (
                    <p className="text-[11px] text-destructive">Cancelled</p>
                  ) : (
                    <div className="flex gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 flex-1 gap-1 border-success/40 text-[11px] text-success hover:bg-success-bg hover:text-success"
                        onClick={() => markComplete(visit.id)}
                      >
                        <Check className="size-3" />
                        Done
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 flex-1 gap-1 text-[11px]"
                        onClick={() =>
                          toast.add({
                            title: "Reschedule",
                            description: "Rescheduling will be available in a future update.",
                            type: "info",
                          })
                        }
                      >
                        <RotateCcw className="size-3" />
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="size-7 shrink-0"
                        nativeButton={false}
                        render={
                          <a
                            href={`tel:${visit.phone.replace(/\s/g, "")}`}
                            aria-label={`Call ${visit.client}`}
                          />
                        }
                      >
                        <Phone className="size-3 text-accent" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="mt-4 gap-0 py-0">
          <CardHeader className="px-4 py-3.5">
            <CardTitle className="font-heading text-sm font-semibold">
              Month Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4">
            {[
              { label: "Total scheduled", value: monthStats.total, className: "text-foreground" },
              { label: "Completed", value: monthStats.completed, className: "text-success" },
              { label: "Pending", value: monthStats.pending, className: "text-accent" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className={cn("text-base font-bold", item.className)}>
                  {item.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ScheduleVisitDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSchedule={(visit) => setVisits((prev) => [...prev, visit])}
      />
    </div>
  )
}
