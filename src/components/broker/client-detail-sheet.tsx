"use client"

import { useEffect, useState } from "react"
import {
  Building2,
  ChevronDown,
  Edit2,
  Mail,
  Phone,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import type { Client, ClientStatus } from "@/types"

const statusConfig: Record<
  ClientStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New Inquiry",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  contacted: {
    label: "Contacted",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  "visit-scheduled": {
    label: "Visit Scheduled",
    className: "bg-accent/15 text-accent-foreground",
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

const avatarColors = [
  "bg-[#1E293B]",
  "bg-[#2D4A6B]",
  "bg-[#3D3D5C]",
  "bg-[#2A4535]",
  "bg-[#4A2D35]",
  "bg-[#3A2D4A]",
  "bg-[#2D3A4A]",
  "bg-[#4A3A2D]",
] as const

function getAvatarColor(name: string) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length]
}

const timeline = [
  {
    date: "Aug 11",
    action: "Added note — prefers weekend viewings",
  },
  {
    date: "Aug 10",
    action: "Follow-up call — 12 min. Discussed pricing flexibility.",
  },
  {
    date: "Aug 8",
    action: "Property shortlist sent via WhatsApp (3 listings)",
  },
  {
    date: "Aug 5",
    action: "Initial inquiry received via website",
  },
] as const

interface ClientDetailSheetProps {
  client: Client | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClientDetailSheet({
  client,
  open,
  onOpenChange,
}: ClientDetailSheetProps) {
  const [notes, setNotes] = useState(client?.notes ?? "")

  useEffect(() => {
    if (client) {
      setNotes(client.notes)
    }
  }, [client])

  if (!client) {
    return null
  }

  const status = statusConfig[client.status]

  const handleSaveNote = () => {
    toast.add({
      type: "success",
      title: "Note saved",
      description: `Notes updated for ${client.name}.`,
    })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen)
        if (nextOpen) {
          setNotes(client.notes)
        }
      }}
    >
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-[360px]">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-heading text-[15px] font-semibold">
            Client Profile
          </SheetTitle>
          <SheetDescription className="sr-only">
            Details and interaction history for {client.name}
          </SheetDescription>
        </SheetHeader>

        <div className="border-b border-border px-5 py-5">
          <div className="mb-3.5 flex items-center gap-3">
            <Avatar className="size-[52px]">
              <AvatarFallback
                className={cn(
                  "text-lg font-bold text-white",
                  getAvatarColor(client.name)
                )}
              >
                {client.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-heading text-[17px] font-bold text-foreground">
                {client.name}
              </h3>
              <Badge
                variant="secondary"
                className={cn("mt-1 text-[11px] font-semibold", status.className)}
              >
                {status.label}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { icon: Phone, value: client.phone },
              { icon: Mail, value: client.email },
              {
                icon: Building2,
                value: `${client.propertyType} · ${client.location}`,
              },
              { icon: ChevronDown, value: `Budget: ${client.budget}` },
            ].map((row) => (
              <div key={row.value} className="flex items-center gap-2">
                <row.icon className="size-3.5 shrink-0 text-accent" />
                <span className="text-xs text-foreground/80">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-3.5 rounded-md border border-border bg-muted/40 px-3 py-2.5">
            <div className="mb-1 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
              Interested In
            </div>
            <p className="text-[13px] text-foreground">
              {client.propertyInterest}
            </p>
            {client.dealValue && (
              <p className="mt-1 text-xs text-muted-foreground">
                Deal value: {client.dealValue}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 border-b border-border px-5 py-3.5">
          <Button size="sm" className="flex-1 gap-1.5 text-xs">
            <Phone className="size-3" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs">
            <Mail className="size-3" />
            Email
          </Button>
          <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs">
            <Edit2 className="size-3" />
            Edit
          </Button>
        </div>

        <div className="px-5 py-4">
          <h4 className="mb-3.5 text-xs font-bold tracking-wider text-foreground/70 uppercase">
            Interaction History
          </h4>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[11px] w-px bg-border" />
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={item.date} className="relative flex gap-3.5">
                  <div
                    className={cn(
                      "relative z-10 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2",
                      index === 0
                        ? "border-accent bg-accent"
                        : "border-border bg-muted"
                    )}
                  >
                    {index === 0 && (
                      <div className="size-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs leading-relaxed text-foreground/80">
                      {item.action}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-border px-5 py-4">
          <Label
            htmlFor="client-notes"
            className="mb-2 text-xs font-bold tracking-wider text-foreground/70 uppercase"
          >
            Notes
          </Label>
          <Textarea
            id="client-notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="text-xs"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={handleSaveNote}
          >
            Save Note
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { statusConfig, getAvatarColor }
