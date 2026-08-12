import { useState } from "react"
import { Heart, Calendar, Search, Bell, ChevronRight, MapPin, Clock, Check, X, Sliders, Home, BookOpen, Star } from "lucide-react"
import type { Page } from "../shared"
import { C } from "../shared"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <Home size={16} /> },
  { id: "browse", label: "Browse Properties", icon: <Search size={16} /> },
  { id: "saved", label: "Saved", icon: <Heart size={16} /> },
  { id: "visits", label: "My Visits", icon: <Calendar size={16} /> },
  { id: "profile", label: "Profile", icon: <BookOpen size={16} /> },
]

const ENQUIRIES = [
  { id: "E001", property: "Serenity Heights 3BHK", location: "Bandra West, Mumbai", price: "₹2.8 Cr", status: "negotiation", date: "Aug 8", image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=120&h=80&fit=crop&auto=format" },
  { id: "E002", property: "Greenwood Villa 4BHK", location: "Whitefield, Bengaluru", price: "₹1.9 Cr", status: "visit-scheduled", date: "Aug 10", image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=120&h=80&fit=crop&auto=format" },
  { id: "E003", property: "Park Avenue Studio", location: "Connaught Place, Delhi", price: "₹82 L", status: "contacted", date: "Aug 11", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=120&h=80&fit=crop&auto=format" },
]

const SAVED_PROPS = [
  { id: 1, title: "Azure Pool Villa 5BHK", location: "Koregaon Park, Pune", price: "₹5.4 Cr", type: "Villa", status: "new-launch", image: "https://images.unsplash.com/photo-1678889284769-b7dcbec1f082?w=360&h=220&fit=crop&auto=format" },
  { id: 2, title: "Skyline Studio 1BHK", location: "Koramangala, Bengaluru", price: "₹72 L", type: "Flat", status: "ready", image: "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=360&h=220&fit=crop&auto=format" },
  { id: 3, title: "Priya Towers 3BHK", location: "Andheri West, Mumbai", price: "₹2.1 Cr", type: "Flat", status: "under-construction", image: "https://images.unsplash.com/photo-1549499090-c9203d2b20ad?w=360&h=220&fit=crop&auto=format" },
]

const VISITS = [
  { id: "V001", property: "Serenity Heights 3BHK", location: "Bandra West, Mumbai", date: "Aug 14, 2026", time: "10:00 AM", broker: "Rajesh Vyas", status: "upcoming" },
  { id: "V002", property: "Greenwood Villa 4BHK", location: "Whitefield, Bengaluru", date: "Aug 18, 2026", time: "3:00 PM", broker: "Meera Shah", status: "upcoming" },
  { id: "V003", property: "Horizon Tower 2BHK", location: "Connaught Place, Delhi", date: "Aug 5, 2026", time: "11:00 AM", broker: "Amit Kulkarni", status: "completed" },
]

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  "negotiation": { label: "Negotiation", color: "#D97706", bg: "#FFFBEB" },
  "visit-scheduled": { label: "Visit Scheduled", color: "#2563EB", bg: "#EFF6FF" },
  "contacted": { label: "Contacted", color: "#7C3AED", bg: "#F5F3FF" },
  "new-inquiry": { label: "New Inquiry", color: "#0F172A", bg: "#F1F5F9" },
  "closed": { label: "Closed", color: "#059669", bg: "#F0FDF4" },
  "ready": { label: "Ready", color: "#059669", bg: "#F0FDF4" },
  "under-construction": { label: "Under Construction", color: "#D97706", bg: "#FFFBEB" },
  "new-launch": { label: "New Launch", color: "#7C3AED", bg: "#F5F3FF" },
}

function StatusBadge({ status }: { status: string }) {
  const m = STATUS_META[status] || { label: status, color: "#64748B", bg: "#F8FAFC" }
  return <span style={{ fontSize: 11, fontWeight: 700, color: m.color, backgroundColor: m.bg, padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>{m.label}</span>
}

const PIPELINE_STEPS = ["Inquiry", "Contacted", "Visit", "Negotiation", "Closed"]

function EnquiryTracker({ enquiry }: { enquiry: typeof ENQUIRIES[0] }) {
  const stepIndex = enquiry.status === "contacted" ? 1 : enquiry.status === "visit-scheduled" ? 2 : enquiry.status === "negotiation" ? 3 : 0
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "16px 20px", marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
        <div style={{ width: 80, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
          <img src={enquiry.image} alt={enquiry.property} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-sans)", marginBottom: 3 }}>{enquiry.property}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
            <MapPin size={10} color="#94A3B8" />
            <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "var(--font-sans)" }}>{enquiry.location}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{enquiry.price}</span>
            <StatusBadge status={enquiry.status} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: i < PIPELINE_STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: i <= stepIndex ? "#D4A15E" : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", border: i === stepIndex ? "2px solid #B8860B" : "none", flexShrink: 0 }}>
                {i < stepIndex ? <Check size={10} color="#fff" /> : <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: i === stepIndex ? "#fff" : "#94A3B8" }} />}
              </div>
              <span style={{ fontSize: 9, color: i <= stepIndex ? "#D4A15E" : "#94A3B8", fontFamily: "var(--font-sans)", fontWeight: i === stepIndex ? 700 : 400, whiteSpace: "nowrap" }}>{step}</span>
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, backgroundColor: i < stepIndex ? "#D4A15E" : "#E2E8F0", marginBottom: 16, marginLeft: 2, marginRight: 2 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CustomerPortal({ navigate }: { navigate: (p: Page) => void }) {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [savedIds, setSavedIds] = useState(new Set([1, 2, 3]))

  const toggleSaved = (id: number) => {
    const s = new Set(savedIds)
    s.has(id) ? s.delete(id) : s.add(id)
    setSavedIds(s)
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8F7F4", fontFamily: "var(--font-sans)" }}>
      {/* Top nav */}
      <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 6px rgba(15,23,42,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", height: 64 }}>
          {/* Logo */}
          <div onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginRight: 40 }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, backgroundColor: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700, color: "#D4A15E" }}>V</span>
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Vyas Realty</span>
          </div>

          {/* Nav items */}
          <div style={{ display: "flex", gap: 4, flex: 1 }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: activeNav === item.id ? "#FDF3E3" : "transparent", color: activeNav === item.id ? "#B8860B" : "#475569", fontSize: 13, fontWeight: activeNav === item.id ? 600 : 400, fontFamily: "var(--font-sans)" }}>
                <span style={{ color: activeNav === item.id ? "#D4A15E" : "#94A3B8" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ width: 38, height: 38, borderRadius: 9, border: "1px solid #E2E8F0", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Bell size={16} color="#64748B" />
              <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", backgroundColor: "#D4A15E", border: "1.5px solid #fff" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", padding: "6px 12px", borderRadius: 9, border: "1px solid #E2E8F0", backgroundColor: "#fff" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>PM</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#0F172A", fontFamily: "var(--font-sans)" }}>Priya Mehta</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>Welcome back, Priya 👋</div>
          <div style={{ fontSize: 14, color: "#64748B", fontFamily: "var(--font-sans)" }}>Here's a summary of your property journey with Vyas Realty</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Left column */}
          <div>
            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
              {[
                { icon: <BookOpen size={18} />, label: "Active Enquiries", val: "3", color: "#7C3AED", bg: "#F5F3FF" },
                { icon: <Heart size={18} />, label: "Saved Properties", val: savedIds.size.toString(), color: "#D4A15E", bg: "#FDF3E3" },
                { icon: <Calendar size={18} />, label: "Upcoming Visits", val: "2", color: "#2563EB", bg: "#EFF6FF" },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: "#fff", borderRadius: 10, padding: "16px 18px", border: "1px solid #E2E8F0" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 9, backgroundColor: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: s.color }}>{s.icon}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: "#0F172A", marginBottom: 2 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", fontFamily: "var(--font-sans)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* My Enquiries */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: "#0F172A" }}>My Enquiries</div>
                <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#D4A15E", fontWeight: 600, border: "none", backgroundColor: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)" }}>View all <ChevronRight size={13} /></button>
              </div>
              {ENQUIRIES.map(e => <EnquiryTracker key={e.id} enquiry={e} />)}
            </div>

            {/* Saved Properties */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Saved Properties</div>
                <button onClick={() => navigate("listings")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#D4A15E", fontWeight: 600, border: "none", backgroundColor: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Browse more <ChevronRight size={13} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {SAVED_PROPS.map(prop => (
                  <div key={prop.id} style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
                    <div style={{ position: "relative" }}>
                      <img src={prop.image} alt={prop.title} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                      <button onClick={() => toggleSaved(prop.id)}
                        style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", backgroundColor: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                        <Heart size={14} color={savedIds.has(prop.id) ? "#D4A15E" : "#94A3B8"} fill={savedIds.has(prop.id) ? "#D4A15E" : "none"} />
                      </button>
                      <StatusBadge status={prop.status} />
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-sans)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{prop.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 8 }}>
                        <MapPin size={10} color="#94A3B8" />
                        <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "var(--font-sans)" }}>{prop.location}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{prop.price}</span>
                        <button onClick={() => navigate("property")} style={{ fontSize: 11, fontWeight: 600, color: "#D4A15E", border: "none", backgroundColor: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)" }}>View →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Upcoming Visits */}
            <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #E2E8F0" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Upcoming Visits</div>
              </div>
              <div>
                {VISITS.map((v, i) => (
                  <div key={v.id} style={{ padding: "14px 18px", borderBottom: i < VISITS.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-sans)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.property}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                      <Clock size={11} color="#94A3B8" />
                      <span style={{ fontSize: 11, color: "#64748B", fontFamily: "var(--font-sans)" }}>{v.date} · {v.time}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "var(--font-sans)", marginBottom: 8 }}>Agent: {v.broker}</div>
                    {v.status === "completed" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#059669", fontFamily: "var(--font-sans)" }}><Check size={11} /> Completed</div>
                    ) : (
                      <div style={{ display: "flex", gap: 7 }}>
                        <button style={{ flex: 1, padding: "5px 0", borderRadius: 6, border: "1px solid #E2E8F0", backgroundColor: "transparent", fontSize: 11, color: "#64748B", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Reschedule</button>
                        <button style={{ width: 30, borderRadius: 6, border: "1px solid #FEE2E2", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <X size={11} color="#EF4444" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Sliders size={16} color="#D4A15E" />
                <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>My Preferences</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Property Type", val: "Flat, Villa" },
                  { label: "Budget", val: "₹2–4 Cr" },
                  { label: "Location", val: "Mumbai, Pune" },
                  { label: "Bedrooms", val: "3+ BHK" },
                ].map(p => (
                  <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-sans)" }}>{p.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-sans)" }}>{p.val}</span>
                  </div>
                ))}
              </div>
              <button style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "1px solid #D4A15E", backgroundColor: "transparent", color: "#B8860B", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                Update Preferences
              </button>
            </div>

            {/* Broker contact */}
            <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#D4A15E", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: 10 }}>YOUR DEDICATED BROKER</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", backgroundColor: "#D4A15E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", fontFamily: "var(--font-sans)" }}>RV</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "var(--font-sans)", marginBottom: 2 }}>Rajesh Vyas</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} fill="#D4A15E" color="#D4A15E" />)}
                    <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "var(--font-sans)", marginLeft: 3 }}>5.0</span>
                  </div>
                </div>
              </div>
              <button style={{ width: "100%", padding: "10px 0", borderRadius: 8, backgroundColor: "#D4A15E", border: "none", color: "#0F172A", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                Contact Broker
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
