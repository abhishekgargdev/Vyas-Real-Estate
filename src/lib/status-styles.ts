import type {
  ClientStatus,
  PropertyStatus,
  TransactionType,
  VisitType,
} from "@/types"

export type StatusStyle = {
  label: string
  className: string
}

export const clientStatusStyles: Record<ClientStatus, StatusStyle> = {
  new: {
    label: "New Inquiry",
    className: "bg-muted text-foreground",
  },
  contacted: {
    label: "Contacted",
    className: "bg-secondary text-primary",
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

export const clientStatusShortLabels: Record<ClientStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "visit-scheduled": "Visit Scheduled",
  negotiation: "Negotiation",
  closed: "Closed",
  lost: "Lost",
}

export const clientStatusDotClass: Record<ClientStatus, string> = {
  new: "bg-primary",
  contacted: "bg-primary/70",
  "visit-scheduled": "bg-accent",
  negotiation: "bg-warning",
  closed: "bg-success",
  lost: "bg-muted-foreground",
}

export const propertyStatusStyles: Record<PropertyStatus, StatusStyle> = {
  ready: {
    label: "Ready",
    className: "bg-success-bg text-success",
  },
  "under-construction": {
    label: "Under Construction",
    className: "bg-warning-bg text-warning",
  },
  "new-launch": {
    label: "New Launch",
    className: "bg-accent/15 text-accent-foreground",
  },
  sold: {
    label: "Sold",
    className: "bg-muted text-muted-foreground",
  },
}

export const visitTypePillClass: Record<VisitType, string> = {
  "site-visit": "bg-accent text-accent-foreground",
  "follow-up": "bg-primary/15 text-primary",
  handover: "bg-success text-success-foreground",
}

export const visitTypeDotClass: Record<VisitType, string> = {
  "site-visit": "bg-accent",
  "follow-up": "bg-primary/70",
  handover: "bg-success",
}

export const visitTypeTextClass: Record<VisitType, string> = {
  "site-visit": "text-accent",
  "follow-up": "text-primary",
  handover: "text-success",
}

export const transactionTypeClass: Record<TransactionType, string> = {
  Sale: "bg-secondary text-primary",
  Rental: "bg-accent/15 text-accent-foreground",
}

export const AVATAR_BG_CLASSES = [
  "bg-primary",
  "bg-primary/90",
  "bg-primary/80",
  "bg-primary/70",
  "bg-primary/60",
  "bg-primary/50",
] as const

export function getAvatarColor(name: string) {
  return AVATAR_BG_CLASSES[name.charCodeAt(0) % AVATAR_BG_CLASSES.length]
}
