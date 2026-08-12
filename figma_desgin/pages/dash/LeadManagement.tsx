import { useState } from "react"
import { Plus, X, Phone, Mail, LayoutGrid, List, ChevronDown, Check, Clock, Building2, ArrowRight, Edit2, Trash2 } from "lucide-react"
import { DashLayout, D, FLabel, FInput, FSelect, FTextarea, DBtn, StatusPill } from "../../components/DashLayout"
import type { Page } from "../../shared"

type LeadStatus = "new" | "contacted" | "visit-scheduled" | "negotiation" | "closed" | "lost"

interface Lead {
  id: string; name: string; initials: string; property: string; type: string;
  budget: string; phone: string; email: string; location: string;
  status: LeadStatus; lastContact: string; visitDate: string; notes: string;
}

const LEADS: Lead[] = [
  { id: "L001", name: "Priya Mehta", initials: "PM", property: "Serenity Heights 3BHK", type: "Flat", budget: "₹2–3 Cr", phone: "+91 98210 34567", email: "priya@email.com", location: "Mumbai", status: "negotiation", lastContact: "Aug 10", visitDate: "Aug 14", notes: "Wants sea view. Flexible on floor." },
  { id: "L002", name: "Rohan Sharma", initials: "RS", property: "Park Avenue Studio", type: "Studio", budget: "₹70L–1 Cr", phone: "+91 97300 12456", email: "rohan@email.com", location: "Delhi", status: "new", lastContact: "Aug 8", visitDate: "Aug 16", notes: "First-time buyer. Pre-approved loan." },
  { id: "L003", name: "Anita Desai", initials: "AD", property: "Greenwood Villa 4BHK", type: "Villa", budget: "₹1.5–2.5 Cr", phone: "+91 99220 87654", email: "anita@email.com", location: "Bengaluru", status: "closed", lastContact: "Aug 5", visitDate: "Aug 10", notes: "Deal finalised at 1.9 Cr." },
  { id: "L004", name: "Vikram Nair", initials: "VN", property: "Horizon Tower 2BHK", type: "Flat", budget: "₹90L–1.2 Cr", phone: "+91 90000 11111", email: "vikram@email.com", location: "Pune", status: "lost", lastContact: "Jul 30", visitDate: "Aug 5", notes: "Went with competitor." },
  { id: "L005", name: "Sunita Kapoor", initials: "SK", property: "Emerald Coast Duplex", type: "Villa", budget: "₹3–5 Cr", phone: "+91 99900 22222", email: "sunita@email.com", location: "Mumbai", status: "visit-scheduled", lastContact: "Aug 9", visitDate: "Aug 18", notes: "NRI. Available on weekends." },
  { id: "L006", name: "Aryan Bose", initials: "AB", property: "Skyline Studio 1BHK", type: "Studio", budget: "₹65–80 L", phone: "+91 88800 33333", email: "aryan@email.com", location: "Bengaluru", status: "contacted", lastContact: "Aug 11", visitDate: "Aug 19", notes: "Student. Looking for investment." },
  { id: "L007", name: "Kavya Iyer", initials: "KI", property: "Priya Towers 3BHK", type: "Flat", budget: "₹2–2.5 Cr", phone: "+91 77700 44444", email: "kavya@email.com", location: "Mumbai", status: "new", lastContact: "Aug 11", visitDate: "—", notes: "Referred by Priya Mehta." },
  { id: "L008", name: "Sameer Gupta", initials: "SG", property: "Grand Residences 4BHK", type: "Flat", budget: "₹3.5–5 Cr", phone: "+91 66600 55555", email: "sameer@email.com", location: "Delhi", status: "contacted", lastContact: "Aug 7", visitDate: "Aug 20", notes: "Premium segment. Negotiating." },
]

