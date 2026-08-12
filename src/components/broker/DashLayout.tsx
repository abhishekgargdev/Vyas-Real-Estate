"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getBrokerPageTitle, isBrokerNavActive } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2, badge: "24" },
  { label: "Clients", href: "/clients", icon: Users, badge: "8" },
  { label: "Visits", href: "/visit-calendar", icon: Calendar, badge: "5" },
  { label: "Revenue", href: "/revenue", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
]

const pageTitles: { prefix: string; title: string }[] = [
  { prefix: "/dashboard", title: "Dashboard" },
  { prefix: "/properties/new", title: "Add New Property" },
  { prefix: "/properties", title: "Properties" },
  { prefix: "/clients", title: "Clients" },
  { prefix: "/visit-calendar", title: "Visits" },
  { prefix: "/revenue", title: "Revenue" },
  { prefix: "/settings", title: "Settings" },
]

function BrokerSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-[34px] items-center justify-center rounded-lg bg-accent">
            <Building2 className="size-[17px] text-primary" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="font-heading text-sm leading-tight font-bold text-sidebar-foreground">
              Vyas
            </div>
            <div className="text-[9px] font-semibold tracking-[0.12em] text-sidebar-foreground/40 uppercase">
              Real Estate
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ label, href, icon: Icon, badge }) => {
                const active = isBrokerNavActive(pathname, href)
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={label}
                      render={<Link href={href} />}
                      className={cn(
                        "text-sidebar-foreground/60 [&_svg]:text-sidebar-foreground/45",
                        "data-active:bg-accent/15 data-active:font-semibold data-active:text-sidebar-foreground",
                        "data-active:[&_svg]:text-accent"
                      )}
                    >
                      <Icon className="size-[17px]" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                    {badge ? (
                      <SidebarMenuBadge
                        className={cn(
                          "rounded-full text-[10px] font-bold",
                          active
                            ? "bg-accent text-primary"
                            : "bg-white/8 text-sidebar-foreground/50"
                        )}
                      >
                        {badge}
                      </SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-4 py-3.5">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <Avatar size="sm" className="after:border-white/10">
            <AvatarFallback className="bg-[#2D4A6B] text-xs font-bold text-white">
              AV
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <div className="truncate text-xs font-semibold text-sidebar-foreground">
              Arjun Vyas
            </div>
            <div className="text-[10px] text-sidebar-foreground/40">Admin</div>
          </div>
          <ChevronDown className="size-[13px] text-sidebar-foreground/35 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function BrokerTopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-card px-7">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-[13px] -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-[34px] w-[220px] border-[1.5px] bg-background pl-8 text-xs"
          />
        </div>

        <Button
          variant="outline"
          size="icon-sm"
          className="relative size-[34px] rounded-md"
          aria-label="Notifications"
        >
          <Bell className="size-[15px] text-foreground/80" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full border-2 border-card bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-muted/50">
            <Avatar size="sm" className="size-7">
              <AvatarFallback className="bg-[#2D4A6B] text-[11px] font-bold text-white">
                AV
              </AvatarFallback>
            </Avatar>
            <span className="text-[13px] font-medium text-foreground">
              Arjun Vyas
            </span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/settings" />}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export function DashLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = getBrokerPageTitle(pathname, pageTitles)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "14rem",
        } as React.CSSProperties
      }
    >
      <BrokerSidebar />
      <SidebarInset className="min-h-svh bg-background">
        <BrokerTopBar title={title} />
        <div className="flex-1 overflow-y-auto px-7 py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
