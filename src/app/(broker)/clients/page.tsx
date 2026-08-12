"use client"

import { useMemo, useState } from "react"
import {
  ChevronDown,
  Clock,
  Edit2,
  LayoutGrid,
  List,
  Phone,
  Plus,
} from "lucide-react"

import {
  ClientDetailSheet,
  getAvatarColor,
  statusConfig,
} from "@/components/broker/client-detail-sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { clients as initialClients } from "@/data/clients"
import { cn } from "@/lib/utils"
import type { Client, ClientStatus } from "@/types"

const KANBAN_COLUMNS: {
  status: ClientStatus
  label: string
  dotClass: string
  columnClass: string
}[] = [
  {
    status: "new",
    label: "New Inquiry",
    dotClass: "bg-purple-600",
    columnClass: "bg-background",
  },
  {
    status: "contacted",
    label: "Contacted",
    dotClass: "bg-blue-600",
    columnClass: "bg-background",
  },
  {
    status: "visit-scheduled",
    label: "Visit Scheduled",
    dotClass: "bg-accent",
    columnClass: "bg-background",
  },
  {
    status: "negotiation",
    label: "Negotiation",
    dotClass: "bg-warning",
    columnClass: "bg-background",
  },
  {
    status: "closed",
    label: "Closed",
    dotClass: "bg-success",
    columnClass: "bg-success-bg/30",
  },
  {
    status: "lost",
    label: "Lost",
    dotClass: "bg-muted-foreground",
    columnClass: "bg-muted/40",
  },
]

