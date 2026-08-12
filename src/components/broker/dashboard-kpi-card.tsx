import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface DashboardKpiCardProps {
  label: string
  value: string
  sub: string
  trend: number
  icon: LucideIcon
  accent?: boolean
}

export function DashboardKpiCard({
  label,
  value,
  sub,
  trend,
  icon: Icon,
  accent = false,
}: DashboardKpiCardProps) {
  const positive = trend >= 0

  return (
    <Card
      className={cn(
        "flex-1 gap-0 py-0",
        accent && "border-transparent bg-primary text-primary-foreground"
      )}
    >
      <CardContent className="px-5 py-5">
        <div className="mb-3.5 flex items-start justify-between">
          <span
            className={cn(
              "text-[11px] font-bold tracking-wider uppercase",
              accent ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-lg text-accent",
              accent ? "bg-accent/18" : "bg-accent/10"
            )}
          >
            <Icon className="size-4" />
          </div>
        </div>
        <div
          className={cn(
            "font-heading mb-1.5 text-[32px] leading-none font-bold",
            accent ? "text-white" : "text-foreground"
          )}
        >
          {value}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "flex items-center gap-0.5 text-[11px] font-bold",
              positive ? "text-success" : "text-destructive"
            )}
          >
            {positive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {Math.abs(trend)}%
          </span>
          <span
            className={cn(
              "text-[11px]",
              accent ? "text-white/40" : "text-muted-foreground"
            )}
          >
            {sub}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
