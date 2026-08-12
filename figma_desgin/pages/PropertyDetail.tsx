import { useState, useEffect, useRef } from "react"
import {
  ChevronRight, MapPin, Bed, Bath, Square, Heart, Star,
  Phone, Mail, Calendar, X, Check, ChevronLeft, ChevronDown,
  Play, Share2, ArrowRight,
  Car, Dumbbell, Shield, ArrowUpDown as Lift, Trees, Wifi,
  Waves, Flame, Wind, Camera, Building2,
} from "lucide-react"
import { C, type Page } from "../shared"

// ── GALLERY ───────────────────────────────────────────────────────────────────
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1758448511320-05d7d28f4298?w=1200&h=700&fit=crop&auto=format", label: "Living Room" },
  { src: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200&h=700&fit=crop&auto=format", label: "Master Bedroom" },
  { src: "https://images.unsplash.com/photo-1663811396760-b6c84fa45ee9?w=1200&h=700&fit=crop&auto=format", label: "Bedroom 2" },
  { src: "https://images.unsplash.com/photo-1663811396681-8d1e6caa4da9?w=1200&h=700&fit=crop&auto=format", label: "Bathroom" },
  { src: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1200&h=700&fit=crop&auto=format", label: "Kitchen" },
  { src: "https://images.unsplash.com/photo-1776362355123-ca966d36e29c?w=1200&h=700&fit=crop&auto=format", label: "Terrace View", isVideo: true },
]

function Gallery() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const img = IMAGES[active]

  return (
    <div style={{ backgroundColor: C.navy }}>
      {/* Main image */}
      <div style={{ position: "relative", height: 520, overflow: "hidden", cursor: "pointer" }} onClick={() => setLightbox(true)}>
        <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {img.isVideo && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.35)" }}>
            <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              <Play size={26} color={C.navy} fill={C.navy} style={{ marginLeft: 4 }} />
            </div>
          </div>
        )}
        {/* Counter */}
        <div style={{ position: "absolute", bottom: 16, right: 16, backgroundColor: "rgba(15,23,42,0.75)", backdropFilter: "blur(6px)", borderRadius: 6, padding: "5px 12px", display: "flex", alignItems: "center", gap: 7 }}>
          <Camera size={13} color={C.white} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.white, fontFamily: "var(--font-sans)" }}>{active + 1} / {IMAGES.length}</span>
        </div>
        {/* Nav arrows */}
        {active > 0 && (
          <button onClick={e => { e.stopPropagation(); setActive(a => a - 1) }} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={18} color={C.navy} />
          </button>
        )}
        {active < IMAGES.length - 1 && (
          <button onClick={e => { e.stopPropagation(); setActive(a => a + 1) }} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={18} color={C.navy} />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, padding: "12px 0", overflowX: "auto", scrollbarWidth: "none", maxWidth: 1440, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}>
        {IMAGES.map((img, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ position: "relative", flexShrink: 0, width: 120, height: 76, borderRadius: 7, overflow: "hidden", cursor: "pointer", border: `2px solid ${i === active ? C.gold : "transparent"}`, opacity: i === active ? 1 : 0.65, transition: "all 0.15s" }}>
            <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {img.isVideo && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" }}><Play size={14} color={C.white} fill={C.white} /></div>}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3px 6px", backgroundColor: "rgba(0,0,0,0.5)", fontSize: 9, fontWeight: 600, color: C.white, fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>{img.label}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{ position: "fixed", inset: 0, zIndex: 300, backgroundColor: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} color={C.white} />
          </button>
          <img src={IMAGES[active].src} alt={IMAGES[active].label} style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8 }} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}

