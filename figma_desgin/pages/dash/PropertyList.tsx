import { useState } from "react"
import { Plus, Search, Filter, Edit2, Trash2, Eye, MoreHorizontal, ChevronDown, Building2 } from "lucide-react"
import { DashLayout, D, DBtn, StatusPill } from "../../components/DashLayout"
import type { Page } from "../../shared"

const PROPS = [
  { id: 1, thumb: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=80&h=60&fit=crop&auto=format", title: "Serenity Heights — 3BHK", type: "Flat", location: "Bandra West, Mumbai", price: "₹2.8 Cr", status: "ready", date: "Aug 1, 2025", featured: true },
  { id: 2, thumb: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=80&h=60&fit=crop&auto=format", title: "Greenwood Villas — 4BHK", type: "Villa", location: "Whitefield, Bengaluru", price: "₹1.9 Cr", status: "under-construction", date: "Jul 28, 2025", featured: false },
  { id: 3, thumb: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=80&h=60&fit=crop&auto=format", title: "Horizon Tower Offices", type: "Shop", location: "Connaught Place, Delhi", price: "₹3.2 Cr", status: "ready", date: "Jul 20, 2025", featured: true },
  { id: 4, thumb: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=80&h=60&fit=crop&auto=format", title: "Emerald Residency — 2BHK", type: "Flat", location: "Jubilee Hills, Hyderabad", price: "₹1.1 Cr", status: "ready", date: "Jul 15, 2025", featured: false },
  { id: 5, thumb: "https://images.unsplash.com/photo-1678889284769-b7dcbec1f082?w=80&h=60&fit=crop&auto=format", title: "Azure Pool Villa — 5BHK", type: "Villa", location: "Koregaon Park, Pune", price: "₹5.4 Cr", status: "new-launch", date: "Aug 5, 2025", featured: true },
  { id: 6, thumb: "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=80&h=60&fit=crop&auto=format", title: "Skyline Studio — 1BHK", type: "Flat", location: "Koramangala, Bengaluru", price: "₹72 L", status: "ready", date: "Jul 10, 2025", featured: false },
  { id: 7, thumb: "https://images.unsplash.com/photo-1549499090-c9203d2b20ad?w=80&h=60&fit=crop&auto=format", title: "Priya Towers — 3BHK", type: "Flat", location: "Andheri West, Mumbai", price: "₹2.1 Cr", status: "under-construction", date: "Jun 30, 2025", featured: false },
  { id: 8, thumb: "https://images.unsplash.com/photo-1779976955613-b74623824d1c?w=80&h=60&fit=crop&auto=format", title: "The Grand Residences 4BHK", type: "Flat", location: "Golf Course Road, Delhi", price: "₹4.2 Cr", status: "new-launch", date: "Aug 8, 2025", featured: true },
  { id: 9, thumb: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=80&h=60&fit=crop&auto=format", title: "Lakeview Bungalow 6BHK", type: "Villa", location: "Lavasa, Pune", price: "₹8.5 Cr", status: "sold", date: "Jun 15, 2025", featured: false },
]

export default function PropertyList({ navigate }: { navigate: (p: Page) => void }) {
  const [search, setSearch] = useState("")
  const [typeF, setTypeF] = useState("")
  const [statusF, setStatusF] = useState("")
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [actionOpen, setActionOpen] = useState<number | null>(null)

  const filtered = PROPS.filter(p => {
    if (typeF && p.type !== typeF) return false
    if (statusF && p.status !== statusF) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const toggleSel = (id: number) => {
    const s = new Set(selected)
    if (s.has(id)) s.delete(id); else s.add(id)
    setSelected(s)
  }

  const Sel = ({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) => (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: "8px 28px 8px 12px", borderRadius: 7, border: `1px solid ${D.border}`, fontFamily: "var(--font-sans)", fontSize: 12, color: value ? D.navy : D.muted, backgroundColor: D.white, appearance: "none", cursor: "pointer", outline: "none" }}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={12} color={D.muted} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
    </div>
  )

  return (
    <DashLayout page="properties" navigate={navigate} title="Properties">
      {/* Filter bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
          <div style={{ position: "relative", flex: "0 0 260px" }}>
            <Search size={13} color={D.muted} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input placeholder="Search properties..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 30, paddingRight: 12, height: 36, width: "100%", border: `1px solid ${D.border}`, borderRadius: 7, fontSize: 12, fontFamily: "var(--font-sans)", color: D.navy, backgroundColor: D.white, outline: "none", boxSizing: "border-box" }} />
          </div>
          <Sel value={typeF} onChange={setTypeF} options={["Flat", "Villa", "Shop", "Plot"]} placeholder="All Types" />
          <Sel value={statusF} onChange={setStatusF} options={["ready", "under-construction", "new-launch", "sold"]} placeholder="All Statuses" />
          <button onClick={() => { setSearch(""); setTypeF(""); setStatusF("") }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 12px", borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: "transparent", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", cursor: "pointer" }}>
            <Filter size={12} /> Reset
          </button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {selected.size > 0 && (
            <DBtn variant="danger" size="sm" onClick={() => setSelected(new Set())}>Delete ({selected.size})</DBtn>
          )}
          <DBtn size="sm" icon={<Plus size={13} />} onClick={() => navigate("property-form")}>Add Property</DBtn>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy }}>All Properties</span>
            <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{filtered.length} results</span>
          </div>
          {selected.size > 0 && <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{selected.size} selected</span>}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: D.cream }}>
                <th style={{ width: 40, padding: "10px 16px" }}>
                  <input type="checkbox" onChange={e => setSelected(e.target.checked ? new Set(filtered.map(p => p.id)) : new Set())} style={{ cursor: "pointer" }} />
                </th>
                {["Property", "Type", "Location", "Price", "Status", "Date Added", ""].map((h, i) => (
                  <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const sel = selected.has(p.id)
                return (
                  <tr key={p.id}
                    style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: sel ? "#FDF9F3" : i % 2 === 0 ? D.white : "#FDFCFA" }}
                    onMouseEnter={e => !sel && ((e.currentTarget as HTMLElement).style.backgroundColor = D.creamDark)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = sel ? "#FDF9F3" : i % 2 === 0 ? D.white : "#FDFCFA")}
                  >
                    <td style={{ padding: "12px 16px" }}><input type="checkbox" checked={sel} onChange={() => toggleSel(p.id)} style={{ cursor: "pointer" }} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 72, height: 48, borderRadius: 6, overflow: "hidden", flexShrink: 0, backgroundColor: D.creamDark }}>
                          <img src={p.thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)" }}>{p.title}</div>
                          {p.featured && <span style={{ fontSize: 10, fontWeight: 700, color: D.goldDark, backgroundColor: "#FDF3E3", padding: "1px 7px", borderRadius: 20, fontFamily: "var(--font-sans)", marginTop: 3, display: "inline-block" }}>FEATURED</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: D.navyMid, backgroundColor: D.creamDark, padding: "3px 9px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>{p.type}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", maxWidth: 160 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.location}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 700, color: D.navy }}>{p.price}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}><StatusPill status={p.status} /></td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{p.date}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4, position: "relative" }}>
                        <button onClick={() => navigate("property")} title="View" style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={13} color={D.navyMid} /></button>
                        <button onClick={() => navigate("property-form")} title="Edit" style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={13} color={D.gold} /></button>
                        <button onClick={() => setDeleteId(p.id)} title="Delete" style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={13} color={D.alert} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>Showing {filtered.length} of {PROPS.length} properties</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map(n => (
              <button key={n} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${n === 1 ? D.gold : D.border}`, backgroundColor: n === 1 ? "#FDF3E3" : "transparent", color: n === 1 ? D.goldDark : D.navyMid, fontSize: 12, fontWeight: n === 1 ? 700 : 400, cursor: "pointer", fontFamily: "var(--font-sans)" }}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div onClick={() => setDeleteId(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: D.white, borderRadius: 12, padding: "32px", maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(15,23,42,0.2)" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Trash2 size={22} color={D.alert} />
            </div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: D.navy, marginBottom: 8 }}>Delete Property?</div>
              <div style={{ fontSize: 14, color: D.muted, fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>This action cannot be undone. All data associated with this listing will be permanently removed.</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <DBtn variant="secondary" fullWidth onClick={() => setDeleteId(null)}>Cancel</DBtn>
              <DBtn variant="danger" fullWidth onClick={() => setDeleteId(null)}>Delete Listing</DBtn>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  )
}
