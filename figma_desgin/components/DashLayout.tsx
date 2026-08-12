import { useState } from "react"
import {
  LayoutDashboard, Building2, Users, Calendar, BarChart3,
  Settings, Bell, Search, ChevronDown,
} from "lucide-react"
import type { Page } from "../shared"

export const D = {
  sidebar: "#0F172A", sidebarHover: "rgba(255,255,255,0.06)", sidebarActive: "rgba(212,161,94,0.14)",
  bg: "#F8F7F4", white: "#FFFFFF", navy: "#0F172A", navyLight: "#1E293B", navyMid: "#334155",
  gold: "#D4A15E", goldDark: "#B8843A", border: "#E2E2E2", muted: "#94A3B8",
  cream: "#F8F7F4", creamDark: "#F0EEE9",
  success: "#16A34A", successBg: "#DCFCE7",
  alert: "#DC2626", alertBg: "#FEE2E2",
  warning: "#D97706", warningBg: "#FEF3C7",
  purple: "#7C3AED", purpleBg: "#F3E8FF",
}

const NAV: { icon: React.ReactNode; label: string; page: Page; badge?: string }[] = [
  { icon: <LayoutDashboard size={17} />, label: "Dashboard", page: "dashboard" },
  { icon: <Building2 size={17} />, label: "Properties", page: "properties", badge: "24" },
  { icon: <Users size={17} />, label: "Clients & Leads", page: "leads", badge: "8" },
  { icon: <Calendar size={17} />, label: "Visits & Calendar", page: "calendar", badge: "5" },
  { icon: <BarChart3 size={17} />, label: "Revenue & Reports", page: "revenue" },
  { icon: <Settings size={17} />, label: "Settings", page: "dash-settings" },
]