function KanbanCard({
  client,
  onSelect,
  onMove,
}: {
  client: Client
  onSelect: () => void
  onMove: (status: ClientStatus) => void
}) {
  return (
    <Card
      className="mb-2 cursor-pointer gap-0 py-0 shadow-sm transition-shadow hover:shadow-md"
      onClick={onSelect}
    >
      <CardContent className="px-3.5 py-3">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-[30px]">
              <AvatarFallback
                className={cn(
                  "text-[10px] font-bold text-white",
                  getAvatarColor(client.name)
                )}
              >
                {client.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-[13px] font-semibold text-foreground">
                {client.name}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {client.location}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex size-[22px] items-center justify-center rounded border-0 bg-transparent hover:bg-muted"
              onClick={(event) => event.stopPropagation()}
            >
              <ChevronDown className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {KANBAN_COLUMNS.filter(
                (column) => column.status !== client.status
              ).map((column) => (
                <DropdownMenuItem
                  key={column.status}
                  onClick={(event) => {
                    event.stopPropagation()
                    onMove(column.status)
                  }}
                >
                  → {column.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="mb-1.5 truncate text-[11px] text-foreground/80">
          {client.propertyInterest}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-accent-foreground">
            {client.budget}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            className="size-6 rounded-full"
            onClick={(event) => event.stopPropagation()}
            aria-label={`Call ${client.name}`}
          >
            <Phone className="size-2.5" />
          </Button>
        </div>

        {client.visitDate !== "—" && (
          <div className="mt-2 flex items-center gap-1 border-t border-border pt-2">
            <Clock className="size-2.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">
              Visit: {client.visitDate}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ClientsPage() {
  const [leads, setLeads] = useState<Client[]>(initialClients)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [view, setView] = useState("kanban")
  const [addForm, setAddForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    budget: "",
    location: "",
    notes: "",
  })

  const openClient = (client: Client) => {
    setSelectedClient(client)
    setSheetOpen(true)
  }

  const moveCard = (id: string, status: ClientStatus) => {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    )
    setSelectedClient((current) =>
      current?.id === id ? { ...current, status } : current
    )
  }

  const columnLeads = useMemo(() => {
    return KANBAN_COLUMNS.reduce(
      (acc, column) => {
        acc[column.status] = leads.filter(
          (lead) => lead.status === column.status
        )
        return acc
      },
      {} as Record<ClientStatus, Client[]>
    )
  }, [leads])

  const handleAddClient = () => {
    setAddOpen(false)
    setAddForm({
      name: "",
      phone: "",
      email: "",
      type: "",
      budget: "",
      location: "",
      notes: "",
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <Tabs value={view} onValueChange={setView} className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <TabsList>
              <TabsTrigger value="kanban" className="gap-1.5 text-xs">
                <LayoutGrid className="size-3.5" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="table" className="gap-1.5 text-xs">
                <List className="size-3.5" />
                Table
              </TabsTrigger>
            </TabsList>
            <span className="text-xs text-muted-foreground">
              {leads.length} total leads
            </span>
          </div>

          <Button
            size="sm"
            className="h-8 gap-1.5 text-xs font-bold"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="size-3.5" />
            Add Client
          </Button>
        </div>

        <TabsContent value="kanban" className="mt-0">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {KANBAN_COLUMNS.map((column) => {
              const items = columnLeads[column.status]

              return (
                <div key={column.status} className="w-[230px] shrink-0">
                  <div className="mb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn("size-2 rounded-full", column.dotClass)}
                      />
                      <span className="text-xs font-bold text-foreground">
                        {column.label}
                      </span>
                    </div>
                    <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
                      {items.length}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "min-h-[120px] rounded-lg border border-border p-2",
                      column.columnClass
                    )}
                  >
                    {items.map((client) => (
                      <KanbanCard
                        key={client.id}
                        client={client}
                        onSelect={() => openClient(client)}
                        onMove={(status) => moveCard(client.id, status)}
                      />
                    ))}
                    {items.length === 0 && (
                      <p className="py-5 text-center text-[11px] text-muted-foreground">
                        No leads
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <Card className="gap-0 overflow-hidden py-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  {[
                    "Client",
                    "Phone",
                    "Interested In",
                    "Budget",
                    "Assigned Property",
                    "Visit Date",
                    "Status",
                    "Last Contact",
                    "",
                  ].map((heading) => (
                    <TableHead
                      key={heading}
                      className="px-3.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                    >
                      {heading}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((client, index) => {
                  const status = statusConfig[client.status]

                  return (
                    <TableRow
                      key={client.id}
                      className={cn(
                        "cursor-pointer",
                        index % 2 === 1 && "bg-muted/20"
                      )}
                      onClick={() => openClient(client)}
                    >
                      <TableCell className="px-3.5 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7">
                            <AvatarFallback
                              className={cn(
                                "text-[10px] font-bold text-white",
                                getAvatarColor(client.name)
                              )}
                            >
                              {client.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[13px] font-medium text-foreground">
                            {client.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5 text-xs text-foreground/80">
                        {client.phone}
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5">
                        <Badge
                          variant="secondary"
                          className="text-[11px] font-semibold"
                        >
                          {client.propertyType}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5 text-xs font-semibold text-foreground">
                        {client.budget}
                      </TableCell>
                      <TableCell className="max-w-[160px] px-3.5 py-2.5 text-xs text-foreground/80">
                        <span className="block truncate">
                          {client.propertyInterest}
                        </span>
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5 text-xs text-muted-foreground">
                        {client.visitDate}
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[11px] font-semibold",
                            status.className
                          )}
                        >
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5 text-xs text-muted-foreground">
                        {client.lastContact}
                      </TableCell>
                      <TableCell className="px-3.5 py-2.5">
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            className="size-[26px]"
                            onClick={(event) => event.stopPropagation()}
                            aria-label={`Call ${client.name}`}
                          >
                            <Phone className="size-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            className="size-[26px]"
                            onClick={(event) => {
                              event.stopPropagation()
                              openClient(client)
                            }}
                            aria-label={`Edit ${client.name}`}
                          >
                            <Edit2 className="size-3 text-accent" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      <ClientDetailSheet
        client={selectedClient}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) {
            setSelectedClient(null)
          }
        }}
      />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-[520px] gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle className="font-heading text-lg font-bold">
              Add New Client
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3.5 px-6 py-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="add-name">Full Name</Label>
              <Input
                id="add-name"
                value={addForm.name}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="e.g. Priya Mehta"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-phone">Phone</Label>
              <Input
                id="add-phone"
                type="tel"
                value={addForm.phone}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="+91 98210 00000"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                type="email"
                value={addForm.email}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="client@email.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Interested In</Label>
              <Select
                value={addForm.type}
                onValueChange={(value) =>
                  setAddForm((current) => ({ ...current, type: value ?? "" }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Property type..." />
                </SelectTrigger>
                <SelectContent>
                  {["Flat", "Villa", "Shop", "Studio", "Plot"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Budget Range</Label>
              <Select
                value={addForm.budget}
                onValueChange={(value) =>
                  setAddForm((current) => ({ ...current, budget: value ?? "" }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select range..." />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Under ₹50L",
                    "₹50L–₹1Cr",
                    "₹1–2 Cr",
                    "₹2–5 Cr",
                    "Above ₹5 Cr",
                  ].map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Preferred Location</Label>
              <Select
                value={addForm.location}
                onValueChange={(value) =>
                  setAddForm((current) => ({
                    ...current,
                    location: value ?? "",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select city..." />
                </SelectTrigger>
                <SelectContent>
                  {["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad"].map(
                    (city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label htmlFor="add-notes">Notes</Label>
              <Textarea
                id="add-notes"
                rows={2}
                value={addForm.notes}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Requirements, source, special instructions..."
              />
            </div>
          </div>
          <DialogFooter className="border-t border-border px-6 py-4">
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
