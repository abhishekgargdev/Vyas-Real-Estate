import { useState } from "react"
import {
  Target, Eye, ChevronRight, Phone, Mail, ArrowRight,
  Share2, AtSign, Link,
} from "lucide-react"
import { C, SectionLabel, GoldDivider, Button, type Page } from "../shared"

// ── BREADCRUMB ────────────────────────────────────────────────────────────────
function PageHeader({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section style={{ backgroundColor: C.navy, padding: "64px 0 72px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          {[
            { label: "Home", action: () => navigate("home") },
            { label: "About Us", action: null },
          ].map((item, i) => (
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
            <GoldDivider />
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 52, fontWeight: 700, color: C.white, margin: "6px 0 14px", lineHeight: 1.1 }}>About Us</h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
              Eighteen years of trust, transparency, and thousands of families finding their perfect home.
            </p>
          </div>
          <div style={{ display: "flex", gap: 32, textAlign: "right" }}>
            {[{ v: "1,460+", l: "Active Listings" }, { v: "3,200+", l: "Families Served" }, { v: "12", l: "Cities" }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: C.gold }}>{s.v}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── OUR STORY ─────────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <section style={{ padding: "96px 0", backgroundColor: C.white }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Text */}
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: "6px 0 24px", lineHeight: 1.2 }}>
              Built on Trust,<br />Driven by Results
            </h2>
            <p style={{ fontSize: 15, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 18px" }}>
              Vyas Real Estate was founded in 2007 by Arjun Vyas, a first-generation broker from Mumbai with a single conviction: that buying or selling property should never feel opaque or stressful.
            </p>
            <p style={{ fontSize: 15, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 18px" }}>
              What began as a two-person operation in a modest Nariman Point office has grown into a 200-person network spanning Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, and Chennai — handling everything from first-time flat purchases to large-scale commercial acquisitions.
            </p>
            <p style={{ fontSize: 15, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 36px" }}>
              Every property we represent has been physically verified and RERA-checked. Every agent in our network is certified, trained, and held to the same standard of honesty that built our name.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[{ v: "2007", l: "Founded" }, { v: "200+", l: "Certified Agents" }, { v: "₹4,200 Cr+", l: "Transactions" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: C.gold }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)", letterSpacing: "0.04em", marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", backgroundColor: C.creamDark }}>
              <img
                src="https://images.unsplash.com/photo-1780733066519-df99b3123d30?w=800&h=600&fit=crop&auto=format"
                alt="Vyas team consulting with clients"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating tag */}
            <div style={{
              position: "absolute", bottom: -24, left: -24,
              backgroundColor: C.navy, borderRadius: 10, padding: "20px 24px",
              boxShadow: "0 12px 40px rgba(15,23,42,0.2)",
            }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: C.gold }}>18</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em", marginTop: 2 }}>YEARS OF EXCELLENCE</div>
            </div>
            {/* Accent bar */}
            <div style={{ position: "absolute", top: 24, right: -12, width: 4, height: 80, backgroundColor: C.gold, borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── MISSION & VISION ─────────────────────────────────────────────────────────
function MissionVision() {
  return (
    <section style={{ padding: "0 0 96px", backgroundColor: C.white }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Mission */}
          <div style={{ backgroundColor: C.navy, borderRadius: 12, padding: "48px 44px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(212,161,94,0.15)" }} />
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(212,161,94,0.08)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: "rgba(212,161,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, marginBottom: 24 }}>
                <Target size={26} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", marginBottom: 12 }}>OUR MISSION</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 18px", lineHeight: 1.25 }}>
                Making Every Property Transaction Honest
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: 0 }}>
                To provide every buyer, seller, and investor with verified information, certified expertise, and end-to-end support — eliminating the friction, opacity, and anxiety that has historically defined real estate transactions in India.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div style={{ backgroundColor: "#FDF3E3", borderRadius: 12, padding: "48px 44px", position: "relative", overflow: "hidden", border: `1px solid rgba(212,161,94,0.2)` }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(212,161,94,0.2)" }} />
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(212,161,94,0.1)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: C.gold, display: "flex", alignItems: "center", justifyContent: "center", color: C.navy, marginBottom: 24 }}>
                <Eye size={26} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.goldDark, fontFamily: "var(--font-sans)", marginBottom: 12 }}>OUR VISION</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 18px", lineHeight: 1.25 }}>
                India's Most Trusted Property Marketplace
              </h3>
              <p style={{ fontSize: 14, color: C.navyMid, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: 0 }}>
                To become the definitive real estate partner for Indian families and investors — expanding to 25 cities by 2028 while maintaining the same commitment to verification, transparency, and client-first service that earned us our reputation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── MEET THE TEAM ─────────────────────────────────────────────────────────────
