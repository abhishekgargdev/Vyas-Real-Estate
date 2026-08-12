"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Clock,
  Download,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import { DashboardKpiCard } from "@/components/broker/dashboard-kpi-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { clients } from "@/data/clients"
import { properties } from "@/data/properties"
import {
  monthlyRevenueTrend,
  revenueSummary,
} from "@/data/revenue"
import { visits } from "@/data/visits"
import {
  clientStatusShortLabels,
  clientStatusStyles,
  getAvatarColor,
} from "@/lib/status-styles"
import { cn } from "@/lib/utils"
import type { PropertyStatus } from "@/types"

const performanceChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--accent)",
  },
  leads: {
    label: "Leads",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const statusChartColors: Record<PropertyStatus, string> = {
  ready: "var(--success)",
  "under-construction": "var(--warning)",
  "new-launch": "var(--accent)",
  sold: "var(--destructive)",
}

const statusChartLabels: Record<PropertyStatus, string> = {
  ready: "Ready to Move",
  "under-construction": "Under Construction",
  "new-launch": "New Launch",
  sold: "Sold Out",
}

function getPropertyStatusDistribution() {
  const counts: Record<PropertyStatus, number> = {
    ready: 0,
    "under-construction": 0,
    "new-launch": 0,
    sold: 0,
  }

  for (const property of properties) {
    counts[property.status] += 1
  }

  const total = properties.length

  return (Object.keys(counts) as PropertyStatus[])
    .map((status) => ({
      name: statusChartLabels[status],
      value: total > 0 ? Math.round((counts[status] / total) * 100) : 0,
      status,
      count: counts[status],
    }))
    .filter((item) => item.count > 0)
}

const activeLeadCount = clients.filter(
  (client) => client.status !== "closed" && client.status !== "lost"
).length

const scheduledVisitCount = visits.filter(
  (visit) => visit.status === "pending" || visit.status === "upcoming"
).length

const recentLeads = clients.slice(0, 6)

const upcomingVisits = visits
  .filter((visit) => visit.status !== "completed" && visit.status !== "cancelled")
  .slice(0, 4)

const latestMonthRevenue =
  monthlyRevenueTrend[monthlyRevenueTrend.length - 1]?.revenue ?? 0

const quickStats = [
  {
    label: "Avg. Commission",
    value: revenueSummary.avgCommission,
    icon: TrendingUp,
    trend: revenueSummary.avgCommissionChange,
  },
  {
    label: "Conversion Rate",
    value: "23.4%",
    icon: Check,
    trend: "+2.1pp",
  },
  {
    label: "Active Clients",
    value: String(revenueSummary.activeClients),
    icon: Clock,
    trend: revenueSummary.activeClientsChange,
  },
  {
    label: "Period Revenue",
    value: revenueSummary.totalRevenue,
    icon: Star,
    trend: revenueSummary.revenueChange,
  },
] as const

export default function DashboardPage() {
  const [chartTab, setChartTab] = useState<"revenue" | "leads">("revenue")
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())

  const statusDistribution = useMemo(
    () => getPropertyStatusDistribution(),
    []
  )

  const allSelected =
    recentLeads.length > 0 &&
    recentLeads.every((lead) => selectedLeads.has(lead.id))

  const toggleLead = (id: string) => {
    setSelectedLeads((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleAllLeads = (checked: boolean) => {
    setSelectedLeads(
      checked ? new Set(recentLeads.map((lead) => lead.id)) : new Set()
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DashboardKpiCard
          label="Total Properties"
          value={String(properties.length)}
          sub="in portfolio"
          trend={12}
          icon={Building2}
          accent
        />
        <DashboardKpiCard
          label="Active Leads"
          value={String(activeLeadCount)}
          sub="vs last month"
          trend={8}
          icon={Users}
        />
        <DashboardKpiCard
          label="Scheduled Visits"
          value={String(scheduledVisitCount)}
          sub="this week"
          trend={22}
          icon={Calendar}
        />
        <DashboardKpiCard
          label="Monthly Revenue"
          value={`₹${latestMonthRevenue} L`}
          sub="vs last month"
          trend={-3}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        <Card className="gap-0 py-0">
          <CardHeader className="flex-row items-start justify-between space-y-0 border-b border-border px-6 py-5">
            <div>
              <CardTitle className="section-title">
                Performance Overview
              </CardTitle>
              <p className="text-[11px] text-muted-foreground">
                Jan – Aug 2026
              </p>
            </div>
            <div className="flex gap-1.5">
              {(["revenue", "leads"] as const).map((tab) => (
                <Button
                  key={tab}
                  type="button"
                  size="sm"
                  variant={chartTab === tab ? "default" : "outline"}
                  className={cn(
                    "h-7 text-xs font-semibold",
                    chartTab === tab && "bg-accent/10 text-accent-foreground hover:bg-accent/15"
                  )}
                  onClick={() => setChartTab(tab)}
                >
                  {tab === "revenue" ? "Revenue" : "Leads"}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ChartContainer
              config={performanceChartConfig}
              className="aspect-auto h-[220px] w-full"
            >
              {chartTab === "revenue" ? (
                <BarChart
                  data={monthlyRevenueTrend}
                  barCategoryGap="30%"
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `₹${value}L`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) =>
                          name === "revenue"
                            ? [`₹${value}L`, "Revenue"]
                            : [value, "Leads"]
                        }
                      />
                    }
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--color-revenue)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              ) : (
                <LineChart
                  data={monthlyRevenueTrend}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="var(--color-leads)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-leads)", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border px-6 py-5">
            <CardTitle className="section-title">
              Property Status
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              {properties.length} total listings
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <ChartContainer
              config={{}}
              className="mx-auto aspect-square h-[160px] w-full max-w-[200px]"
            >
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusDistribution.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={statusChartColors[entry.status]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const item = payload[0]?.payload as (typeof statusDistribution)[number]
                    return (
                      <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-sm">
                        <strong>{item.name}</strong>: {item.value}%
                      </div>
                    )
                  }}
                />
              </PieChart>
            </ChartContainer>
            <div className="mt-2 space-y-2">
              {statusDistribution.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2.5 rounded-sm"
                      style={{
                        backgroundColor: statusChartColors[item.status],
                      }}
                    />
                    <span className="text-xs text-foreground/80">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border px-5 py-4">
            <CardTitle className="section-title">
              Recent Leads
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
                <Filter className="size-3" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
                <Download className="size-3" />
                Export
              </Button>
              <Button size="sm" className="h-7 gap-1.5 text-xs font-bold">
                <Plus className="size-3" />
                Add Lead
              </Button>
            </div>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-10 px-3.5">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) =>
                      toggleAllLeads(checked === true)
                    }
                    aria-label="Select all leads"
                  />
                </TableHead>
                <TableHead className="px-3.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Client
                </TableHead>
                <TableHead className="px-3.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Property
                </TableHead>
                <TableHead className="px-3.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Value
                </TableHead>
                <TableHead className="px-3.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Status
                </TableHead>
                <TableHead className="px-3.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Visit Date
                </TableHead>
                <TableHead className="w-28 px-3.5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => {
                const status = clientStatusStyles[lead.status]
                const selected = selectedLeads.has(lead.id)

                return (
                  <TableRow
                    key={lead.id}
                    data-state={selected ? "selected" : undefined}
                    className={cn(selected && "bg-accent/5")}
                  >
                    <TableCell className="px-3.5 py-2.5">
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleLead(lead.id)}
                        aria-label={`Select ${lead.name}`}
                      />
                    </TableCell>
                    <TableCell className="px-3.5 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-[30px]">
                          <AvatarFallback
                            className={cn(
                              "text-[10px] font-bold text-white",
                              getAvatarColor(lead.name)
                            )}
                          >
                            {lead.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[13px] font-medium text-foreground">
                          {lead.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[180px] px-3.5 py-2.5 text-xs text-foreground/80">
                      <span className="block truncate">
                        {lead.propertyInterest}
                      </span>
                    </TableCell>
                    <TableCell className="px-3.5 py-2.5 text-xs font-semibold text-foreground">
                      {lead.dealValue ?? lead.budget}
                    </TableCell>
                    <TableCell className="px-3.5 py-2.5">
                      <Badge
                        variant="secondary"
                        className={cn("text-[11px] font-semibold", status.className)}
                      >
                        {clientStatusShortLabels[lead.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3.5 py-2.5 text-xs text-muted-foreground">
                      {lead.visitDate}
                    </TableCell>
                    <TableCell className="px-3.5 py-2.5">
                      <div className="flex gap-1.5">
                        <Button
                          variant="outline"
                          size="icon-xs"
                          className="size-7"
                          aria-label={`View ${lead.name}`}
                        >
                          <Eye className="size-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          className="size-7"
                          aria-label={`Call ${lead.name}`}
                        >
                          <Phone className="size-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          className="size-7"
                          aria-label="More actions"
                        >
                          <MoreHorizontal className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t border-border px-5 py-2.5">
            <span className="text-xs text-muted-foreground">
              Showing {recentLeads.length} of {clients.length} leads
            </span>
            <Link
              href="/clients"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-foreground hover:underline"
            >
              View all leads
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col gap-0 py-0">
          <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border px-5 py-4">
            <CardTitle className="section-title">
              Upcoming Visits
            </CardTitle>
            <Button variant="outline" size="icon-xs" className="size-7">
              <Plus className="size-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 space-y-0 px-4 py-2">
            {upcomingVisits.map((visit, index) => (
              <div
                key={visit.id}
                className={cn(
                  "py-3",
                  index < upcomingVisits.length - 1 && "border-b border-border"
                )}
              >
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <div className="flex gap-2.5">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg text-[9px] font-bold uppercase leading-none",
                        index < 2
                          ? "bg-accent text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {visit.date.split(" ")[0]}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-foreground">
                        {visit.client}
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {visit.property}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "shrink-0 text-[10px] font-bold",
                      visit.confirmed
                        ? "bg-success-bg text-success"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {visit.confirmed ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
                <div className="flex gap-3.5 pl-11">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="size-3" />
                    {visit.time}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="size-3" />
                    {visit.location?.split(",")[0]}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-t border-border p-4">
            <Button
              variant="outline"
              className="w-full gap-1.5 text-xs font-semibold"
              nativeButton={false}
              render={<Link href="/visit-calendar" />}
            >
              <Calendar className="size-3.5" />
              Open Full Calendar
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="gap-0 py-0">
            <CardContent className="flex items-center gap-3.5 px-4 py-4">
              <div className="flex size-[38px] shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <stat.icon className="size-3.5" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {stat.label}
                </div>
                <div className="shell-title font-bold">
                  {stat.value}
                </div>
                <div className="text-[10px] font-semibold text-success">
                  {stat.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