const COLUMNS: { status: LeadStatus; label: string; color: string }[] = [
  { status: "new", label: "New Inquiry", color: "#7C3AED" },
  { status: "contacted", label: "Contacted", color: "#2563EB" },
  { status: "visit-scheduled", label: "Visit Scheduled", color: D.gold },
  { status: "negotiation", label: "Negotiation", color: D.warning },
  { status: "closed", label: "Closed", color: D.success },
  { status: "lost", label: "Lost", color: D.muted },
]

const avatarColors = ["#1E293B", "#2D4A6B", "#3D3D5C", "#2A4535", "#4A2D35", "#3A2D4A", "#2D3A4A", "#4A3A2D"]

function KanbanCard({ lead, onClick, onMove }: { lead: Lead; onClick: () => void; onMove: (status: LeadStatus) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const bg = avatarColors[lead.name.charCodeAt(0) % avatarColors.length]
  return (
    <div onClick={onClick}
      style={{ backgroundColor: D.white, borderRadius: 8, padding: "12px 14px", border: `1px solid ${D.border}`, marginBottom: 8, cursor: "pointer", boxShadow: "0 1px 4px rgba(15,23,42,0.05)", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sans)" }}>{lead.initials}</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)" }}>{lead.name}</div>
            <div style={{ fontSize: 10, color: D.muted, fontFamily: "var(--font-sans)" }}>{lead.location}</div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
            style={{ width: 22, height: 22, borderRadius: 4, border: "none", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronDown size={12} color={D.muted} />
          </button>
          {menuOpen && (
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", right: 0, top: "100%", backgroundColor: D.white, border: `1px solid ${D.border}`, borderRadius: 7, boxShadow: "0 4px 16px rgba(15,23,42,0.1)", zIndex: 20, minWidth: 160, overflow: "hidden" }}>
              {COLUMNS.filter(c => c.status !== lead.status).slice(0, 4).map(c => (
                <button key={c.status} onClick={() => { onMove(c.status); setMenuOpen(false) }}
                  style={{ width: "100%", textAlign: "left", padding: "7px 12px", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 11, color: D.navy, backgroundColor: "transparent" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = D.creamDark)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}>
                  → {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ fontSize: 11, color: D.navyMid, fontFamily: "var(--font-sans)", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.property}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: D.goldDark, fontFamily: "var(--font-sans)" }}>{lead.budget}</span>
        <button onClick={e => { e.stopPropagation() }} style={{ width: 24, height: 24, borderRadius: "50%", border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Phone size={11} color={D.muted} />
        </button>
      </div>
      {lead.visitDate !== "—" && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${D.border}` }}>
          <Clock size={10} color={D.muted} />
          <span style={{ fontSize: 10, color: D.muted, fontFamily: "var(--font-sans)" }}>Visit: {lead.visitDate}</span>
        </div>
      )}
    </div>
  )
}

function AddClientModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", budget: "", location: "", notes: "" })
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: D.white, borderRadius: 12, width: 520, boxShadow: "0 24px 64px rgba(15,23,42,0.2)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: D.navy }}>Add New Client</div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={13} color={D.muted} /></button>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div><FLabel>Full Name</FLabel><FInput placeholder="e.g. Priya Mehta" value={form.name} onChange={v => setForm({ ...form, name: v })} /></div>
            <div><FLabel>Phone</FLabel><FInput placeholder="+91 98210 00000" type="tel" value={form.phone} onChange={v => setForm({ ...form, phone: v })} /></div>
            <div><FLabel>Email</FLabel><FInput placeholder="client@email.com" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} /></div>
            <div><FLabel>Interested In</FLabel><FSelect value={form.type} onChange={v => setForm({ ...form, type: v })} options={["Flat", "Villa", "Shop", "Studio", "Plot"]} placeholder="Property type..." /></div>
            <div><FLabel>Budget Range</FLabel><FSelect value={form.budget} onChange={v => setForm({ ...form, budget: v })} options={["Under ₹50L", "₹50L–₹1Cr", "₹1–2 Cr", "₹2–5 Cr", "Above ₹5 Cr"]} placeholder="Select range..." /></div>
            <div><FLabel>Preferred Location</FLabel><FSelect value={form.location} onChange={v => setForm({ ...form, location: v })} options={["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad"]} placeholder="Select city..." /></div>
          </div>
          <div><FLabel>Notes</FLabel><FTextarea placeholder="Requirements, source, special instructions..." value={form.notes} onChange={v => setForm({ ...form, notes: v })} rows={2} /></div>
        </div>
        <div style={{ padding: "14px 24px 20px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <DBtn variant="secondary" onClick={onClose}>Cancel</DBtn>
          <DBtn onClick={onClose}>Add Client</DBtn>
        </div>
      </div>
    </div>
  )
}

function ClientPanel({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const bg = avatarColors[lead.name.charCodeAt(0) % avatarColors.length]
  const timeline = [
    { date: "Aug 11", action: "Added note — prefers weekend viewings", type: "note" },
    { date: "Aug 10", action: "Follow-up call — 12 min. Discussed pricing flexibility.", type: "call" },
    { date: "Aug 8", action: "Property shortlist sent via WhatsApp (3 listings)", type: "message" },
    { date: "Aug 5", action: "Initial inquiry received via website", type: "inquiry" },
  ]
  return (
    <div style={{ width: 360, backgroundColor: D.white, borderLeft: `1px solid ${D.border}`, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, backgroundColor: D.white, zIndex: 10 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: D.navy }}>Client Profile</div>
        <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={13} color={D.muted} /></button>
      </div>

      {/* Profile */}
      <div style={{ padding: "20px", borderBottom: `1px solid ${D.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sans)" }}>{lead.initials}</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: D.navy }}>{lead.name}</div>
            <StatusPill status={lead.status} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {[
            { icon: <Phone size={13} />, val: lead.phone },
            { icon: <Mail size={13} />, val: lead.email },
            { icon: <Building2 size={13} />, val: `${lead.type} · ${lead.location}` },
            { icon: <ChevronDown size={13} />, val: `Budget: ${lead.budget}` },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: D.gold, flexShrink: 0 }}>{r.icon}</span>
              <span style={{ fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)" }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 7, backgroundColor: D.creamDark, border: `1px solid ${D.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: D.muted, letterSpacing: "0.05em", fontFamily: "var(--font-sans)", marginBottom: 4 }}>INTERESTED IN</div>
          <div style={{ fontSize: 13, color: D.navy, fontFamily: "var(--font-sans)" }}>{lead.property}</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", gap: 8 }}>
        <DBtn size="sm" icon={<Phone size={12} />} fullWidth>Call</DBtn>
        <DBtn size="sm" variant="secondary" icon={<Mail size={12} />} fullWidth>Email</DBtn>
        <DBtn size="sm" variant="secondary" icon={<Edit2 size={12} />} fullWidth>Edit</DBtn>
      </div>

      {/* Interaction timeline */}
      <div style={{ padding: "16px 20px", flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: D.navyMid, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", marginBottom: 14 }}>INTERACTION HISTORY</div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 1, backgroundColor: D.border }} />
          {timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, position: "relative" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: i === 0 ? D.gold : D.creamDark, border: `2px solid ${i === 0 ? D.goldDark : D.border}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                {i === 0 && <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: D.navy }} />}
              </div>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <div style={{ fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>{t.action}</div>
                <div style={{ fontSize: 10, color: D.muted, fontFamily: "var(--font-sans)", marginTop: 3 }}>{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div style={{ padding: "14px 20px", borderTop: `1px solid ${D.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: D.navyMid, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", marginBottom: 8 }}>NOTES</div>
        <textarea defaultValue={lead.notes} rows={3}
          style={{ width: "100%", padding: "9px 11px", borderRadius: 7, border: `1px solid ${D.border}`, fontFamily: "var(--font-sans)", fontSize: 12, color: D.navy, resize: "none", outline: "none", boxSizing: "border-box" }} />
        <DBtn size="sm" fullWidth variant="secondary" onClick={() => {}} style={{ marginTop: 8 }}>Save Note</DBtn>
      </div>
    </div>
  )
}

export default function LeadManagement({ navigate }: { navigate: (p: Page) => void }) {
  const [view, setView] = useState<"kanban" | "table">("kanban")
  const [leads, setLeads] = useState(LEADS)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [addOpen, setAddOpen] = useState(false)

  const moveCard = (id: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
  }

  return (
    <DashLayout page="leads" navigate={navigate} title="Clients & Leads">
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", backgroundColor: D.creamDark, borderRadius: 7, padding: 3 }}>
            {([["kanban", <LayoutGrid size={14} />, "Kanban"], ["table", <List size={14} />, "Table"]] as const).map(([v, icon, label]) => (
              <button key={v} onClick={() => setView(v)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 5, border: "none", cursor: "pointer", backgroundColor: view === v ? D.white : "transparent", color: view === v ? D.navy : D.muted, fontSize: 12, fontWeight: view === v ? 600 : 400, fontFamily: "var(--font-sans)", boxShadow: view === v ? "0 1px 4px rgba(15,23,42,0.08)" : "none" }}>
                {icon} {label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{leads.length} total leads</span>
        </div>
        <DBtn size="sm" icon={<Plus size={13} />} onClick={() => setAddOpen(true)}>Add Client</DBtn>
      </div>

      {view === "kanban" ? (
        <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
          {COLUMNS.map(col => {
            const colLeads = leads.filter(l => l.status === col.status)
            return (
              <div key={col.status} style={{ flex: "0 0 230px", marginRight: 12 }}>
                <div style={{ marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: col.color }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: D.navy, fontFamily: "var(--font-sans)" }}>{col.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: D.muted, backgroundColor: D.creamDark, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)" }}>{colLeads.length}</span>
                </div>
                <div style={{ minHeight: 120, backgroundColor: col.status === "closed" ? "#F0FDF4" : col.status === "lost" ? D.creamDark : D.bg, borderRadius: 8, padding: "8px 8px 2px", border: `1px solid ${D.border}` }}>
                  {colLeads.map(lead => (
                    <KanbanCard key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} onMove={(s) => moveCard(lead.id, s)} />
                  ))}
                  {colLeads.length === 0 && (
                    <div style={{ textAlign: "center", padding: "20px 0", fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>No leads</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: D.cream }}>
                {["Client", "Phone", "Interested In", "Budget", "Assigned Property", "Visit Date", "Status", "Last Contact", ""].map((h, i) => (
                  <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id}
                  style={{ borderBottom: `1px solid ${D.border}`, cursor: "pointer", backgroundColor: i % 2 === 0 ? D.white : "#FDFCFA" }}
                  onClick={() => setSelectedLead(lead)}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = D.creamDark)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = i % 2 === 0 ? D.white : "#FDFCFA")}
                >
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: avatarColors[lead.name.charCodeAt(0) % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sans)" }}>{lead.initials}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: D.navy, fontFamily: "var(--font-sans)" }}>{lead.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)" }}>{lead.phone}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: D.navyMid, backgroundColor: D.creamDark, padding: "3px 9px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>{lead.type}</span>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)" }}>{lead.budget}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)", maxWidth: 160 }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.property}</span>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{lead.visitDate}</td>
                  <td style={{ padding: "11px 14px" }}><StatusPill status={lead.status} /></td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{lead.lastContact}</td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={e => { e.stopPropagation() }} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Phone size={12} color={D.muted} /></button>
                      <button onClick={e => { e.stopPropagation() }} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={12} color={D.gold} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Side panel */}
      {selectedLead && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
          <div onClick={() => setSelectedLead(null)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15,23,42,0.3)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 360 }}>
            <ClientPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
          </div>
        </div>
      )}

      {addOpen && <AddClientModal onClose={() => setAddOpen(false)} />}
    </DashLayout>
  )
}