const team = [
  { name: "Arjun Vyas", role: "Founder & CEO", city: "Mumbai", deals: "800+ deals", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&auto=format" },
  { name: "Meera Krishnan", role: "Director, Residential", city: "Bengaluru", deals: "620+ deals", img: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=400&h=500&fit=crop&auto=format" },
  { name: "Rahul Oberoi", role: "Head, Commercial", city: "Delhi NCR", deals: "410+ deals", img: "https://images.unsplash.com/photo-1647580427155-0483906cb9de?w=400&h=500&fit=crop&auto=format" },
  { name: "Nisha Kapoor", role: "Luxury Property Advisor", city: "Mumbai", deals: "290+ deals", img: "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?w=400&h=500&fit=crop&auto=format" },
  { name: "Dev Malhotra", role: "Investment Consultant", city: "Pune", deals: "350+ deals", img: "https://images.unsplash.com/photo-1621313212189-0e4447e1e25b?w=400&h=500&fit=crop&auto=format" },
  { name: "Priya Shetty", role: "NRI Relations Manager", city: "Hyderabad", deals: "240+ deals", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format" },
  { name: "Vikram Joshi", role: "Senior Broker", city: "Chennai", deals: "380+ deals", img: "https://images.unsplash.com/photo-1613496701765-97267d26e3df?w=400&h=500&fit=crop&auto=format" },
  { name: "Ananya Rao", role: "Client Relations Head", city: "Bengaluru", deals: "190+ deals", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&auto=format" },
]

function TeamGrid() {
  const [hov, setHov] = useState<number | null>(null)
  return (
    <section style={{ padding: "96px 0", backgroundColor: C.cream }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <GoldDivider center />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Meet the Team</span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: "10px 0 14px", lineHeight: 1.15 }}>The Experts Behind Every Deal</h2>
          <p style={{ fontSize: 15, color: C.muted, fontFamily: "var(--font-sans)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Our certified brokers bring deep local knowledge, decades of combined experience, and a genuine commitment to your interests.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {team.map((member, i) => (
            <div
              key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                backgroundColor: C.white, borderRadius: 10, overflow: "hidden",
                border: `1px solid ${hov === i ? C.gold : C.border}`,
                boxShadow: hov === i ? "0 8px 28px rgba(212,161,94,0.12)" : "0 1px 6px rgba(15,23,42,0.05)",
                transition: "all 0.2s ease",
              }}
            >
              {/* Photo */}
              <div style={{ height: 240, overflow: "hidden", backgroundColor: C.creamDark, position: "relative" }}>
                <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.3s ease", transform: hov === i ? "scale(1.04)" : "scale(1)" }} />
                {/* Deals badge */}
                <div style={{ position: "absolute", top: 12, right: 12, backgroundColor: "rgba(15,23,42,0.8)", borderRadius: 4, padding: "4px 10px", backdropFilter: "blur(4px)" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, fontFamily: "var(--font-sans)" }}>{member.deals}</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "18px 20px 20px" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: C.navy, marginBottom: 3 }}>{member.name}</div>
                <div style={{ fontSize: 12, color: C.gold, fontWeight: 600, fontFamily: "var(--font-sans)", marginBottom: 4 }}>{member.role}</div>
                <div style={{ fontSize: 12, color: C.muted, fontFamily: "var(--font-sans)", marginBottom: 16 }}>{member.city}</div>

                {/* Social */}
                <div style={{ display: "flex", gap: 8 }}>
                  {[<AtSign size={13} />, <Share2 size={13} />, <Link size={13} />].map((icon, j) => (
                    <a key={j} href="#" style={{
                      width: 30, height: 30, borderRadius: 6,
                      border: `1px solid ${hov === i ? C.gold : C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: hov === i ? C.gold : C.muted,
                      textDecoration: "none", transition: "all 0.15s",
                    }}>
                      {icon}
                    </a>
                  ))}
                  <a href="#" style={{
                    flex: 1, height: 30, borderRadius: 6,
                    backgroundColor: hov === i ? C.gold : C.creamDark,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: hov === i ? C.navy : C.navyMid,
                    fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)",
                    textDecoration: "none", transition: "all 0.15s",
                  }}>
                    <Mail size={12} style={{ marginRight: 5 }} /> Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TIMELINE ─────────────────────────────────────────────────────────────────
const milestones = [
  { year: "2007", title: "Founded", body: "Arjun Vyas opens a 2-person brokerage in Nariman Point, Mumbai." },
  { year: "2010", title: "100 Deals", body: "Hit our first 100-transaction milestone. Expanded to Bandra & Juhu markets." },
  { year: "2013", title: "Delhi Launch", body: "Opened the Delhi NCR office, marking our first expansion outside Maharashtra." },
  { year: "2016", title: "RERA Pioneer", body: "Among the first brokerages to fully integrate RERA compliance across all listings." },
  { year: "2019", title: "₹1,000 Cr Transactions", body: "Crossed ₹1,000 Cr in total transacted value across residential and commercial." },
  { year: "2022", title: "6 Cities", body: "Now operating in Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, and Chennai." },
  { year: "2025", title: "3,200+ Families", body: "Surpassed 3,200 families served. Launching NRI Property Desk nationwide." },
]

function Timeline() {
  const [active, setActive] = useState(milestones.length - 1)
  return (
    <section style={{ padding: "96px 0", backgroundColor: C.white, overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <GoldDivider center />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Our Journey</span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 700, color: C.navy, margin: "10px 0 0", lineHeight: 1.15 }}>18 Years of Milestones</h2>
        </div>

        {/* Timeline track */}
        <div style={{ position: "relative", paddingBottom: 60 }}>
          {/* Connector line */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 2, backgroundColor: C.border }} />
          <div style={{
            position: "absolute", left: 0, top: 20, height: 2, backgroundColor: C.gold,
            width: `${(active / (milestones.length - 1)) * 100}%`,
            transition: "width 0.3s ease",
          }} />

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${milestones.length}, 1fr)`, gap: 0 }}>
            {milestones.map((m, i) => {
              const isActive = i === active
              const isPast = i <= active
              return (
                <div key={i} onClick={() => setActive(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", paddingTop: 0 }}>
                  {/* Node */}
                  <div style={{
                    width: isActive ? 44 : 16, height: isActive ? 44 : 16,
                    borderRadius: "50%",
                    backgroundColor: isActive ? C.gold : isPast ? C.navyMid : C.border,
                    border: isActive ? `3px solid ${C.goldDark}` : isPast ? `2px solid ${C.navyMid}` : `2px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                    boxShadow: isActive ? "0 0 0 6px rgba(212,161,94,0.2)" : "none",
                    zIndex: 1, position: "relative",
                    marginTop: isActive ? -14 : 12,
                  }}>
                    {isActive && <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: C.navy }} />}
                  </div>

                  {/* Year label */}
                  <div style={{
                    fontFamily: "var(--font-serif)", fontSize: isActive ? 16 : 13,
                    fontWeight: 700, color: isActive ? C.gold : isPast ? C.navyMid : C.muted,
                    marginTop: 12, transition: "all 0.2s",
                  }}>
                    {m.year}
                  </div>

                  {/* Card */}
                  <div style={{
                    marginTop: 12, textAlign: "center", padding: "14px 12px",
                    borderRadius: 8,
                    backgroundColor: isActive ? C.navy : "transparent",
                    border: `1px solid ${isActive ? C.navy : "transparent"}`,
                    transition: "all 0.2s",
                    maxWidth: 140,
                  }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: isActive ? C.white : C.navyMid, marginBottom: isActive ? 6 : 0 }}>{m.title}</div>
                    {isActive && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>{m.body}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA SECTION ───────────────────────────────────────────────────────────────
function CTASection({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section style={{ padding: "0 48px 96px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ borderRadius: 12, backgroundColor: C.creamDark, border: `1px solid ${C.border}`, padding: "64px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }}>
        <div>
          <GoldDivider />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Ready to Start?</span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 38, fontWeight: 700, color: C.navy, margin: "10px 0 14px", lineHeight: 1.2 }}>
            Get in Touch with<br />Our Team Today
          </h2>
          <p style={{ fontSize: 15, color: C.muted, fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: 0, maxWidth: 460 }}>
            Whether you're buying, selling, or investing — our certified brokers are ready to guide you every step of the way. No pressure, no commissions, just honest advice.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
          <Button size="lg" onClick={() => navigate("contact")} icon={<ArrowRight size={16} />}>
            Contact Us
          </Button>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 18px", borderRadius: 7, border: `1px solid ${C.border}`, backgroundColor: C.white }}>
              <Phone size={14} color={C.gold} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "var(--font-sans)" }}>+91 98210 00000</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 18px", borderRadius: 7, border: `1px solid ${C.border}`, backgroundColor: C.white }}>
              <Mail size={14} color={C.gold} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "var(--font-sans)" }}>hello@vyasrealty.in</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHeader navigate={navigate} />
      <OurStory />
      <MissionVision />
      <TeamGrid />
      <Timeline />
      <CTASection navigate={navigate} />
    </>
  )
}
