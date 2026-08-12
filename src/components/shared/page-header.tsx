import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("mb-7", className)}>
      <h1 className="page-title">{title}</h1>
      {description ? <p className="page-subtitle">{description}</p> : null}
    </div>
  )
}

export function SectionHeading({
  title,
  action,
  className,
}: {
  title: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("mb-3.5 flex items-center justify-between gap-3", className)}
    >
      <h2 className="section-title">{title}</h2>
      {action}
    </div>
  )
}
