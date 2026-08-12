"use client"

import { useMemo, useState } from "react"
import {
  Building2,
  Download,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
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
import { toast } from "@/components/ui/toast"
import { properties } from "@/data/properties"
import { transactionTypeClass } from "@/lib/status-styles"
import {
  monthlyRevenueTrend,
  revenueByPropertyType,
  revenueSummary,
  transactions,
} from "@/data/revenue"
import { cn } from "@/lib/utils"
import type { Transaction, TransactionStatus, TransactionType } from "@/types"

const RANGE_OPTIONS = [
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "This year",
  "Custom",
] as const

const PROPERTY_TYPE_OPTIONS = ["Flat", "Villa", "Shop", "Plot", "Studio"] as const

const RANGE_MONTH_COUNT: Record<(typeof RANGE_OPTIONS)[number], number> = {
  "Last 7 days": 2,
  "Last 30 days": 3,
  "Last 3 months": 4,
  "This year": monthlyRevenueTrend.length,
  Custom: monthlyRevenueTrend.length,
}

const trendChartConfig = {
  current: {
    label: "Current",
    color: "var(--accent)",
  },
  prev: {
    label: "Previous",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig

const typeChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--accent)",
  },
} satisfies ChartConfig

const KPI_STATS = [
  {
    icon: IndianRupee,
    label: "Total Revenue",
    value: revenueSummary.totalRevenue,
    change: revenueSummary.revenueChange,
    positive: true,
  },
  {
    icon: Building2,
    label: "Transactions",
    value: String(revenueSummary.transactionCount),
    change: revenueSummary.transactionChange,
    positive: true,
  },
  {
    icon: Users,
    label: "Active Clients",
    value: String(revenueSummary.activeClients),
    change: revenueSummary.activeClientsChange,
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Avg. Commission",
    value: revenueSummary.avgCommission,
    change: revenueSummary.avgCommissionChange,
    positive: false,
  },
] as const

function getTransactionPropertyType(propertyName: string) {
  const normalized = propertyName.toLowerCase()
  const match = properties.find((property) => {
    const titlePart = property.title.split("—")[0]?.trim().toLowerCase() ?? ""
    return normalized.includes(titlePart) || titlePart.includes(normalized.split(" ")[0] ?? "")
  })
  return match?.type ?? null
}

function typeBadgeClass(type: TransactionType) {
  return transactionTypeClass[type]
}

function statusBadgeClass(status: TransactionStatus) {
  return status === "settled"
    ? "bg-success-bg text-success"
    : "bg-warning-bg text-warning"
}

export default function RevenuePage() {
  const [range, setRange] =
    useState<(typeof RANGE_OPTIONS)[number]>("Last 3 months")
  const [propertyType, setPropertyType] = useState<string>("all")
  const [page, setPage] = useState(1)

  const trendData = useMemo(() => {
    const sliceCount = RANGE_MONTH_COUNT[range]
    const sliced = monthlyRevenueTrend.slice(-sliceCount)

    return sliced.map((item, index, array) => ({
      month: item.month,
      current: item.revenue,
      prev:
        index > 0
          ? array[index - 1]!.revenue
          : Math.max(0, Math.round(item.revenue * 0.85)),
    }))
  }, [range])

  const filteredTransactions = useMemo(() => {
    if (propertyType === "all") return transactions
    return transactions.filter(
      (transaction) => getTransactionPropertyType(transaction.property) === propertyType
    )
  }, [propertyType])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleExport = (format: "PDF" | "Excel") => {
    toast.add({
      title: `Export ${format}`,
      description: "Export will be available in a future update.",
      type: "info",
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {RANGE_OPTIONS.map((option) => (
            <Button
              key={option}
              type="button"
              size="sm"
              variant={range === option ? "default" : "outline"}
              className={cn(
                "h-8 text-xs font-semibold",
                range === option &&
                  "border-accent bg-accent/10 text-accent hover:bg-accent/15"
              )}
              onClick={() => setRange(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Select
            value={propertyType}
            onValueChange={(value) => {
              setPropertyType(value ?? "all")
              setPage(1)
            }}
          >
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {PROPERTY_TYPE_OPTIONS.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={() => handleExport("PDF")}
          >
            <Download className="size-3.5" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={() => handleExport("Excel")}
          >
            <Download className="size-3.5" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_STATS.map((stat) => (
          <Card key={stat.label} className="gap-0 py-0">
            <CardContent className="px-5 py-4.5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <stat.icon className="size-4" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-bold",
                    stat.positive ? "text-success" : "text-destructive"
                  )}
                >
                  {stat.positive ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="font-heading mb-1 text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="gap-0 py-0">
          <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border px-5 py-4">
            <CardTitle className="section-title-sm">
              Revenue Trend
            </CardTitle>
            <div className="flex gap-4">
              {[
                { label: "Current", className: "bg-accent" },
                { label: "Previous", className: "bg-muted-foreground/40" },
              ].map((legend) => (
                <div key={legend.label} className="flex items-center gap-1.5">
                  <span
                    className={cn("h-0.5 w-2.5 rounded-full", legend.className)}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {legend.label}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4 pt-2">
            <ChartContainer
              config={trendChartConfig}
              className="aspect-auto h-[220px] w-full"
            >
              <AreaChart
                data={trendData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-current)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-current)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenuePrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-prev)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="var(--color-prev)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                      formatter={(value, name) => [
                        `₹${value}L`,
                        name === "current" ? "Current" : "Previous",
                      ]}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="prev"
                  stroke="var(--color-prev)"
                  strokeWidth={2}
                  fill="url(#revenuePrev)"
                />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="var(--color-current)"
                  strokeWidth={2.5}
                  fill="url(#revenueCurrent)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border px-5 py-4">
            <CardTitle className="section-title-sm">
              By Property Type
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4 pt-2">
            <ChartContainer
              config={typeChartConfig}
              className="aspect-auto h-[220px] w-full"
            >
              <BarChart
                data={revenueByPropertyType}
                layout="vertical"
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                barSize={14}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `₹${value}L`}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  tickLine={false}
                  axisLine={false}
                  width={52}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`₹${value}L`, "Revenue"]}
                    />
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border px-5 py-3.5">
          <CardTitle className="font-heading text-base font-semibold">
            Transactions
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {filteredTransactions.length} records
          </span>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  TXN ID
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Property
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Client
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Type
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Date
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Amount
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Commission
                </TableHead>
                <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-xs font-semibold">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                    {transaction.property}
                  </TableCell>
                  <TableCell className="text-xs">{transaction.client}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full text-[11px] font-semibold",
                        typeBadgeClass(transaction.type)
                      )}
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="font-heading text-sm font-bold">
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="text-[13px] font-semibold text-accent">
                    {transaction.commission}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full text-[11px] font-bold capitalize",
                        statusBadgeClass(transaction.status)
                      )}
                    >
                      {transaction.status === "settled" ? "Settled" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="flex flex-col gap-3 border-t border-border px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {paginatedTransactions.length} of {filteredTransactions.length}{" "}
            transactions
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className={cn(
                    "size-7.5 text-xs",
                    currentPage === pageNumber &&
                      "border-accent bg-accent/10 font-bold text-accent"
                  )}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
