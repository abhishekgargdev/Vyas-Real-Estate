import { useState } from "react"
import {
  Building2, MapPin, ChevronDown, Search, ShieldCheck, Handshake,
  HeadphonesIcon, BadgeDollarSign, Home as HomeIcon, Store, TreePine, Landmark,
  Star, Phone, Mail, ArrowRight, Bed, Bath, Square, Heart, Check,
} from "lucide-react"
import { C, SectionLabel, GoldDivider, Button, type Page } from "../shared"

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ navigate }: { navigate: (p: Page) => void }) {
  const [propType, setPropType] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState("")
  const [intent, setIntent] = useState("Buy")

  const Sel = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", marginBottom: 5, fontFamily: "var(--font-sans)" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 30px 10px 12px", border: "none", borderRight: `1px solid ${C.border}`, backgroundColor: "transparent", fontFamily: "var(--font-sans)", fontSize: 13, color: value ? C.navy : C.muted, cursor: "pointer", outline: "none", appearance: "none" }}>
          <option value="">{label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} color={C.muted} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
      </div>
    </div>
  )

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.navyLight }}>
      <img src="https://images.unsplash.com/photo-1566908829550-e6551b00979b?w=1920&h=1080&fit=crop&auto=format" alt="Luxury property exterior" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.5) 60%, rgba(15,23,42,0.82) 100%)" }} />
      <div style={{ position: "relative", textAlign: "center", maxWidth: 860, padding: "0 32px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 24, height: 1, backgroundColor: C.gold }} />
          <span style={{ fontSize: 11, letterSpacing: "0.14em", color: C.gold, fontFamily: "var(--font-sans)", fontWeight: 700 }}>INDIA'S TRUSTED REAL ESTATE BROKER</span>
          <div style={{ width: 24, height: 1, backgroundColor: C.gold }} />
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 64, fontWeight: 700, color: C.white, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
          Find Your<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Dream Property</em>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.68)", fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: "0 0 44px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          Discover verified residential, commercial, and luxury properties across India's top cities — with transparent pricing and end-to-end broker support.
        </p>
        <div style={{ backgroundColor: C.white, borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
            {["Buy", "Rent", "New Projects"].map(tab => (
              <button key={tab} onClick={() => setIntent(tab)} style={{ padding: "12px 20px", border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: tab === intent ? 700 : 400, color: tab === intent ? C.gold : C.muted, borderBottom: tab === intent ? `2px solid ${C.gold}` : "2px solid transparent", marginBottom: -1 }}>{tab}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Sel label="Property Type" value={propType} onChange={setPropType} options={["Apartment / Flat", "Villa", "Commercial Shop", "Plot / Land", "Penthouse"]} />
            <div style={{ width: 1, height: 40, backgroundColor: C.border, flexShrink: 0 }} />
            <Sel label="Location" value={location} onChange={setLocation} options={["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Chennai"]} />
            <div style={{ width: 1, height: 40, backgroundColor: C.border, flexShrink: 0 }} />
            <Sel label="Budget" value={budget} onChange={setBudget} options={["Under ₹50 L", "₹50L – ₹1 Cr", "₹1 Cr – ₹2 Cr", "₹2 Cr – ₹5 Cr", "Above ₹5 Cr"]} />
            <div style={{ padding: "12px 16px", flexShrink: 0 }}>
              <button onClick={() => navigate("listings")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 7, backgroundColor: C.gold, color: C.navy, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700 }}>
                <Search size={16} />Search
              </button>
            </div>
          </div>
        </div>
        <p style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)" }}>Popular: Bandra West · Whitefield · Jubilee Hills · Golf Course Road · Koramangala</p>
      </div>
    </section>
  )
}

// ── PROPERTY CARD ─────────────────────────────────────────────────────────────
const properties = [
  { id: 1, title: "Serenity Heights — 3BHK", location: "Bandra West, Mumbai", price: "₹2.8 Cr", beds: 3, baths: 3, area: "1,650 sqft", tag: "Flat", tagColor: "#3B82F6", tagBg: "#EFF6FF", image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop&auto=format", status: "Ready to Move" },
  { id: 2, title: "Greenwood Villas — 4BHK", location: "Whitefield, Bengaluru", price: "₹1.9 Cr", beds: 4, baths: 4, area: "2,400 sqft", tag: "Villa", tagColor: C.success, tagBg: "#DCFCE7", image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&h=400&fit=crop&auto=format", status: "Under Construction" },
  { id: 3, title: "Horizon Offices — 1,200 sqft", location: "Connaught Place, Delhi", price: "₹3.2 Cr", beds: 0, baths: 2, area: "1,200 sqft", tag: "Shop", tagColor: C.warning, tagBg: C.warningBg, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop&auto=format", status: "Available" },
  { id: 4, title: "Emerald Residency — 2BHK", location: "Jubilee Hills, Hyderabad", price: "₹1.1 Cr", beds: 2, baths: 2, area: "1,100 sqft", tag: "Flat", tagColor: "#3B82F6", tagBg: "#EFF6FF", image: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=600&h=400&fit=crop&auto=format", status: "Ready to Move" },
  { id: 5, title: "Azure Pool Villa — 5BHK", location: "Koregaon Park, Pune", price: "₹5.4 Cr", beds: 5, baths: 5, area: "4,200 sqft", tag: "Villa", tagColor: C.success, tagBg: "#DCFCE7", image: "https://images.unsplash.com/photo-1678889284769-b7dcbec1f082?w=600&h=400&fit=crop&auto=format", status: "New Launch" },
  { id: 6, title: "Skyline Studio — 1BHK", location: "Koramangala, Bengaluru", price: "₹72 L", beds: 1, baths: 1, area: "540 sqft", tag: "Flat", tagColor: "#3B82F6", tagBg: "#EFF6FF", image: "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=600&h=400&fit=crop&auto=format", status: "Ready to Move" },
]

function PropertyCard({ p, navigate }: { p: typeof properties[0]; navigate: (pg: Page) => void }) {
  const [hov, setHov] = useState(false)
  const [liked, setLiked] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ backgroundColor: C.white, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: hov ? "0 12px 40px rgba(15,23,42,0.12)" : "0 2px 8px rgba(15,23,42,0.05)", transition: "box-shadow 0.2s ease", flexShrink: 0, width: 340 }}>
      <div style={{ position: "relative", height: 210, backgroundColor: C.creamDark, overflow: "hidden" }}>
        <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: p.tagBg, color: p.tagColor, fontFamily: "var(--font-sans)" }}>{p.tag}</span>
        </div>
        <button onClick={e => { e.stopPropagation(); setLiked(!liked) }} style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={13} fill={liked ? C.alert : "none"} color={liked ? C.alert : C.navyMid} />
        </button>
        <div style={{ position: "absolute", bottom: 12, right: 12, backgroundColor: "rgba(15,23,42,0.7)", borderRadius: 4, padding: "3px 8px", fontSize: 10, fontWeight: 600, color: C.white, fontFamily: "var(--font-sans)", backdropFilter: "blur(4px)" }}>{p.status}</div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: C.navy, marginBottom: 5, lineHeight: 1.3 }}>{p.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
          <MapPin size={12} color={C.muted} />
          <span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.location}</span>
        </div>
        <div style={{ display: "flex", gap: 16, paddingBottom: 14, borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
          {p.beds > 0 && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Bed size={12} color={C.muted} /><span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.beds} Beds</span></span>}
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Bath size={12} color={C.muted} /><span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.baths} Baths</span></span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Square size={12} color={C.muted} /><span style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.area}</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: C.navy }}>{p.price}</span>
          <button onClick={() => navigate("listings")} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 6, border: `1.5px solid ${hov ? C.gold : C.border}`, color: hov ? C.goldDark : C.navyMid, backgroundColor: hov ? "#FDF3E3" : "transparent", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer", transition: "all 0.15s" }}>
            View Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── WHY CHOOSE US ─────────────────────────────────────────────────────────────
