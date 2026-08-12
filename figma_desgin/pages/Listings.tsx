import { useState } from "react"
import {
  ChevronRight, MapPin, Bed, Bath, Square, Heart, ChevronDown,
  LayoutGrid, List, SlidersHorizontal, X, Check, ArrowRight,
  Building2, ArrowUpDown,
} from "lucide-react"
import { C, type Page } from "../shared"

// ── DATA ──────────────────────────────────────────────────────────────────────
type PropStatus = "ready" | "under-construction" | "new-launch"
type Furnishing = "furnished" | "semi-furnished" | "unfurnished"

interface Property {
  id: number; title: string; location: string; city: string;
  price: number; priceLabel: string; beds: number; baths: number; area: string;
  type: "Flat" | "Villa" | "Shop" | "Studio"; status: PropStatus;
  furnishing: Furnishing; images: string[]; liked: boolean; date: string;
}

const ALL_PROPERTIES: Property[] = [
  { id: 1, title: "Serenity Heights — 3BHK", location: "Bandra West", city: "Mumbai", price: 28000000, priceLabel: "₹2.8 Cr", beds: 3, baths: 3, area: "1,650 sqft", type: "Flat", status: "ready", furnishing: "semi-furnished", images: ["https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-07-28" },
  { id: 2, title: "Greenwood Villas — 4BHK", location: "Whitefield", city: "Bengaluru", price: 19000000, priceLabel: "₹1.9 Cr", beds: 4, baths: 4, area: "2,400 sqft", type: "Villa", status: "under-construction", furnishing: "unfurnished", images: ["https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&h=400&fit=crop&auto=format"], liked: true, date: "2025-08-01" },
  { id: 3, title: "Horizon Tower Offices", location: "Connaught Place", city: "Delhi", price: 32000000, priceLabel: "₹3.2 Cr", beds: 0, baths: 2, area: "1,200 sqft", type: "Shop", status: "ready", furnishing: "furnished", images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-07-10" },
  { id: 4, title: "Emerald Residency — 2BHK", location: "Jubilee Hills", city: "Hyderabad", price: 11000000, priceLabel: "₹1.1 Cr", beds: 2, baths: 2, area: "1,100 sqft", type: "Flat", status: "ready", furnishing: "furnished", images: ["https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-08-03" },
  { id: 5, title: "Azure Pool Villa — 5BHK", location: "Koregaon Park", city: "Pune", price: 54000000, priceLabel: "₹5.4 Cr", beds: 5, baths: 5, area: "4,200 sqft", type: "Villa", status: "new-launch", furnishing: "unfurnished", images: ["https://images.unsplash.com/photo-1678889284769-b7dcbec1f082?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-08-05" },
  { id: 6, title: "Skyline Studio — 1BHK", location: "Koramangala", city: "Bengaluru", price: 7200000, priceLabel: "₹72 L", beds: 1, baths: 1, area: "540 sqft", type: "Studio", status: "ready", furnishing: "furnished", images: ["https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-07-20" },
  { id: 7, title: "Priya Towers — 3BHK", location: "Andheri West", city: "Mumbai", price: 21000000, priceLabel: "₹2.1 Cr", beds: 3, baths: 2, area: "1,380 sqft", type: "Flat", status: "ready", furnishing: "semi-furnished", images: ["https://images.unsplash.com/photo-1549499090-c9203d2b20ad?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-07-15" },
  { id: 8, title: "The Grand Residences 4BHK", location: "Golf Course Road", city: "Delhi", price: 42000000, priceLabel: "₹4.2 Cr", beds: 4, baths: 4, area: "3,100 sqft", type: "Flat", status: "new-launch", furnishing: "unfurnished", images: ["https://images.unsplash.com/photo-1779976955613-b74623824d1c?w=600&h=400&fit=crop&auto=format"], liked: true, date: "2025-08-08" },
  { id: 9, title: "Lakeview Bungalow 6BHK", location: "Lavasa", city: "Pune", price: 85000000, priceLabel: "₹8.5 Cr", beds: 6, baths: 6, area: "5,800 sqft", type: "Villa", status: "ready", furnishing: "furnished", images: ["https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&h=400&fit=crop&auto=format"], liked: false, date: "2025-06-30" },
]

const statusConfig: Record<PropStatus, { label: string; color: string; bg: string }> = {
  "ready": { label: "Ready to Move", color: C.success, bg: C.successBg },
  "under-construction": { label: "Under Construction", color: C.warning, bg: C.warningBg },
  "new-launch": { label: "New Launch", color: "#7C3AED", bg: "#F3E8FF" },
}

// ── SIDEBAR FILTERS ───────────────────────────────────────────────────────────
const PROP_TYPES = ["Flat", "Villa", "Shop", "Studio"] as const
const LOCATIONS = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai"] as const
const BED_OPTIONS = [1, 2, 3, 4, 5] as const
const STATUSES: PropStatus[] = ["ready", "under-construction", "new-launch"]
const FURNISH_OPTIONS: Furnishing[] = ["furnished", "semi-furnished", "unfurnished"]

function FilterCheckbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 8 }}>
      <div onClick={onChange} style={{
        width: 17, height: 17, borderRadius: 4, flexShrink: 0,
        border: `1.5px solid ${checked ? C.gold : C.border}`,
        backgroundColor: checked ? C.gold : C.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}>
        {checked && <Check size={10} color={C.navy} strokeWidth={3} />}
      </div>
      <span style={{ fontSize: 13, color: C.navyMid, fontFamily: "var(--font-sans)" }}>{label}</span>
    </label>
  )
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 20, marginBottom: 20 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
        color: C.navy, letterSpacing: "0.06em",
        padding: "0 0 14px",
      }}>
        {title.toUpperCase()}
        <ChevronDown size={13} color={C.muted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
      </button>
      {open && children}
    </div>
  )
}

interface Filters {
  types: Set<string>; locations: Set<string>; beds: Set<number>;
  statuses: Set<string>; furnishing: Set<string>;
  budgetMin: number; budgetMax: number;
}

function Sidebar({ filters, setFilters, count }: { filters: Filters; setFilters: (f: Filters) => void; count: number }) {
  const toggle = <K extends keyof Filters>(key: K, val: any) => {
    const s = new Set(filters[key] as Set<any>)
    if (s.has(val)) s.delete(val); else s.add(val)
    setFilters({ ...filters, [key]: s })
  }

  const formatBudget = (v: number) => v >= 10000000 ? `₹${(v / 10000000).toFixed(1)} Cr` : `₹${(v / 100000).toFixed(0)} L`

  const hasFilters = filters.types.size > 0 || filters.locations.size > 0 || filters.beds.size > 0 || filters.statuses.size > 0 || filters.furnishing.size > 0 || filters.budgetMax < 100000000

  return (
    <aside style={{
      width: 260, flexShrink: 0,
      backgroundColor: C.white, borderRadius: 10,
      border: `1px solid ${C.border}`,
      padding: "20px 20px 24px",
      position: "sticky", top: 88, maxHeight: "calc(100vh - 104px)", overflowY: "auto",
      alignSelf: "flex-start",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlidersHorizontal size={15} color={C.gold} />
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: C.navy }}>Filters</span>
        </div>
        {hasFilters && (
          <button onClick={() => setFilters({ types: new Set(), locations: new Set(), beds: new Set(), statuses: new Set(), furnishing: new Set(), budgetMin: 0, budgetMax: 100000000 })}
            style={{ fontSize: 11, fontWeight: 600, color: C.alert, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      <FilterSection title="Property Type">
        {PROP_TYPES.map(t => <FilterCheckbox key={t} label={t} checked={filters.types.has(t)} onChange={() => toggle("types", t)} />)}
      </FilterSection>

      <FilterSection title="Budget Range">
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{formatBudget(filters.budgetMin)}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.navy, fontFamily: "var(--font-sans)" }}>{formatBudget(filters.budgetMax)}</span>
          </div>
          <div style={{ position: "relative", height: 4, backgroundColor: C.border, borderRadius: 2, marginBottom: 6 }}>
            <div style={{ position: "absolute", left: `${(filters.budgetMin / 100000000) * 100}%`, right: `${100 - (filters.budgetMax / 100000000) * 100}%`, height: "100%", backgroundColor: C.gold, borderRadius: 2 }} />
          </div>
          <input type="range" min={0} max={100000000} step={1000000} value={filters.budgetMax}
            onChange={e => setFilters({ ...filters, budgetMax: Number(e.target.value) })}
            style={{ width: "100%", accentColor: C.gold, cursor: "pointer" }} />
        </div>
      </FilterSection>

      <FilterSection title="Location">
        {LOCATIONS.map(loc => <FilterCheckbox key={loc} label={loc} checked={filters.locations.has(loc)} onChange={() => toggle("locations", loc)} />)}
      </FilterSection>

      <FilterSection title="Bedrooms">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {BED_OPTIONS.map(b => (
            <button key={b} onClick={() => toggle("beds", b)} style={{
              width: 36, height: 36, borderRadius: 6, cursor: "pointer",
              border: `1.5px solid ${filters.beds.has(b) ? C.gold : C.border}`,
              backgroundColor: filters.beds.has(b) ? "#FDF3E3" : "transparent",
              color: filters.beds.has(b) ? C.goldDark : C.navyMid,
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
              transition: "all 0.15s",
            }}>{b}+</button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Status">
        {STATUSES.map(s => <FilterCheckbox key={s} label={statusConfig[s].label} checked={filters.statuses.has(s)} onChange={() => toggle("statuses", s)} />)}
      </FilterSection>

      <FilterSection title="Furnishing" defaultOpen={false}>
        {FURNISH_OPTIONS.map(f => <FilterCheckbox key={f} label={f.charAt(0).toUpperCase() + f.slice(1)} checked={filters.furnishing.has(f)} onChange={() => toggle("furnishing", f)} />)}
      </FilterSection>

      <div style={{ paddingTop: 4, textAlign: "center" }}>
        <span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{count} properties match</span>
      </div>
    </aside>
  )
}

// ── PROPERTY CARD (GRID) ──────────────────────────────────────────────────────
function GridCard({ p, onLike, navigate }: { p: Property; onLike: () => void; navigate: (pg: Page) => void }) {
  const [hov, setHov] = useState(false)
  const [dotIdx, setDotIdx] = useState(0)
  const sc = statusConfig[p.status]

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ backgroundColor: C.white, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: hov ? "0 12px 36px rgba(15,23,42,0.11)" : "0 2px 8px rgba(15,23,42,0.05)", transition: "box-shadow 0.2s ease" }}>

      {/* Image */}
      <div style={{ position: "relative", height: 200, backgroundColor: C.creamDark, overflow: "hidden" }}>
        <img src={p.images[dotIdx] || p.images[0]} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />

        {/* Tags row */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, backgroundColor: "rgba(255,255,255,0.92)", color: C.navy, fontFamily: "var(--font-sans)" }}>{p.type}</span>
          <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, backgroundColor: sc.bg, color: sc.color, fontFamily: "var(--font-sans)" }}>{sc.label}</span>
        </div>

        {/* Heart */}
        <button onClick={e => { e.stopPropagation(); onLike() }}
          style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={13} fill={p.liked ? C.alert : "none"} color={p.liked ? C.alert : C.navyMid} />
        </button>

        {/* Dot indicator */}
        {p.images.length > 1 && (
          <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
            {p.images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setDotIdx(i) }}
                style={{ width: i === dotIdx ? 16 : 6, height: 6, borderRadius: 3, border: "none", cursor: "pointer", backgroundColor: i === dotIdx ? C.white : "rgba(255,255,255,0.5)", transition: "all 0.2s", padding: 0 }} />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 5, lineHeight: 1.3 }}>{p.title}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
          <MapPin size={12} color={C.muted} />
          <span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.location}, {p.city}</span>
        </div>

        {/* Specs */}
        <div style={{ display: "flex", gap: 14, paddingBottom: 14, borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
          {p.beds > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Bed size={12} color={C.muted} /><span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.beds}</span></span>}
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Bath size={12} color={C.muted} /><span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.baths}</span></span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Square size={12} color={C.muted} /><span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.area}</span></span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 700, color: C.navy }}>{p.priceLabel}</span>
          <button onClick={() => navigate("property")} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 6, border: `1.5px solid ${hov ? C.gold : C.border}`, color: hov ? C.goldDark : C.navyMid, backgroundColor: hov ? "#FDF3E3" : "transparent", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer", transition: "all 0.15s" }}>
            View Details <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── PROPERTY ROW (LIST VIEW) ──────────────────────────────────────────────────
