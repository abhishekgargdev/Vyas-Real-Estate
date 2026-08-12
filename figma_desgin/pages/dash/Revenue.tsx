import { useState } from "react"
import { Download, TrendingUp, TrendingDown, ArrowUpRight, IndianRupee, Users, Building2 } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { DashLayout, D, DBtn } from "../../components/DashLayout"
import type { Page } from "../../shared"

const TREND_DATA = [
  { month: "Feb", current: 38, prev: 29 }, { month: "Mar", current: 52, prev: 41 },
  { month: "Apr", current: 44, prev: 38 }, { month: "May", current: 61, prev: 50 },
  { month: "Jun", current: 55, prev: 47 }, { month: "Jul", current: 72, prev: 58 },
  { month: "Aug", current: 68, prev: 55 },
]

const TYPE_DATA = [
  { type: "Flats", revenue: 48.4, transactions: 12 }, { type: "Villas", revenue: 32.1, transactions: 5 },
  { type: "Shops", revenue: 18.7, transactions: 8 }, { type: "Plots", revenue: 11.2, transactions: 4 },
  { type: "Studios", revenue: 8.5, transactions: 7 },
]

const TRANSACTIONS = [
  { id: "TXN-1024", property: "Serenity Heights 3BHK", client: "Priya Mehta", type: "Sale", date: "Aug 10, 2026", amount: "₹2.8 Cr", commission: "₹5.6 L", status: "settled" },
  { id: "TXN-1023", property: "Greenwood Villa 4BHK", client: "Anita Desai", type: "Sale", date: "Aug 5, 2026", amount: "₹1.9 Cr", commission: "₹3.8 L", status: "settled" },
  { id: "TXN-1022", property: "Horizon Tower Suite", client: "Sameer Gupta", type: "Rental", date: "Jul 28, 2026", amount: "₹4.2 L/yr", commission: "₹42 K", status: "pending" },
  { id: "TXN-1021", property: "Azure Pool Villa 5BHK", client: "Sunita Kapoor", type: "Sale", date: "Jul 20, 2026", amount: "₹5.4 Cr", commission: "₹10.8 L", status: "settled" },
  { id: "TXN-1020", property: "Skyline Studio 1BHK", client: "Aryan Bose", type: "Sale", date: "Jul 15, 2026", amount: "₹72 L", commission: "₹1.4 L", status: "settled" },
  { id: "TXN-1019", property: "Lakeview Bungalow 6BHK", client: "Ritu Verma", type: "Sale", date: "Jul 10, 2026", amount: "₹8.5 Cr", commission: "₹17 L", status: "pending" },
]

const STAT_META = [
  { icon: <IndianRupee size={16} />, label: "Total Revenue", val: "₹38.6 L", change: "+18.4%", up: true },
  { icon: <Building2 size={16} />, label: "Transactions", val: "36", change: "+7 vs last period", up: true },
  { icon: <Users size={16} />, label: "Active Clients", val: "24", change: "+3", up: true },
  { icon: <TrendingUp size={16} />, label: "Avg. Commission", val: "₹2.1 L", change: "-5.2%", up: false },
]

const RANGE_OPTIONS = ["Last 7 days", "Last 30 days", "Last 3 months", "This year", "Custom"]

