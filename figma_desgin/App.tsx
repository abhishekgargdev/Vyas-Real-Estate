import { useState, useEffect } from "react"
import { PageShell, type Page } from "./shared"
import Home from "./pages/Home"
import About from "./pages/About"
import Listings from "./pages/Listings"
import PropertyDetail from "./pages/PropertyDetail"
import Dashboard from "./pages/Dashboard"
import PropertyList from "./pages/dash/PropertyList"
import PropertyForm from "./pages/dash/PropertyForm"
import LeadManagement from "./pages/dash/LeadManagement"
import VisitCalendar from "./pages/dash/VisitCalendar"
import Revenue from "./pages/dash/Revenue"
import DashSettings from "./pages/dash/DashSettings"
import CustomerPortal from "./pages/CustomerPortal"

function Placeholder({ title, navigate }: { title: string; navigate: (p: Page) => void }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#0F172A", marginBottom: 12 }}>{title} — coming soon.</div>
        <button onClick={() => navigate("home")} style={{ fontSize: 14, fontFamily: "var(--font-sans)", color: "#D4A15E", background: "none", border: "none", cursor: "pointer" }}>← Back Home</button>
      </div>
    </div>
  )
}

const DASH_PAGES: Page[] = ["dashboard", "properties", "property-form", "leads", "calendar", "revenue", "dash-settings"]

export default function App() {
  const [page, setPage] = useState<Page>("home")

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  useEffect(() => { window.scrollTo({ top: 0 }) }, [page])

  // Dashboard screens — full-screen layout, no PageShell
  if (DASH_PAGES.includes(page)) {
    if (page === "dashboard") return <Dashboard navigate={navigate} />
    if (page === "properties") return <PropertyList navigate={navigate} />
    if (page === "property-form") return <PropertyForm navigate={navigate} />
    if (page === "leads") return <LeadManagement navigate={navigate} />
    if (page === "calendar") return <VisitCalendar navigate={navigate} />
    if (page === "revenue") return <Revenue navigate={navigate} />
    if (page === "dash-settings") return <DashSettings navigate={navigate} />
  }

  // Portal — own layout
  if (page === "portal") return <CustomerPortal navigate={navigate} />

  return (
    <PageShell page={page} navigate={navigate}>
      {page === "home" && <Home navigate={navigate} />}
      {page === "about" && <About navigate={navigate} />}
      {page === "listings" && <Listings navigate={navigate} />}
      {page === "property" && <PropertyDetail navigate={navigate} />}
      {page === "contact" && <Placeholder title="Contact Us" navigate={navigate} />}
    </PageShell>
  )
}
