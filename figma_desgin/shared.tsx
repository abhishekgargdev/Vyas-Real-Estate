import { useState } from "react"
import { Building2, ChevronDown, Phone, Mail, MapPin, Share2, AtSign, Link, Rss, ArrowRight } from "lucide-react"

// ── TOKENS ───────────────────────────────────────────────────────────────────
export const C = {
  navy: "#0F172A",
  navyLight: "#1E293B",
  navyMid: "#334155",
  gold: "#D4A15E",
  goldDark: "#B8843A",
  cream: "#F8F7F4",
  creamDark: "#F0EEE9",
  border: "#E2E2E2",
  muted: "#94A3B8",
  white: "#FFFFFF",
  success: "#16A34A",
  successBg: "#DCFCE7",
  alert: "#DC2626",
  alertBg: "#FEE2E2",
  warning: "#D97706",
  warningBg: "#FEF3C7",
}

export type Page = "home" | "about" | "listings" | "property" | "contact" | "dashboard" | "properties" | "property-form" | "leads" | "calendar" | "revenue" | "dash-settings" | "portal"

// ── HELPERS ──────────────────────────────────────────────────────────────────
export function GoldDivider({ center }: { center?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: center ? "center" : "flex-start", marginBottom: 10 }}>
      <div style={{ width: 28, height: 2, backgroundColor: C.gold }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.gold }} />
    </div>
  )
}

export function SectionLabel({ children, center }: { children: string; center?: boolean }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <GoldDivider center={center} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
        color: C.gold, fontFamily: "var(--font-sans)",
        textTransform: "uppercase" as const,
      }}>{children}</span>
    </div>
  )
}

export function Button({
  children, variant = "primary", size = "md", icon, onClick, href, fullWidth,
}: {
  children?: React.ReactNode; variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg"; icon?: React.ReactNode;
  onClick?: () => void; href?: string; fullWidth?: boolean;
}) {
  const [hov, setHov] = useState(false)
  const sizes = {
    sm: { fontSize: 12, padding: "7px 16px", borderRadius: 6, gap: 6 },
    md: { fontSize: 13, padding: "10px 22px", borderRadius: 7, gap: 7 },
    lg: { fontSize: 15, padding: "13px 30px", borderRadius: 8, gap: 8 },
  }
  const variants = {
    primary: {
      backgroundColor: hov ? C.goldDark : C.gold, color: C.navy, border: "none",
      boxShadow: hov ? "0 4px 14px rgba(212,161,94,0.4)" : "0 1px 4px rgba(212,161,94,0.25)",
    },
    secondary: {
      backgroundColor: "transparent", color: C.navy,
      border: `1.5px solid ${hov ? C.navy : C.border}`,
      boxShadow: hov ? "0 2px 8px rgba(15,23,42,0.07)" : "none",
    },
    ghost: {
      backgroundColor: hov ? C.creamDark : "transparent",
      color: C.navyMid, border: "none",
    },
  }
  const s = sizes[size]
  const v = variants[variant]
  const style: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: s.gap, padding: s.padding, borderRadius: s.borderRadius,
    fontSize: s.fontSize, fontWeight: 600, fontFamily: "var(--font-sans)",
    cursor: "pointer", letterSpacing: "0.01em",
    transition: "all 0.15s ease", outline: "none",
    width: fullWidth ? "100%" : undefined,
    textDecoration: "none",
    ...v,
  }
  if (href) return (
    <a href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon && <span style={{ display: "flex" }}>{icon}</span>}{children}
    </a>
  )
  return (
    <button style={style} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon && <span style={{ display: "flex" }}>{icon}</span>}{children}
    </button>
  )
}

// ── NAVBAR ───────────────────────────────────────────────────────────────────
export function Navbar({ page, navigate }: { page: Page; navigate: (p: Page) => void }) {
  const links: { label: string; p: Page }[] = [
    { label: "Home", p: "home" },
    { label: "About", p: "about" },
    { label: "Properties", p: "listings" },
    { label: "Contact", p: "contact" },
  ]
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      backgroundColor: "rgba(15,23,42,0.92)", backdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: "0 48px",
        height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => navigate("home")} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "none", border: "none", cursor: "pointer",
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={18} color={C.navy} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: C.white, lineHeight: 1.1 }}>Vyas</div>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>REAL ESTATE</div>
          </div>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {links.map(({ label, p }) => {
            const active = page === p
            return (
              <button key={p} onClick={() => navigate(p)} style={{
                fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: active ? 600 : 400,
                color: active ? C.gold : "rgba(255,255,255,0.7)",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: active ? `1px solid ${C.gold}` : "1px solid transparent",
                paddingBottom: 2, padding: "0 0 2px",
              }}>
                {label}
              </button>
            )
          })}
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => navigate("portal")} style={{ fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 500, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer" }}>
            My Portal
          </button>
          <button onClick={() => navigate("dashboard")} style={{ fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 500, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer" }}>
            Dashboard
          </button>
          <Button size="sm" onClick={() => navigate("listings")}>Browse</Button>
        </div>
      </div>
    </header>
  )
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
export function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const [email, setEmail] = useState("")
  return (
    <footer style={{ backgroundColor: C.navy, marginTop: 96 }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 48px 0" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48,
          paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div>
            <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, background: "none", border: "none", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={18} color={C.navy} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: C.white }}>Vyas Real Estate</div>
                <div style={{ fontSize: 9, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)" }}>VERIFIED · TRUSTED · TRANSPARENT</div>
              </div>
            </button>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", lineHeight: 1.75, maxWidth: 300, margin: "0 0 24px" }}>
              India's most trusted real estate brokerage — connecting buyers, sellers and investors across 12 cities since 2007.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[<AtSign size={15} />, <Share2 size={15} />, <Link size={15} />, <Rss size={15} />].map((icon, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-sans)", marginBottom: 20 }}>QUICK LINKS</div>
            {([["Home", "home"], ["About Us", "about"], ["Properties", "listings"], ["Contact Us", "contact"]] as [string, Page][]).map(([l, p]) => (
              <button key={l} onClick={() => navigate(p)} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", marginBottom: 10, padding: 0, textAlign: "left" }}>
                {l}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-sans)", marginBottom: 20 }}>CONTACT</div>
            {[
              { icon: <Phone size={13} />, text: "+91 98210 00000" },
              { icon: <Mail size={13} />, text: "hello@vyasrealty.in" },
              { icon: <MapPin size={13} />, text: "14B, Nariman Point,\nMumbai — 400 021" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ color: C.gold, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.text}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-sans)", marginBottom: 20 }}>NEWSLETTER</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: "0 0 18px" }}>
              Get new listings, market insights, and property news delivered weekly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
                style={{ padding: "11px 14px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", color: C.white, fontFamily: "var(--font-sans)", fontSize: 13, outline: "none" }} />
              <Button size="md" fullWidth>Subscribe</Button>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-sans)" }}>
            © 2025 Vyas Real Estate Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "RERA Disclosures"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-sans)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── PAGE SHELL ────────────────────────────────────────────────────────────────
export function PageShell({ page, navigate, children }: { page: Page; navigate: (p: Page) => void; children: React.ReactNode }) {
  return (
    <div style={{ minWidth: 1024, overflowX: "auto", backgroundColor: C.cream }}>
      <Navbar page={page} navigate={navigate} />
      <div style={{ paddingTop: 68 }}>
        {children}
      </div>
      <Footer navigate={navigate} />
    </div>
  )
}