export default function Revenue({ navigate }: { navigate: (p: Page) => void }) {
  const [range, setRange] = useState("Last 3 months")
  const [propType, setPropType] = useState("")

  return (
    <DashLayout page="revenue" navigate={navigate} title="Revenue & Analytics">
      {/* Filter bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {RANGE_OPTIONS.map(r => (
            <button key={r} onClick={() => setRange(r)}
              style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${range === r ? D.gold : D.border}`, backgroundColor: range === r ? "#FDF3E3" : D.white, color: range === r ? D.goldDark : D.navyMid, fontSize: 12, fontWeight: range === r ? 600 : 400, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              {r}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <select value={propType} onChange={e => setPropType(e.target.value)}
              style={{ padding: "7px 28px 7px 12px", borderRadius: 7, border: `1px solid ${D.border}`, fontFamily: "var(--font-sans)", fontSize: 12, color: propType ? D.navy : D.muted, backgroundColor: D.white, appearance: "none", cursor: "pointer", outline: "none" }}>
              <option value="">All Types</option>
              {["Flat", "Villa", "Shop", "Plot", "Studio"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <DBtn size="sm" variant="secondary" icon={<Download size={13} />}>Export PDF</DBtn>
          <DBtn size="sm" variant="secondary" icon={<Download size={13} />}>Export Excel</DBtn>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {STAT_META.map((s, i) => (
          <div key={i} style={{ backgroundColor: D.white, borderRadius: 10, padding: "18px 20px", border: `1px solid ${D.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "#FDF3E3", display: "flex", alignItems: "center", justifyContent: "center", color: D.gold }}>{s.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, color: s.up ? D.success : D.alert, fontFamily: "var(--font-sans)" }}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {s.change}
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: D.navy, marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Revenue trend */}
        <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: D.navy }}>Revenue Trend</div>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ label: "Current", color: D.gold }, { label: "Previous", color: "#CBD5E1" }].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: l.color }} />
                  <span style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="currGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={D.gold} stopOpacity={0.25} /><stop offset="100%" stopColor={D.gold} stopOpacity={0} /></linearGradient>
                <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#94A3B8" stopOpacity={0.15} /><stop offset="100%" stopColor="#94A3B8" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
              <Tooltip formatter={(val) => [`₹${val}L`, ""]} contentStyle={{ fontFamily: "var(--font-sans)", fontSize: 12, borderRadius: 7, border: `1px solid ${D.border}` }} />
              <Area type="monotone" dataKey="prev" stroke="#CBD5E1" strokeWidth={2} fill="url(#prevGrad)" />
              <Area type="monotone" dataKey="current" stroke={D.gold} strokeWidth={2.5} fill="url(#currGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* By type */}
        <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "18px 20px" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: D.navy, marginBottom: 16 }}>By Property Type</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TYPE_DATA} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: D.muted, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
              <YAxis type="category" dataKey="type" tick={{ fontSize: 11, fill: D.navyMid, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={50} />
              <Tooltip formatter={(val) => [`₹${val}L`, "Revenue"]} contentStyle={{ fontFamily: "var(--font-sans)", fontSize: 12, borderRadius: 7, border: `1px solid ${D.border}` }} />
              <Bar dataKey="revenue" fill={D.gold} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions table */}
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy }}>Transactions</div>
          <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{TRANSACTIONS.length} records</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: D.cream }}>
                {["TXN ID", "Property", "Client", "Type", "Date", "Amount", "Commission", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: D.muted, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: i % 2 === 0 ? D.white : "#FDFCFA" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)" }}>{t.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)", maxWidth: 200 }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.property}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: D.navy, fontFamily: "var(--font-sans)" }}>{t.client}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, backgroundColor: t.type === "Sale" ? "#EFF6FF" : "#F0FDF4", color: t.type === "Sale" ? "#2563EB" : D.success, fontFamily: "var(--font-sans)" }}>{t.type}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>{t.date}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 700, color: D.navy }}>{t.amount}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: D.goldDark }}>{t.commission}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, backgroundColor: t.status === "settled" ? "#F0FDF4" : "#FFFBEB", color: t.status === "settled" ? D.success : D.warning, fontFamily: "var(--font-sans)" }}>
                      {t.status === "settled" ? "Settled" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>Showing {TRANSACTIONS.length} of {TRANSACTIONS.length} transactions</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2].map(n => <button key={n} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${n === 1 ? D.gold : D.border}`, backgroundColor: n === 1 ? "#FDF3E3" : "transparent", color: n === 1 ? D.goldDark : D.navyMid, fontSize: 12, fontWeight: n === 1 ? 700 : 400, cursor: "pointer", fontFamily: "var(--font-sans)" }}>{n}</button>)}
          </div>
        </div>
      </div>
    </DashLayout>
  )
}
