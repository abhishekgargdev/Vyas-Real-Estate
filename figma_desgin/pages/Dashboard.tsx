import { useState } from "react"
import {
  LayoutDashboard, Building2, Users, Calendar, BarChart3,
  Settings, Bell, Search, ChevronDown, TrendingUp, TrendingDown,
  MoreHorizontal, Eye, Phone, Plus, ArrowRight, Check,
  Clock, MapPin, Filter, Download, Star,
} from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts"
import type { Page } from "../shared"

// ── TOKENS ────────────────────────────────────────────────────────────────────
const D = {
  sidebar: "#0F172A",
  sidebarHover: "rgba(255,255,255,0.06)",
  sidebarActive: "rgba(212,161,94,0.14)",
  bg: "#F8F7F4",
  white: "#FFFFFF",
  navy: "#0F172A",
  navyMid: "#334155",
  gold: "#D4A15E",
  goldDark: "#B8843A",
  border: "#E2E2E2",
  muted: "#94A3B8",
  cream: "#F8F7F4",
  creamDark: "#F0EEE9",
  success: "#16A34A",
  successBg: "#DCFCE7",
  alert: "#DC2626",
  alertBg: "#FEE2E2",
  warning: "#D97706",
  warningBg: "#FEF3C7",
  purple: "#7C3AED",
  purpleBg: "#F3E8FF",
}

// ── CHART DATA ────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", revenue: 28, leads: 34 },
  { month: "Feb", revenue: 34, leads: 41 },
  { month: "Mar", revenue: 22, leads: 28 },
  { month: "Apr", revenue: 47, leads: 52 },
  { month: "May", revenue: 38, leads: 44 },
  { month: "Jun", revenue: 53, leads: 61 },
  { month: "Jul", revenue: 41, leads: 48 },
  { month: "Aug", revenue: 62, leads: 70 },
]

const statusDonut = [
  { name: "Ready to Move", value: 48, color: D.success },
  { name: "Under Construction", value: 32, color: D.warning },
  { name: "Sold Out", value: 20, color: D.alert },
]

const leads = [
  { id: "L001", name: "Priya Mehta", avatar: "PM", property: "Serenity Heights 3BHK", status: "negotiation", visit: "Aug 14, 2025", value: "₹2.8 Cr" },
  { id: "L002", name: "Rohan Sharma", avatar: "RS", property: "Park Avenue Studio", status: "new", visit: "Aug 16, 2025", value: "₹85 L" },
  { id: "L003", name: "Anita Desai", avatar: "AD", property: "Greenwood Villa 4BHK", status: "closed", visit: "Aug 10, 2025", value: "₹1.9 Cr" },
  { id: "L004", name: "Vikram Nair", avatar: "VN", property: "Horizon Tower 2BHK", status: "lost", visit: "Aug 5, 2025", value: "₹1.1 Cr" },
  { id: "L005", name: "Sunita Kapoor", avatar: "SK", property: "Emerald Coast Duplex", status: "negotiation", visit: "Aug 18, 2025", value: "₹4.2 Cr" },
  { id: "L006", name: "Aryan Bose", avatar: "AB", property: "Skyline Studio 1BHK", status: "new", visit: "Aug 19, 2025", value: "₹72 L" },
]

const visits = [
  { date: "Today", time: "11:00 AM", client: "Priya Mehta", property: "Serenity Heights 3BHK", location: "Bandra West", confirmed: true },
  { date: "Today", time: "3:30 PM", client: "Sunita Kapoor", property: "Emerald Coast Duplex", location: "Juhu", confirmed: true },
  { date: "Tomorrow", time: "10:00 AM", client: "Rohan Sharma", property: "Park Avenue Studio", location: "Connaught Place", confirmed: false },
  { date: "Aug 15", time: "2:00 PM", client: "Aryan Bose", property: "Skyline Studio 1BHK", location: "Koramangala", confirmed: false },
]

