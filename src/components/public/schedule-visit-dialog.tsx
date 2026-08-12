"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import type { Property } from "@/types"

interface ScheduleVisitDialogProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
  brokerName?: string
}

export function ScheduleVisitDialog({
  property,
  open,
  onOpenChange,
  brokerName = "Meera Krishnan",
}: ScheduleVisitDialogProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  })

  const resetForm = () => {
    setForm({ name: "", phone: "", date: "", message: "" })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onOpenChange(false)
    resetForm()
    toast.add({
      type: "success",
      title: "Visit Booked!",
      description: `Your broker ${brokerName} will confirm within 2 hours.`,
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen)
        if (!nextOpen) {
          resetForm()
        }
      }}
    >
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[480px]">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="font-heading text-xl font-bold">
            Book a Site Visit
          </DialogTitle>
          <DialogDescription>
            {property.title}, {property.location}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="mb-5 space-y-3.5">
            <div className="space-y-1.5">
              <Label
                htmlFor="visit-name"
                className="text-[11px] font-bold tracking-wider text-foreground/80 uppercase"
              >
                Your Name
              </Label>
              <Input
                id="visit-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="e.g. Priya Mehta"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="visit-phone"
                className="text-[11px] font-bold tracking-wider text-foreground/80 uppercase"
              >
                Phone Number
              </Label>
              <Input
                id="visit-phone"
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="+91 98210 00000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="visit-date"
                className="text-[11px] font-bold tracking-wider text-foreground/80 uppercase"
              >
                Preferred Date
              </Label>
              <Input
                id="visit-date"
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="visit-message"
                className="text-[11px] font-bold tracking-wider text-foreground/80 uppercase"
              >
                Message (optional)
              </Label>
              <Textarea
                id="visit-message"
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                placeholder="Any specific questions or requirements..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-0 border-0 bg-transparent p-0 sm:flex-col">
            <Button type="submit" className="w-full gap-2 py-3 text-sm font-bold">
              <Calendar className="size-4" />
              Confirm Visit Request
            </Button>
            <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
              No spam. Your contact is shared only with the assigned broker.
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