// ── BOOK VISIT MODAL ──────────────────────────────────────────────────────────
function BookModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const Field = ({ label, name, type = "text", placeholder, as }: { label: string; name: keyof typeof form; type?: string; placeholder: string; as?: "textarea" }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: C.navyMid, letterSpacing: "0.06em", fontFamily: "var(--font-sans)" }}>{label.toUpperCase()}</label>
      {as === "textarea" ? (
        <textarea value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder} rows={3}
          style={{ padding: "10px 13px", borderRadius: 7, border: `1.5px solid ${C.border}`, fontFamily: "var(--font-sans)", fontSize: 13, color: C.navy, resize: "none", outline: "none" }} />
      ) : (
        <input type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
          style={{ padding: "10px 13px", borderRadius: 7, border: `1.5px solid ${C.border}`, fontFamily: "var(--font-sans)", fontSize: 13, color: C.navy, outline: "none" }} />
      )}
    </div>
  )

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: C.white, borderRadius: 14, width: "100%", maxWidth: 480, boxShadow: "0 24px 64px rgba(15,23,42,0.22)" }}>
        {/* Header */}
        <div style={{ padding: "22px 26px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: C.navy }}>Book a Site Visit</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)", marginTop: 2 }}>Serenity Heights — 3BHK, Bandra West</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${C.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color={C.muted} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: "48px 26px", textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: C.successBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Check size={26} color={C.success} />
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Visit Booked!</div>
            <div style={{ fontSize: 14, color: C.muted, fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: 24 }}>Your broker Meera Krishnan will confirm within 2 hours.</div>
            <button onClick={onClose} style={{ padding: "10px 28px", borderRadius: 7, backgroundColor: C.gold, color: C.navy, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700 }}>Close</button>
          </div>
        ) : (
          <div style={{ padding: "22px 26px 26px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              <Field label="Your Name" name="name" placeholder="e.g. Priya Mehta" />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+91 98210 00000" />
              <Field label="Preferred Date" name="date" type="date" placeholder="" />
              <Field label="Message (optional)" name="message" placeholder="Any specific questions or requirements..." as="textarea" />
            </div>
            <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "13px", borderRadius: 8, backgroundColor: C.gold, color: C.navy, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Calendar size={15} /> Confirm Visit Request
            </button>
            <p style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)", textAlign: "center", marginTop: 10, marginBottom: 0 }}>No spam. Your contact is shared only with the assigned broker.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── SIMILAR PROPERTY CARD ─────────────────────────────────────────────────────
const similar = [
  { title: "Horizon Heights 3BHK", location: "Andheri West, Mumbai", price: "₹2.4 Cr", beds: 3, area: "1,540 sqft", img: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=400&h=260&fit=crop&auto=format", status: "Ready to Move" },
  { title: "Skyline Residency 2BHK", location: "Worli, Mumbai", price: "₹1.85 Cr", beds: 2, area: "1,080 sqft", img: "https://images.unsplash.com/photo-1549499090-c9203d2b20ad?w=400&h=260&fit=crop&auto=format", status: "New Launch" },
  { title: "Pearl Tower 4BHK", location: "Juhu, Mumbai", price: "₹4.2 Cr", beds: 4, area: "2,200 sqft", img: "https://images.unsplash.com/photo-1779976955613-b74623824d1c?w=400&h=260&fit=crop&auto=format", status: "Ready to Move" },
  { title: "Emerald Bay Studio", location: "Lower Parel, Mumbai", price: "₹98 L", beds: 1, area: "550 sqft", img: "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=400&h=260&fit=crop&auto=format", status: "Under Construction" },
]

// ── AMENITY ICON MAP ──────────────────────────────────────────────────────────
const AMENITIES = [
  { icon: <Car size={20} />, label: "Covered Parking" },
  { icon: <Dumbbell size={20} />, label: "Gymnasium" },
  { icon: <Shield size={20} />, label: "24/7 Security" },
  { icon: <Lift size={20} />, label: "High-Speed Lift" },
  { icon: <Trees size={20} />, label: "Landscaped Garden" },
  { icon: <Wifi size={20} />, label: "Broadband Ready" },
  { icon: <Waves size={20} />, label: "Swimming Pool" },
  { icon: <Flame size={20} />, label: "Power Backup" },
  { icon: <Wind size={20} />, label: "Central AC" },
  { icon: <Building2 size={20} />, label: "Clubhouse" },
]

const NEARBY = [
  { name: "Lilavati Hospital", dist: "1.2 km", type: "Healthcare" },
  { name: "American School of Bombay", dist: "0.8 km", type: "Education" },
  { name: "Linking Road Metro", dist: "600 m", type: "Transit" },
  { name: "Bandra-Kurla Complex", dist: "4.1 km", type: "Business" },
  { name: "Bandstand Promenade", dist: "950 m", type: "Leisure" },
  { name: "D-Mart Bandra", dist: "1.5 km", type: "Shopping" },
]

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PropertyDetail({ navigate }: { navigate: (p: Page) => void }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [sticky, setSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      if (headerRef.current) setSticky(window.scrollY > headerRef.current.offsetTop + 60)
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <div style={{ backgroundColor: C.cream }}>
      <Gallery />

      {/* Sticky bar */}
      {sticky && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 100, backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(15,23,42,0.08)" }}>
          <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: C.navy }}>Serenity Heights — 3BHK</div>
              <div style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)" }}>Bandra West, Mumbai</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: C.gold }}>₹2.8 Cr</span>
              <button onClick={() => setModalOpen(true)} style={{ padding: "9px 20px", borderRadius: 7, backgroundColor: C.gold, color: C.navy, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>
                <Calendar size={14} /> Schedule Visit
              </button>
              <button style={{ padding: "9px 20px", borderRadius: 7, backgroundColor: "transparent", color: C.navy, border: `1.5px solid ${C.border}`, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
                <Phone size={14} /> Contact Broker
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 0 0" }}>
          {[{ label: "Home", action: () => navigate("home") }, { label: "Properties", action: () => navigate("listings") }, { label: "Serenity Heights — 3BHK", action: null }].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <ChevronRight size={12} color={C.muted} />}
              {item.action ? (
                <button onClick={item.action} style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>{item.label}</button>
              ) : (
                <span style={{ fontSize: 12, color: C.navyMid, fontFamily: "var(--font-sans)", fontWeight: 500 }}>{item.label}</span>
              )}
            </span>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 36, paddingTop: 28, paddingBottom: 80 }}>
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Title + header block */}
            <div ref={headerRef} style={{ backgroundColor: C.white, borderRadius: 12, padding: "28px 32px", border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, backgroundColor: C.successBg, color: C.success, fontFamily: "var(--font-sans)", marginBottom: 10, display: "inline-block" }}>● Ready to Move</span>
                  <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: C.navy, margin: "8px 0 4px", lineHeight: 1.2 }}>Serenity Heights — 3BHK Apartment</h1>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={14} color={C.muted} />
                    <span style={{ fontSize: 14, color: C.muted, fontFamily: "var(--font-sans)" }}>Plot 14B, Linking Road, Bandra West, Mumbai — 400 050</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                  <button onClick={() => setLiked(!liked)} style={{ width: 38, height: 38, borderRadius: 8, border: `1px solid ${liked ? C.alert : C.border}`, backgroundColor: liked ? C.alertBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Heart size={16} fill={liked ? C.alert : "none"} color={liked ? C.alert : C.navyMid} />
                  </button>
                  <button style={{ width: 38, height: 38, borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Share2 size={16} color={C.navyMid} />
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.gold }}>₹2.8 Cr</span>
                <span style={{ fontSize: 13, color: C.muted, fontFamily: "var(--font-sans)" }}>₹16,970 / sqft</span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setModalOpen(true)} style={{ flex: 1, padding: "12px", borderRadius: 8, backgroundColor: C.gold, color: C.navy, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Calendar size={16} /> Schedule a Visit
                </button>
                <button style={{ flex: 1, padding: "12px", borderRadius: 8, backgroundColor: "transparent", color: C.navy, border: `1.5px solid ${C.border}`, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Phone size={16} /> Contact Broker
                </button>
              </div>
            </div>

            {/* Key details grid */}
            <div style={{ backgroundColor: C.white, borderRadius: 12, padding: "24px 32px", border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: C.navy, margin: "0 0 20px" }}>Key Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: C.border, borderRadius: 8, overflow: "hidden" }}>
                {[
                  { icon: <Square size={18} />, label: "Total Area", value: "1,650 sqft" },
                  { icon: <Bed size={18} />, label: "Bedrooms", value: "3 BHK" },
                  { icon: <Bath size={18} />, label: "Bathrooms", value: "3 Full" },
                  { icon: <Building2 size={18} />, label: "Property Type", value: "Apartment" },
                  { icon: <Calendar size={18} />, label: "Possession", value: "Immediate" },
                  { icon: <ChevronDown size={18} />, label: "Furnishing", value: "Semi-Furnished" },
                ].map((d, i) => (
                  <div key={i} style={{ backgroundColor: C.white, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: C.gold, flexShrink: 0, marginTop: 1 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", marginBottom: 4 }}>{d.label.toUpperCase()}</div>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: C.navy }}>{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ backgroundColor: C.white, borderRadius: 12, padding: "24px 32px", border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: C.navy, margin: "0 0 16px" }}>About This Property</h2>
              <p style={{ fontSize: 14, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 14px" }}>
                Serenity Heights offers a rare opportunity to own a premium 3BHK apartment in one of Bandra West's most sought-after addresses. Perched on the 12th floor of a 24-storey tower, this 1,650 sqft home delivers sweeping views of the Arabian Sea and the Bandra-Worli Sea Link from its spacious balcony.
              </p>
              <p style={{ fontSize: 14, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 14px" }}>
                The flat features a double-height living room with floor-to-ceiling glass, three well-proportioned bedrooms including a master suite with walk-in wardrobe and en-suite bathroom, a modern modular kitchen with a dedicated utility area, and three Italian marble bathrooms.
              </p>
              <p style={{ fontSize: 14, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: 0 }}>
                The building is RERA-registered (Reg. No. P51800043210), Vastu-compliant, and managed by a professional society with 24-hour security, CCTV surveillance, and a dedicated maintenance team. Two covered basement parking slots are included in the price.
              </p>
            </div>

            {/* Amenities */}
            <div style={{ backgroundColor: C.white, borderRadius: 12, padding: "24px 32px", border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: C.navy, margin: "0 0 20px" }}>Amenities</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
                {AMENITIES.map((a, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 10px", borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.cream, textAlign: "center" }}>
                    <span style={{ color: C.gold }}>{a.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.3 }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={{ backgroundColor: C.white, borderRadius: 12, padding: "24px 32px", border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: C.navy, margin: "0 0 20px" }}>Location & Nearby</h2>
              {/* Map placeholder */}
              <div style={{ height: 280, borderRadius: 10, overflow: "hidden", backgroundColor: "#E8EDEE", position: "relative", marginBottom: 20, border: `1px solid ${C.border}` }}>
                <img src="https://images.unsplash.com/photo-1549499090-c9203d2b20ad?w=900&h=280&fit=crop&auto=format" alt="Location" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: C.gold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(212,161,94,0.5)" }}>
                    <MapPin size={20} color={C.navy} fill={C.navy} />
                  </div>
                  <div style={{ backgroundColor: C.white, borderRadius: 8, padding: "8px 16px", boxShadow: "0 4px 16px rgba(15,23,42,0.12)" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "var(--font-sans)" }}>Serenity Heights, Bandra West</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.navyMid, fontFamily: "var(--font-sans)", backgroundColor: "rgba(255,255,255,0.8)", padding: "3px 8px", borderRadius: 4 }}>Interactive map — click to open in Google Maps</span>
                </div>
              </div>
              {/* Nearby landmarks */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {NEARBY.map((place, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.cream }}>
                    <div style={{ width: 32, height: 32, borderRadius: 7, backgroundColor: "#FDF3E3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MapPin size={14} color={C.gold} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: C.navy, fontFamily: "var(--font-sans)" }}>{place.name}</div>
                      <div style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)" }}>{place.type} · {place.dist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>
            {/* Broker card */}
            <div style={{ backgroundColor: C.white, borderRadius: 12, padding: "24px", border: `1px solid ${C.border}`, marginBottom: 20, position: "sticky", top: 88 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
                <div style={{ width: 4, height: 18, backgroundColor: C.gold, borderRadius: 2, marginRight: 8 }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.navyMid, fontFamily: "var(--font-sans)" }}>LISTED BY</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                <img src="https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=120&h=120&fit=crop&auto=format" alt="Meera Krishnan" style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${C.gold}` }} />
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: C.navy }}>Meera Krishnan</div>
                  <div style={{ fontSize: 12, color: C.gold, fontWeight: 600, fontFamily: "var(--font-sans)" }}>Senior Broker · Vyas Real Estate</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i <= 4 ? C.gold : "none"} color={C.gold} />)}
                    <span style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)", marginLeft: 3 }}>4.9 (62 reviews)</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {[
                  { icon: <Phone size={14} />, label: "+91 98210 34567" },
                  { icon: <Mail size={14} />, label: "meera.k@vyasrealty.in" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 7, border: `1px solid ${C.border}`, backgroundColor: C.cream }}>
                    <span style={{ color: C.gold, flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: C.navyMid, fontFamily: "var(--font-sans)" }}>{c.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => setModalOpen(true)} style={{ width: "100%", padding: "12px", borderRadius: 8, backgroundColor: C.gold, color: C.navy, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  <Calendar size={14} /> Book a Visit
                </button>
                <button style={{ width: "100%", padding: "11px", borderRadius: 8, backgroundColor: "transparent", color: C.navy, border: `1.5px solid ${C.border}`, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  <Phone size={14} /> Call Broker
                </button>
              </div>
              <div style={{ marginTop: 16, padding: "12px", borderRadius: 7, backgroundColor: C.creamDark, display: "flex", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: C.successBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={13} color={C.success} />
                </div>
                <div style={{ fontSize: 11, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>RERA Verified · 620+ successful deals · Responds within 30 min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div style={{ paddingBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 24, height: 2, backgroundColor: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.1em", fontFamily: "var(--font-sans)" }}>YOU MAY ALSO LIKE</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: C.navy, margin: 0 }}>Similar Properties</h2>
            </div>
            <button onClick={() => navigate("listings")} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.goldDark, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${C.gold}`, paddingBottom: 1 }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
            {similar.map((p, i) => {
              const [hov, setHov] = useState(false)
              return (
                <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ flexShrink: 0, width: 280, backgroundColor: C.white, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: hov ? "0 8px 28px rgba(15,23,42,0.1)" : "0 1px 5px rgba(15,23,42,0.05)", transition: "box-shadow 0.2s" }}>
                  <div style={{ height: 170, overflow: "hidden", backgroundColor: C.creamDark, position: "relative" }}>
                    <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", transform: hov ? "scale(1.04)" : "scale(1)" }} />
                    <div style={{ position: "absolute", bottom: 10, left: 10, backgroundColor: "rgba(15,23,42,0.7)", borderRadius: 4, padding: "3px 8px", fontSize: 10, fontWeight: 600, color: C.white, fontFamily: "var(--font-sans)", backdropFilter: "blur(4px)" }}>{p.status}</div>
                  </div>
                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600, color: C.navy, marginBottom: 4, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                      <MapPin size={11} color={C.muted} /><span style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.location}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Bed size={11} color={C.muted} /><span style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.beds}</span></span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Square size={11} color={C.muted} /><span style={{ fontSize: 11, color: C.muted, fontFamily: "var(--font-sans)" }}>{p.area}</span></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: C.navy }}>{p.price}</span>
                      <button style={{ fontSize: 11, fontWeight: 600, color: C.goldDark, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        Details <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {modalOpen && <BookModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
