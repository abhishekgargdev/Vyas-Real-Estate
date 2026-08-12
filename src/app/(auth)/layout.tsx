import Link from "next/link"
import { Building2 } from "lucide-react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
          <Building2 className="size-5 text-accent" />
        </div>
        <div>
          <div className="font-heading text-lg font-bold text-foreground">
            Vyas Real Estate
          </div>
          <div className="text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            Verified · Trusted · Transparent
          </div>
        </div>
      </Link>
      {children}
    </div>
  )
}