const values = [
  { icon: <ShieldCheck size={26} />, title: "Verified Properties", body: "Every listing undergoes RERA compliance checks and physical verification before it appears on our platform." },
  { icon: <Handshake size={26} />, title: "Trusted Broker Network", body: "Over 200 certified agents across 12 cities with a proven track record of transparent, ethical transactions." },
  { icon: <HeadphonesIcon size={26} />, title: "End-to-End Support", body: "From shortlisting to registration, dedicated relationship managers handle every step for you." },
  { icon: <BadgeDollarSign size={26} />, title: "Best Price Guarantee", body: "We negotiate directly with developers to secure the best market rate — no hidden charges, ever." },
]

// ── CATEGORIES ────────────────────────────────────────────────────────────────
const categories = [
  { label: "Residential Flats", count: "840+ listings", icon: <HomeIcon size={30} />, image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop&auto=format", desc: "2BHK, 3BHK, 4BHK and studio apartments across prime locations" },
  { label: "Commercial Shops", count: "210+ listings", icon: <Store size={30} />, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop&auto=format", desc: "Retail outlets, showrooms, and high-street commercial spaces" },
  { label: "Luxury Villas", count: "95+ listings", icon: <TreePine size={30} />, image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&h=400&fit=crop&auto=format", desc: "Independent villas with private pools, gardens, and premium finishes" },
  { label: "Plots & Land", count: "320+ listings", icon: <Landmark size={30} />, image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&h=400&fit=crop&auto=format", desc: "Residential and agricultural plots in developing micro-markets" },
]

// ── STATS ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "1,460+", label: "Properties Listed" },
  { value: "3,200+", label: "Happy Clients" },
  { value: "18", label: "Years of Experience" },
  { value: "12", label: "Cities Covered" },
]

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Priya Mehta", role: "Homebuyer, Mumbai", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format", review: "Vyas Real Estate made my first home purchase incredibly smooth. Their team guided me through every legal and financial step — no surprises, no hidden costs. I found my dream 3BHK in Bandra within three weeks.", rating: 5, property: "3BHK in Bandra West" },
  { name: "Rohan Sharma", role: "Investor, Delhi NCR", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format", review: "I've bought four commercial properties through Vyas over five years. Their market intelligence is sharp and they never push a listing — they genuinely understand my investment goals.", rating: 5, property: "Commercial Space, Connaught Place" },
  { name: "Anita Desai", role: "NRI Buyer, Hyderabad", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format", review: "As an NRI, I was worried about managing a property purchase from abroad. The Vyas team handled everything — site visits, documentation, and registration — remotely and professionally.", rating: 5, property: "Villa in Jubilee Hills" },
]

export default function Home({ navigate }: { navigate: (p: Page) => void }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [hovCat, setHovCat] = useState<number | null>(null)

  return (
    <>
      <Hero navigate={navigate} />

      {/* Featured Properties */}
      <section style={{ padding: "96px 0", backgroundColor: C.white }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
            <div>
              <SectionLabel>Featured Properties</SectionLabel>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: 0, lineHeight: 1.15 }}>Handpicked Listings<br />For Every Budget</h2>
            </div>
            <button onClick={() => navigate("listings")} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: C.goldDark, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${C.gold}`, paddingBottom: 2 }}>
              View All Properties <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
            {properties.map(p => <PropertyCard key={p.id} p={p} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "96px 0", backgroundColor: C.cream }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <GoldDivider center />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Why Choose Us</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: "10px 0 14px", lineHeight: 1.15 }}>The Vyas Difference</h2>
            <p style={{ fontSize: 15, color: C.muted, fontFamily: "var(--font-sans)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>We combine deep local expertise with transparent processes to make property buying genuinely stress-free.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{ backgroundColor: C.white, borderRadius: 10, padding: "32px 28px", border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(15,23,42,0.04)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, marginBottom: 18, backgroundColor: "#FDF3E3", color: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>{v.icon}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: C.navy, margin: "0 0 10px" }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: C.muted, fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section style={{ padding: "96px 0", backgroundColor: C.white }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
            <div>
              <SectionLabel>Browse by Category</SectionLabel>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: 0, lineHeight: 1.15 }}>What Are You<br />Looking For?</h2>
            </div>
            <p style={{ fontSize: 14, color: C.muted, fontFamily: "var(--font-sans)", maxWidth: 320, lineHeight: 1.7, margin: 0 }}>Explore curated property categories — from first homes to investment-grade commercial spaces.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {categories.map((cat, i) => (
              <button key={i} onClick={() => navigate("listings")} onMouseEnter={() => setHovCat(i)} onMouseLeave={() => setHovCat(null)}
                style={{ borderRadius: 10, overflow: "hidden", position: "relative", height: 280, border: "none", cursor: "pointer", boxShadow: hovCat === i ? "0 12px 40px rgba(15,23,42,0.18)" : "0 2px 8px rgba(15,23,42,0.06)", transition: "box-shadow 0.2s ease", backgroundColor: C.navyLight, padding: 0 }}>
                <img src={cat.image} alt={cat.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hovCat === i ? "scale(1.05)" : "scale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: hovCat === i ? "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 100%)" : "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 60%)", transition: "background 0.2s ease" }} />
                <div style={{ position: "absolute", inset: 0, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", textAlign: "left" }}>
                  <div style={{ color: C.gold, marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4 }}>{cat.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.05em", fontFamily: "var(--font-sans)", marginBottom: hovCat === i ? 8 : 0 }}>{cat.count}</div>
                  {hovCat === i && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>{cat.desc}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: C.navy, padding: "64px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 32px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 52, fontWeight: 700, color: C.gold, lineHeight: 1, marginBottom: 10 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", letterSpacing: "0.03em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "96px 0", backgroundColor: C.cream }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <GoldDivider center />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Client Stories</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: "10px 0 0", lineHeight: 1.15 }}>Trusted by Thousands</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} onClick={() => setActiveTestimonial(i)} style={{ backgroundColor: C.white, borderRadius: 10, padding: "32px 28px", border: `1px solid ${i === activeTestimonial ? C.gold : C.border}`, boxShadow: i === activeTestimonial ? "0 8px 32px rgba(212,161,94,0.12)" : "0 1px 6px rgba(15,23,42,0.04)", cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={13} fill={C.gold} color={C.gold} />)}
                </div>
                <p style={{ fontSize: 14, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: "0 0 24px", fontStyle: "italic" }}>"{t.review}"</p>
                <div style={{ paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <img src={t.photo} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: C.navy }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>{t.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Building2 size={11} color={C.muted} />
                    <span style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)" }}>{t.property}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === activeTestimonial ? C.gold : C.border, border: "none", cursor: "pointer", transition: "all 0.2s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "0 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", backgroundColor: C.navyLight, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
          <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=500&fit=crop&auto=format" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
          <div style={{ position: "relative", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 1, backgroundColor: C.gold }} />
              <span style={{ fontSize: 11, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", fontWeight: 700 }}>FOR PROPERTY OWNERS</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 42, fontWeight: 700, color: C.white, margin: "0 0 14px", lineHeight: 1.15 }}>List Your Property<br />With Us</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: 0, maxWidth: 440 }}>Reach 50,000+ serious buyers monthly. Our verified listings get 4× more enquiries than market average — with zero brokerage for sellers.</p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
            <Button size="lg" icon={<ArrowRight size={16} />}>List Property Free</Button>
            <button onClick={() => navigate("contact")} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 30px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.18)", color: C.white, fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)", cursor: "pointer", background: "none" }}>
              <Phone size={14} /> Request a Callback
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
