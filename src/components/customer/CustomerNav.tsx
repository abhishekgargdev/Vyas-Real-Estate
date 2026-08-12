"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Heart,
  Home,
  Search,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CURRENT_CUSTOMER_NAME, getCurrentCustomer } from "@/data/customer"
import { isCustomerNavActive } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal", icon: Home },
  { label: "Browse Properties", href: "/listings", icon: Search },
  { label: "Saved", href: "/saved", icon: Heart },
  { label: "My Visits", href: "/visits", icon: Calendar },
  { label: "Profile", href: "/portal#preferences", icon: BookOpen },
] as const

function useLocationHash() {
  const pathname = usePathname()
  const [hash, setHash] = useState("")

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    updateHash()
    window.addEventListener("hashchange", updateHash)
    return () => window.removeEventListener("hashchange", updateHash)
  }, [pathname])

  return hash
}

export function CustomerNav() {
  const pathname = usePathname()
  const hash = useLocationHash()
  const customer = getCurrentCustomer()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-6 lg:px-8">
        <Link href="/" className="mr-6 flex shrink-0 items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="size-4 text-accent" />
          </div>
          <span className="font-heading text-base font-bold text-foreground">
            Vyas Realty
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isCustomerNavActive(pathname, item.href, hash)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] transition-colors",
                  active
                    ? "bg-accent/10 font-semibold text-accent"
                    : "font-normal text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "size-4",
                    active ? "text-accent" : "text-muted-foreground"
                  )}
                />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="relative size-9.5"
            aria-label="Notifications"
          >
            <Bell className="size-4 text-muted-foreground" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full border border-background bg-accent" />
          </Button>
          <div className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-1.5">
            <Avatar className="size-7">
              <AvatarFallback className="bg-primary text-[11px] font-bold text-primary-foreground">
                {customer.initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-[13px] font-medium text-foreground sm:inline">
              {CURRENT_CUSTOMER_NAME}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