function ListRow({ p, onLike }: { p: Property; onLike: () => void }) {
  const [hov, setHov] = useState(false)
  const sc = statusConfig[p.status]
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ backgroundColor: C.white, borderRadius: 10, overflow: "hidden", border: `1px solid ${hov ? C.border : C.border}`, boxShadow: hov ? "0 6px 20px rgba(15,23,42,0.09)" : "0 1px 5px rgba(15,23,42,0.04)", transition: "box-shadow 0.2s ease", display: "flex" }}>
      <div style={{ width: 220, flexShrink: 0, position: "relative", backgroundColor: C.creamDark, overflow: "hidden" }}>
        <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />
        <button onClick={e => { e.stopPropagation(); onLike() }}
          style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={12} fill={p.liked ? C.alert : "none"} color={p.liked ? C.alert : C.navyMid} />
        </button>
      </div>
      <div style={{ flex: 1, padding: "18px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: C.navy, lineHeight: 1.3 }}>{p.title}</div>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: C.navy, flexShrink: 0, marginLeft: 24 }}>{p.priceLabel}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
            <MapPin size={12} color={C.muted} />
            <span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.location}, {p.city}</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, backgroundColor: C.creamDark, color: C.navyMid, fontFamily: "var(--font-sans)" }}>{p.type}</span>
            <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, backgroundColor: sc.bg, color: sc.color, fontFamily: "var(--font-sans)" }}>{sc.label}</span>
            <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, backgroundColor: C.creamDark, color: C.navyMid, fontFamily: "var(--font-sans)", textTransform: "capitalize" }}>{p.furnishing}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 20 }}>
            {p.beds > 0 && <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Bed size={13} color={C.muted} /><span style={{ fontSize: 13, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.beds} Beds</span></span>}
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Bath size={13} color={C.muted} /><span style={{ fontSize: 13, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.baths} Baths</span></span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Square size={13} color={C.muted} /><span style={{ fontSize: 13, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.area}</span></span>
          </div>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 7, backgroundColor: hov ? C.gold : C.creamDark, color: hov ? C.navy : C.navyMid, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-sans)", transition: "all 0.15s" }}>
            View Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const PER_PAGE = 9

export default function Listings({ navigate }: { navigate: (p: Page) => void }) {
  const [filters, setFilters] = useState<Filters>({ types: new Set(), locations: new Set(), beds: new Set(), statuses: new Set(), furnishing: new Set(), budgetMin: 0, budgetMax: 100000000 })
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "newest">("newest")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [page, setPage] = useState(1)
  const [properties, setProperties] = useState(ALL_PROPERTIES)
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = properties.filter(p => {
    if (filters.types.size && !filters.types.has(p.type)) return false
    if (filters.locations.size && !filters.locations.has(p.city)) return false
    if (filters.beds.size && !Array.from(filters.beds).some(b => p.beds >= b)) return false
    if (filters.statuses.size && !filters.statuses.has(p.status)) return false
    if (filters.furnishing.size && !filters.furnishing.has(p.furnishing)) return false
    if (p.price > filters.budgetMax) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const sortLabels: Record<string, string> = { "price-asc": "Price: Low to High", "price-desc": "Price: High to Low", "newest": "Newest First" }

  const toggleLike = (id: number) => setProperties(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p))

  return (
    <div style={{ backgroundColor: C.cream, minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: C.navy, padding: "48px 0 56px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            {[{ label: "Home", action: () => navigate("home") }, { label: "Properties", action: null }].map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <ChevronRight size={13} color="rgba(255,255,255,0.3)" />}
                {item.action ? (
                  <button onClick={item.action} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>{item.label}</button>
                ) : (
                  <span style={{ fontSize: 13, color: C.gold, fontFamily: "var(--font-sans)", fontWeight: 500 }}>{item.label}</span>
                )}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 44, fontWeight: 700, color: C.white, margin: "0 0 8px", lineHeight: 1.1 }}>Property Listings</h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", margin: 0 }}>
                {filtered.length} properties found across India's prime locations
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Mumbai", "Delhi", "Bengaluru", "Pune"].map(city => (
                <button key={city} onClick={() => { const s = new Set(filters.locations); if (s.has(city)) s.delete(city); else s.add(city); setFilters({ ...filters, locations: s }); setPage(1) }}
                  style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer", border: `1px solid ${filters.locations.has(city) ? C.gold : "rgba(255,255,255,0.15)"}`, backgroundColor: filters.locations.has(city) ? "#FDF3E3" : "rgba(255,255,255,0.07)", color: filters.locations.has(city) ? C.goldDark : "rgba(255,255,255,0.7)", transition: "all 0.15s" }}>
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 48px 64px" }}>
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* Sidebar */}
          <Sidebar filters={filters} setFilters={(f) => { setFilters(f); setPage(1) }} count={filtered.length} />

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Results header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, backgroundColor: C.white, borderRadius: 8, padding: "12px 16px", border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted, fontFamily: "var(--font-sans)" }}>
                Showing <strong style={{ color: C.navy }}>{(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)}</strong> of <strong style={{ color: C.navy }}>{sorted.length}</strong> properties
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Sort */}
                <div style={{ position: "relative" }}>
                  <button onClick={() => setSortOpen(!sortOpen)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 6, border: `1px solid ${C.border}`, backgroundColor: "transparent", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: C.navyMid, cursor: "pointer" }}>
                    <ArrowUpDown size={13} color={C.muted} />
                    {sortLabels[sort]}
                    <ChevronDown size={12} color={C.muted} style={{ transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {sortOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(15,23,42,0.1)", zIndex: 20, minWidth: 180, overflow: "hidden" }}>
                      {(["newest", "price-asc", "price-desc"] as const).map(s => (
                        <button key={s} onClick={() => { setSort(s); setSortOpen(false) }}
                          style={{ width: "100%", textAlign: "left", padding: "9px 14px", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, color: sort === s ? C.gold : C.navy, fontWeight: sort === s ? 600 : 400, backgroundColor: sort === s ? "#FDF3E3" : "transparent" }}>
                          {sortLabels[s]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* View toggle */}
                <div style={{ display: "flex", backgroundColor: C.creamDark, borderRadius: 6, padding: 2 }}>
                  {([["grid", <LayoutGrid size={14} />], ["list", <List size={14} />]] as const).map(([v, icon]) => (
                    <button key={v} onClick={() => setView(v)} style={{ width: 30, height: 30, borderRadius: 4, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: view === v ? C.white : "transparent", color: view === v ? C.navy : C.muted, boxShadow: view === v ? "0 1px 4px rgba(15,23,42,0.1)" : "none", transition: "all 0.15s" }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property grid / list */}
            {paginated.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", backgroundColor: C.white, borderRadius: 10, border: `1px solid ${C.border}` }}>
                <Building2 size={40} color={C.border} style={{ marginBottom: 16 }} />
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: C.navy, marginBottom: 8 }}>No properties found</div>
                <div style={{ fontSize: 14, color: C.muted, fontFamily: "var(--font-sans)" }}>Try adjusting your filters</div>
              </div>
            ) : view === "grid" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {paginated.map(p => <GridCard key={p.id} p={p} onLike={() => toggleLike(p.id)} navigate={navigate} />)}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {paginated.map(p => <ListRow key={p.id} p={p} onLike={() => toggleLike(p.id)} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 32, padding: "16px 20px", backgroundColor: C.white, borderRadius: 8, border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.muted, fontFamily: "var(--font-sans)" }}>Page {page} of {totalPages}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${C.border}`, backgroundColor: "transparent", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: page === 1 ? C.border : C.navyMid, cursor: page === 1 ? "not-allowed" : "pointer" }}>
                    ← Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${p === page ? C.gold : C.border}`, backgroundColor: p === page ? "#FDF3E3" : "transparent", color: p === page ? C.goldDark : C.navyMid, fontSize: 12, fontWeight: p === page ? 700 : 400, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${C.border}`, backgroundColor: "transparent", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: page === totalPages ? C.border : C.navyMid, cursor: page === totalPages ? "not-allowed" : "pointer" }}>
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
