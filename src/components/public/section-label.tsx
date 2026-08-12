import { cn } from "@/lib/utils"

export function GoldDivider({ center }: { center?: boolean }) {
  return (
    <div
      className={cn(
        "mb-2.5 flex items-center gap-2",
        center ? "justify-center" : "justify-start"
      )}
    >
      <div className="h-0.5 w-7 bg-accent" />
      <div className="size-1.5 rounded-full bg-accent" />
    </div>
  )
}

export function SectionLabel({
  children,
  center,
}: {
  children: string
  center?: boolean
}) {
  return (
    <div className="mb-2.5">
      <GoldDivider center={center} />
      <span className="text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
        {children}
      </span>
    </div>
  )
}
