"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2 } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/listings" },
  { label: "Contact", href: "/contact" },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/7 bg-primary/92 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-accent">
            <Building2 className="size-[18px] text-primary" />
          </div>
          <div>
            <div className="font-heading text-base leading-tight font-bold text-white">
              Vyas
            </div>
            <div className="text-[9px] font-semibold tracking-[0.12em] text-white/45 uppercase">
              Real Estate
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-9">
          {navLinks.map(({ label, href }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "border-b pb-0.5 text-sm transition-colors",
                  active
                    ? "border-accent font-semibold text-accent"
                    : "border-transparent font-normal text-white/70 hover:text-white/90"
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal"
            className="text-[13px] font-medium text-white/70 transition-colors hover:text-white/90"
          >
            My Portal
          </Link>
          <Link
            href="/dashboard"
            className="text-[13px] font-medium text-white/70 transition-colors hover:text-white/90"
          >
            Dashboard
          </Link>
          <Link href="/listings" className={buttonVariants({ size: "sm" })}>
            Browse
          </Link>
        </div>
      </div>
    </header>
  )
}