export function DashSidebar({ page, navigate }: { page: Page; navigate: (p: Page) => void }) {
  return (
    <aside style={{ width: 224, flexShrink: 0, backgroundColor: D.sidebar, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "24px 20px 18px" }}>
        <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: D.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={17} color={D.navy} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 700, color: D.white, lineHeight: 1.1 }}>Vyas</div>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>REAL ESTATE</div>
          </div>
        </button>
      </div>
      <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)", margin: "0 16px" }} />
      <nav style={{ flex: 1, padding: "14px 12px", overflowY: "auto" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", padding: "8px 8px 8px", marginBottom: 4 }}>MAIN MENU</div>
        {NAV.map(item => {
          const isActive = item.page === page
          return (
            <button key={item.page} onClick={() => navigate(item.page)}
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

export function DashTopBar({ title, navigate }: { title: string; navigate: (p: Page) => void }) {
  const [sf, setSf] = useState(false)
  const [dd, setDd] = useState(false)
  return (
    <header style={{ height: 60, backgroundColor: D.white, borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0, position: "sticky", top: 0, zIndex: 50 }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: D.navy, margin: 0 }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Search size={13} color={sf ? D.gold : D.muted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
          <input placeholder="Search..." onFocus={() => setSf(true)} onBlur={() => setSf(false)}
            style={{ paddingLeft: 30, paddingRight: 12, height: 34, width: 220, border: `1.5px solid ${sf ? D.gold : D.border}`, borderRadius: 7, fontSize: 12, fontFamily: "var(--font-sans)", color: D.navy, backgroundColor: D.cream, outline: "none", transition: "all 0.15s" }} />
        </div>
        <div style={{ position: "relative" }}>
          <button style={{ width: 34, height: 34, borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: D.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={15} color={D.navyMid} />
          </button>
          <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", backgroundColor: D.alert, border: `2px solid ${D.white}` }} />
        </div>
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
                <button key={item} onClick={() => { setDd(false); if (item === "Settings") navigate("dash-settings") }} style={{ width: "100%", textAlign: "left", padding: "9px 14px", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, color: item === "Sign Out" ? D.alert : D.navy, backgroundColor: "transparent" }}
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

export function DashLayout({ page, navigate, title, children }: { page: Page; navigate: (p: Page) => void; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: D.bg, minWidth: 1200 }}>
      <DashSidebar page={page} navigate={navigate} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <DashTopBar title={title} navigate={navigate} />
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {children}
        </main>
      </div>
    </div>
  )
}

// ── SHARED FORM PRIMITIVES ───────────────────────────────────────────────────
export function FLabel({ children }: { children: string }) {
  return <label style={{ fontSize: 11, fontWeight: 700, color: D.navyMid, letterSpacing: "0.05em", fontFamily: "var(--font-sans)", display: "block", marginBottom: 5 }}>{children.toUpperCase()}</label>
}

export function FInput({ placeholder, type = "text", value, onChange, disabled }: { placeholder?: string; type?: string; value?: string; onChange?: (v: string) => void; disabled?: boolean }) {
  const [f, setF] = useState(false)
  return (
    <input type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={e => onChange?.(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ width: "100%", padding: "10px 13px", borderRadius: 7, border: `1.5px solid ${f ? D.gold : D.border}`, fontFamily: "var(--font-sans)", fontSize: 13, color: D.navy, backgroundColor: disabled ? D.creamDark : D.white, outline: "none", boxShadow: f ? "0 0 0 3px rgba(212,161,94,0.12)" : "none", transition: "all 0.15s", boxSizing: "border-box" }} />
  )
}

export function FSelect({ options, value, onChange, placeholder }: { options: string[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [f, setF] = useState(false)
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", padding: "10px 32px 10px 13px", borderRadius: 7, border: `1.5px solid ${f ? D.gold : D.border}`, fontFamily: "var(--font-sans)", fontSize: 13, color: value ? D.navy : D.muted, backgroundColor: D.white, outline: "none", appearance: "none", boxShadow: f ? "0 0 0 3px rgba(212,161,94,0.12)" : "none", transition: "all 0.15s", boxSizing: "border-box", cursor: "pointer" }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={13} color={D.muted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
    </div>
  )
}

export function FTextarea({ placeholder, value, onChange, rows = 4 }: { placeholder?: string; value?: string; onChange?: (v: string) => void; rows?: number }) {
  const [f, setF] = useState(false)
  return (
    <textarea placeholder={placeholder} value={value} rows={rows} onChange={e => onChange?.(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ width: "100%", padding: "10px 13px", borderRadius: 7, border: `1.5px solid ${f ? D.gold : D.border}`, fontFamily: "var(--font-sans)", fontSize: 13, color: D.navy, backgroundColor: D.white, outline: "none", boxShadow: f ? "0 0 0 3px rgba(212,161,94,0.12)" : "none", transition: "all 0.15s", resize: "vertical", boxSizing: "border-box" }} />
  )
}

export function DBtn({ children, variant = "primary", size = "md", icon, onClick, type = "button", disabled, fullWidth, style }: { children?: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg"; icon?: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean; fullWidth?: boolean; style?: React.CSSProperties }) {
  const [h, setH] = useState(false)
  const sz = { sm: { p: "7px 14px", fs: 12 }, md: { p: "10px 20px", fs: 13 }, lg: { p: "12px 28px", fs: 14 } }[size]
  const v = {
    primary: { bg: h ? D.goldDark : D.gold, color: D.navy, border: "none", shadow: h ? "0 4px 12px rgba(212,161,94,0.4)" : "none" },
    secondary: { bg: "transparent", color: D.navy, border: `1.5px solid ${h ? D.navy : D.border}`, shadow: "none" },
    ghost: { bg: h ? D.creamDark : "transparent", color: D.navyMid, border: "none", shadow: "none" },
    danger: { bg: h ? "#B91C1C" : D.alert, color: "#fff", border: "none", shadow: h ? "0 4px 12px rgba(220,38,38,0.3)" : "none" },
  }[variant]
  return (
    <button type={type} disabled={disabled} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: sz.p, borderRadius: 7, fontSize: sz.fs, fontWeight: 600, fontFamily: "var(--font-sans)", cursor: disabled ? "not-allowed" : "pointer", border: v.border, backgroundColor: v.bg, color: v.color, boxShadow: v.shadow, opacity: disabled ? 0.5 : 1, letterSpacing: "0.01em", transition: "all 0.15s", whiteSpace: "nowrap", width: fullWidth ? "100%" : undefined, ...style }}>
      {icon && <span style={{ display: "flex" }}>{icon}</span>}{children}
    </button>
  )
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; label: string }> = {
    ready: { color: D.success, bg: D.successBg, label: "Ready to Move" },
    "under-construction": { color: D.warning, bg: D.warningBg, label: "Under Construction" },
    sold: { color: D.muted, bg: D.creamDark, label: "Sold" },
    "new-launch": { color: D.purple, bg: D.purpleBg, label: "New Launch" },
    new: { color: D.purple, bg: D.purpleBg, label: "New" },
    contacted: { color: "#2563EB", bg: "#EFF6FF", label: "Contacted" },
    negotiation: { color: D.warning, bg: D.warningBg, label: "Negotiation" },
    closed: { color: D.success, bg: D.successBg, label: "Closed" },
    lost: { color: D.muted, bg: D.creamDark, label: "Lost" },
    "visit-scheduled": { color: D.gold, bg: "#FDF3E3", label: "Visit Scheduled" },
  }
  const s = map[status] ?? { color: D.muted, bg: D.creamDark, label: status }
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, color: s.color, backgroundColor: s.bg, fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  )
}