// ── STATUS STYLE ──────────────────────────────────────────────────────────────
const statusStyle: Record<string, { color: string; bg: string; label: string }> = {
  new: { color: D.purple, bg: D.purpleBg, label: "New" },
  negotiation: { color: D.warning, bg: D.warningBg, label: "Negotiation" },
  closed: { color: D.success, bg: D.successBg, label: "Closed" },
  lost: { color: D.muted, bg: D.creamDark, label: "Lost" },
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const navItems = [
  { icon: <LayoutDashboard size={17} />, label: "Dashboard", key: "dashboard" },
  { icon: <Building2 size={17} />, label: "Properties", key: "properties", badge: "24" },
  { icon: <Users size={17} />, label: "Clients & Leads", key: "leads", badge: "8" },
  { icon: <Calendar size={17} />, label: "Visits & Calendar", key: "calendar", badge: "5" },
  { icon: <BarChart3 size={17} />, label: "Revenue & Reports", key: "reports" },
  { icon: <Settings size={17} />, label: "Settings", key: "settings" },
]

function DashSidebar({ active, setActive }: { active: string; setActive: (k: string) => void }) {
  return (
    <aside style={{ width: 224, flexShrink: 0, backgroundColor: D.sidebar, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: D.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={17} color={D.navy} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 700, color: D.white, lineHeight: 1.1 }}>Vyas</div>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>REAL ESTATE</div>
          </div>
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)", margin: "0 16px" }} />

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 12px", overflowY: "auto" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", padding: "8px 8px 8px", marginBottom: 4 }}>MAIN MENU</div>
        {navItems.map(item => {
          const isActive = item.key === active
          return (
            <button key={item.key} onClick={() => setActive(item.key)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 7, marginBottom: 2, backgroundColor: isActive ? D.sidebarActive : "transparent", border: "none", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => !isActive && ((e.currentTarget as HTMLElement).style.backgroundColor = D.sidebarHover)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = isActive ? D.sidebarActive : "transparent")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: isActive ? D.gold : "rgba(255,255,255,0.45)", display: "flex" }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? D.white : "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)" }}>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 20, backgroundColor: isActive ? D.gold : "rgba(255,255,255,0.08)", color: isActive ? D.navy : "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)" }}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)", margin: "0 16px" }} />

      {/* User */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: "#2D4A6B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: D.white, fontFamily: "var(--font-sans)" }}>AV</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: D.white, fontFamily: "var(--font-sans)" }}>Arjun Vyas</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)" }}>Admin</div>
          </div>
          <ChevronDown size={13} color="rgba(255,255,255,0.35)" />
        </div>
      </div>
    </aside>
  )
}

// ── TOP BAR ───────────────────────────────────────────────────────────────────
function TopBar({ pageTitle }: { pageTitle: string }) {
  const [sf, setSf] = useState(false)
  const [dd, setDd] = useState(false)
  return (
    <header style={{ height: 60, backgroundColor: D.white, borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: D.navy, margin: 0 }}>{pageTitle}</h1>
        <span style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>Mon, Aug 11, 2025</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={13} color={sf ? D.gold : D.muted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
          <input placeholder="Search properties, clients..." onFocus={() => setSf(true)} onBlur={() => setSf(false)}
            style={{ paddingLeft: 30, paddingRight: 12, height: 34, width: 240, border: `1.5px solid ${sf ? D.gold : D.border}`, borderRadius: 7, fontSize: 12, fontFamily: "var(--font-sans)", color: D.navy, backgroundColor: D.cream, outline: "none", transition: "all 0.15s" }} />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button style={{ width: 34, height: 34, borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: D.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={15} color={D.navyMid} />
          </button>
          <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", backgroundColor: D.alert, border: `2px solid ${D.white}` }} />
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setDd(!dd)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 10px", borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#2D4A6B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: D.white, fontFamily: "var(--font-sans)" }}>AV</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: D.navy, fontFamily: "var(--font-sans)" }}>Arjun Vyas</span>
            <ChevronDown size={12} color={D.muted} />
          </button>
          {dd && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", backgroundColor: D.white, border: `1px solid ${D.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(15,23,42,0.1)", zIndex: 60, minWidth: 160, overflow: "hidden" }}>
              {["Profile", "Settings", "Sign Out"].map(item => (
                <button key={item} onClick={() => setDd(false)} style={{ width: "100%", textAlign: "left", padding: "9px 14px", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, color: item === "Sign Out" ? D.alert : D.navy, backgroundColor: "transparent" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = D.creamDark)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >{item}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ── KPI CARDS ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, trend, icon, accent }: { label: string; value: string; sub: string; trend: number; icon: React.ReactNode; accent?: boolean }) {
  const pos = trend >= 0
  return (
    <div style={{ backgroundColor: accent ? D.navy : D.white, borderRadius: 10, padding: "20px 22px", border: `1px solid ${accent ? "transparent" : D.border}`, flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: accent ? "rgba(255,255,255,0.5)" : D.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)" }}>{label.toUpperCase()}</span>
        <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: accent ? "rgba(212,161,94,0.18)" : "#FDF3E3", display: "flex", alignItems: "center", justifyContent: "center", color: D.gold }}>
          {icon}
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: accent ? D.white : D.navy, marginBottom: 6, lineHeight: 1 }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: pos ? D.success : D.alert, display: "flex", alignItems: "center", gap: 2 }}>
          {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {Math.abs(trend)}%
        </span>
        <span style={{ fontSize: 11, color: accent ? "rgba(255,255,255,0.4)" : D.muted, fontFamily: "var(--font-sans)" }}>{sub}</span>
      </div>
    </div>
  )
}

// ── CUSTOM TOOLTIP ────────────────────────────────────────────────────────────
function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ backgroundColor: D.white, border: `1px solid ${D.border}`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 4px 16px rgba(15,23,42,0.1)" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: D.navyMid, fontFamily: "var(--font-sans)", marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: p.color }} />
          <span style={{ fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)" }}>{p.name === "revenue" ? "Revenue" : "Leads"}: <strong>{p.name === "revenue" ? `₹${p.value}L` : p.value}</strong></span>
        </div>
      ))}
    </div>
  )
}

function DonutTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ backgroundColor: D.white, border: `1px solid ${D.border}`, borderRadius: 8, padding: "8px 12px", boxShadow: "0 4px 12px rgba(15,23,42,0.1)" }}>
      <div style={{ fontSize: 12, color: D.navy, fontFamily: "var(--font-sans)" }}><strong>{payload[0].name}</strong>: {payload[0].value}%</div>
    </div>
  )
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function Dashboard({ navigate }: { navigate: (p: Page) => void }) {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [activeChartTab, setActiveChartTab] = useState<"revenue" | "leads">("revenue")
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())

  const pageLabels: Record<string, string> = {
    dashboard: "Dashboard",
    properties: "Properties",
    leads: "Clients & Leads",
    calendar: "Visits & Calendar",
    reports: "Revenue & Reports",
    settings: "Settings",
  }

  const toggleLead = (id: string) => {
    const s = new Set(selectedLeads)
    if (s.has(id)) s.delete(id); else s.add(id)
    setSelectedLeads(s)
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: D.bg, minWidth: 1200 }}>
      <DashSidebar active={activeNav} setActive={setActiveNav} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar pageTitle={pageLabels[activeNav]} />

        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 22 }}>

          {/* KPI Row */}
          <div style={{ display: "flex", gap: 16 }}>
            <KpiCard label="Total Properties" value="148" sub="vs last month" trend={12} icon={<Building2 size={16} />} accent />
            <KpiCard label="Active Leads" value="64" sub="vs last month" trend={8} icon={<Users size={16} />} />
            <KpiCard label="Scheduled Visits" value="18" sub="this week" trend={22} icon={<Calendar size={16} />} />
            <KpiCard label="Monthly Revenue" value="₹4.2 Cr" sub="vs last month" trend={-3} icon={<TrendingUp size={16} />} />
          </div>

          {/* Charts row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
            {/* Revenue / Leads chart */}
            <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: D.navy, margin: "0 0 2px" }}>Performance Overview</h3>
                  <span style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>Jan – Aug 2025</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["revenue", "leads"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveChartTab(tab)}
                      style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${activeChartTab === tab ? D.gold : D.border}`, backgroundColor: activeChartTab === tab ? "#FDF3E3" : "transparent", color: activeChartTab === tab ? D.goldDark : D.muted, fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                      {tab === "revenue" ? "Revenue" : "Leads"}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                {activeChartTab === "revenue" ? (
                  <BarChart data={revenueData} barCategoryGap="30%" margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={D.border} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                    <Tooltip content={<RevenueTooltip />} cursor={{ fill: "rgba(212,161,94,0.06)" }} />
                    <Bar dataKey="revenue" fill={D.gold} radius={[4, 4, 0, 0]} maxBarSize={36} />
                  </BarChart>
                ) : (
                  <LineChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={D.border} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<RevenueTooltip />} />
                    <Line type="monotone" dataKey="leads" stroke="#0F172A" strokeWidth={2} dot={{ r: 4, fill: "#0F172A", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Donut chart */}
            <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "20px 24px" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: D.navy, margin: "0 0 4px" }}>Property Status</h3>
              <span style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>148 total listings</span>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statusDonut} cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={2} dataKey="value">
                    {statusDonut.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                {statusDonut.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.color }} />
                      <span style={{ fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)" }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: D.navy, fontFamily: "var(--font-sans)" }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leads table + Upcoming Visits */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
            {/* Leads table */}
            <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${D.border}` }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: D.navy, margin: 0 }}>Recent Leads</h3>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, border: `1px solid ${D.border}`, backgroundColor: "transparent", fontSize: 12, fontWeight: 500, color: D.navyMid, fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                    <Filter size={12} /> Filter
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, border: `1px solid ${D.border}`, backgroundColor: "transparent", fontSize: 12, fontWeight: 500, color: D.navyMid, fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                    <Download size={12} /> Export
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 6, backgroundColor: D.gold, border: "none", fontSize: 12, fontWeight: 700, color: D.navy, fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                    <Plus size={12} /> Add Lead
                  </button>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: D.cream }}>
                    <th style={{ width: 36, padding: "9px 14px" }}>
                      <input type="checkbox" onChange={e => setSelectedLeads(e.target.checked ? new Set(leads.map(l => l.id)) : new Set())} style={{ cursor: "pointer" }} />
                    </th>
                    {["CLIENT", "PROPERTY", "VALUE", "STATUS", "VISIT DATE", ""].map((col, i) => (
                      <th key={i} style={{ padding: "9px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => {
                    const ss = statusStyle[lead.status]
                    const sel = selectedLeads.has(lead.id)
                    return (
                      <tr key={lead.id}
                        style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: sel ? "#FDF9F3" : "transparent" }}
                        onMouseEnter={e => !sel && ((e.currentTarget as HTMLElement).style.backgroundColor = D.cream)}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = sel ? "#FDF9F3" : "transparent")}
                      >
                        <td style={{ padding: "11px 14px" }}><input type="checkbox" checked={sel} onChange={() => toggleLead(lead.id)} style={{ cursor: "pointer" }} /></td>
                        <td style={{ padding: "11px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#2D4A6B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: D.white, fontFamily: "var(--font-sans)" }}>{lead.avatar}</span>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 500, color: D.navy, fontFamily: "var(--font-sans)" }}>{lead.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "11px 14px", fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)", maxWidth: 180 }}>
                          <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.property}</span>
                        </td>
                        <td style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{lead.value}</td>
                        <td style={{ padding: "11px 14px" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, color: ss.color, backgroundColor: ss.bg, fontFamily: "var(--font-sans)", textTransform: "capitalize", whiteSpace: "nowrap" }}>{ss.label}</span>
                        </td>
                        <td style={{ padding: "11px 14px", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{lead.visit}</td>
                        <td style={{ padding: "11px 14px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Eye size={13} color={D.navyMid} />
                            </button>
                            <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Phone size={13} color={D.navyMid} />
                            </button>
                            <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <MoreHorizontal size={13} color={D.navyMid} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${D.border}` }}>
                <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>Showing 6 of 64 leads</span>
                <button onClick={() => navigate("listings")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: D.goldDark, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer" }}>
                  View all leads <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Upcoming Visits */}
            <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "16px 20px 14px", borderBottom: `1px solid ${D.border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: D.navy, margin: 0 }}>Upcoming Visits</h3>
                  <button style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={14} color={D.navyMid} />
                  </button>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
                {visits.map((v, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < visits.length - 1 ? `1px solid ${D.border}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: i < 2 ? D.gold : D.creamDark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: i < 2 ? D.navy : D.muted, fontFamily: "var(--font-sans)", lineHeight: 1 }}>{v.date.toUpperCase()}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)" }}>{v.client}</div>
                          <div style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)", marginTop: 1 }}>{v.property}</div>
                        </div>
                      </div>
                      {v.confirmed ? (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, backgroundColor: D.successBg, color: D.success, fontFamily: "var(--font-sans)", flexShrink: 0 }}>Confirmed</span>
                      ) : (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, backgroundColor: D.creamDark, color: D.muted, fontFamily: "var(--font-sans)", flexShrink: 0 }}>Pending</span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 14, paddingLeft: 46 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>
                        <Clock size={11} color={D.muted} /> {v.time}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>
                        <MapPin size={11} color={D.muted} /> {v.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 16px", borderTop: `1px solid ${D.border}` }}>
                <button style={{ width: "100%", padding: "9px", borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: "transparent", fontSize: 12, fontWeight: 600, color: D.navyMid, fontFamily: "var(--font-sans)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Calendar size={13} /> Open Full Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Quick stats footer row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {[
              { label: "Avg. Deal Size", value: "₹1.82 Cr", icon: <TrendingUp size={14} />, trend: "+6% MoM" },
              { label: "Conversion Rate", value: "23.4%", icon: <Check size={14} />, trend: "+2.1pp" },
              { label: "Avg. Time to Close", value: "38 days", icon: <Clock size={14} />, trend: "−4 days" },
              { label: "Client Satisfaction", value: "4.9 / 5", icon: <Star size={14} />, trend: "Last 90 days" },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: D.white, borderRadius: 10, padding: "16px 18px", border: `1px solid ${D.border}`, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: "#FDF3E3", color: D.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)" }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: D.navy, lineHeight: 1.3 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: D.success, fontFamily: "var(--font-sans)", fontWeight: 600 }}>{s.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
