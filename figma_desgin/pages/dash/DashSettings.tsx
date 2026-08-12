import { useState } from "react"
import { Camera, Plus, Trash2, Shield, Bell, CreditCard, Users, Building2, User } from "lucide-react"
import { DashLayout, D, FLabel, FInput, FSelect, FTextarea, DBtn } from "../../components/DashLayout"
import type { Page } from "../../shared"

const TABS = [
  { id: "profile", label: "Profile", icon: <User size={15} /> },
  { id: "company", label: "Company Info", icon: <Building2 size={15} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { id: "payment", label: "Payment & Bank", icon: <CreditCard size={15} /> },
  { id: "team", label: "Team Members", icon: <Users size={15} /> },
  { id: "security", label: "Security", icon: <Shield size={15} /> },
]

const TEAM = [
  { id: 1, name: "Rajesh Vyas", role: "Admin", email: "rajesh@vyasrealty.com", status: "active", initials: "RV" },
  { id: 2, name: "Meera Shah", role: "Agent", email: "meera@vyasrealty.com", status: "active", initials: "MS" },
  { id: 3, name: "Amit Kulkarni", role: "Agent", email: "amit@vyasrealty.com", status: "active", initials: "AK" },
  { id: 4, name: "Neha Joshi", role: "Coordinator", email: "neha@vyasrealty.com", status: "inactive", initials: "NJ" },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: checked ? D.navy : D.border, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: checked ? 23 : 3, width: 18, height: 18, borderRadius: "50%", backgroundColor: D.white, transition: "left 0.2s" }} />
    </button>
  )
}

function ProfileTab() {
  const [form, setForm] = useState({ name: "Rajesh Vyas", phone: "+91 98765 43210", email: "rajesh@vyasrealty.com", bio: "15+ years in Mumbai luxury real estate. RERA certified.", lang: "English", timezone: "IST (UTC+5:30)" })
  return (
    <div style={{ maxWidth: 660 }}>
      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: "20px 24px", backgroundColor: D.cream, borderRadius: 10, border: `1px solid ${D.border}` }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: D.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: D.white, fontFamily: "var(--font-sans)" }}>RV</span>
          </div>
          <button style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", backgroundColor: D.gold, border: `2px solid ${D.white}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Camera size={12} color={D.white} /></button>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: D.navy, marginBottom: 4 }}>{form.name}</div>
          <div style={{ fontSize: 13, color: D.muted, fontFamily: "var(--font-sans)", marginBottom: 8 }}>Administrator · Vyas Real Estate</div>
          <DBtn size="sm" variant="secondary" icon={<Camera size={11} />}>Upload Photo</DBtn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div><FLabel>Full Name</FLabel><FInput value={form.name} onChange={v => setForm({ ...form, name: v })} /></div>
        <div><FLabel>Phone</FLabel><FInput value={form.phone} onChange={v => setForm({ ...form, phone: v })} type="tel" /></div>
        <div style={{ gridColumn: "span 2" }}><FLabel>Email</FLabel><FInput value={form.email} onChange={v => setForm({ ...form, email: v })} type="email" /></div>
        <div><FLabel>Language</FLabel><FSelect value={form.lang} onChange={v => setForm({ ...form, lang: v })} options={["English", "Hindi", "Marathi"]} /></div>
        <div><FLabel>Timezone</FLabel><FSelect value={form.timezone} onChange={v => setForm({ ...form, timezone: v })} options={["IST (UTC+5:30)", "UTC", "GMT"]} /></div>
        <div style={{ gridColumn: "span 2" }}><FLabel>Bio</FLabel><FTextarea value={form.bio} onChange={v => setForm({ ...form, bio: v })} rows={3} /></div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <DBtn>Save Changes</DBtn>
        <DBtn variant="secondary">Discard</DBtn>
      </div>
    </div>
  )
}

function CompanyTab() {
  const [form, setForm] = useState({ name: "Vyas Real Estate Pvt. Ltd.", tagline: "Premium Properties, Trusted Service", address: "Ground Floor, Nariman Point, Mumbai 400021", rera: "MAHRERA-A-2009-001234", gst: "27AABCV1234D1Z5", website: "www.vyasrealty.com" })
  return (
    <div style={{ maxWidth: 660 }}>
      {/* Logo upload */}
      <div style={{ marginBottom: 24, padding: "20px 24px", backgroundColor: D.cream, borderRadius: 10, border: `1px solid ${D.border}` }}>
        <FLabel>Company Logo</FLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
          <div style={{ width: 100, height: 60, borderRadius: 8, backgroundColor: D.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 700, color: D.gold }}>VYAS</span>
          </div>
          <div>
            <DBtn size="sm" variant="secondary" icon={<Camera size={11} />}>Upload Logo</DBtn>
            <div style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)", marginTop: 5 }}>PNG or SVG, min 200×80px</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ gridColumn: "span 2" }}><FLabel>Company Name</FLabel><FInput value={form.name} onChange={v => setForm({ ...form, name: v })} /></div>
        <div style={{ gridColumn: "span 2" }}><FLabel>Tagline</FLabel><FInput value={form.tagline} onChange={v => setForm({ ...form, tagline: v })} /></div>
        <div style={{ gridColumn: "span 2" }}><FLabel>Office Address</FLabel><FTextarea value={form.address} onChange={v => setForm({ ...form, address: v })} rows={2} /></div>
        <div><FLabel>RERA Number</FLabel><FInput value={form.rera} onChange={v => setForm({ ...form, rera: v })} /></div>
        <div><FLabel>GST Number</FLabel><FInput value={form.gst} onChange={v => setForm({ ...form, gst: v })} /></div>
        <div style={{ gridColumn: "span 2" }}><FLabel>Website</FLabel><FInput value={form.website} onChange={v => setForm({ ...form, website: v })} /></div>
      </div>
      <DBtn>Save Company Info</DBtn>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({ newLead: true, visitReminder: true, dealClosed: true, newMessage: false, monthlyReport: true, teamActivity: false, smsAlerts: true, emailDigest: false })
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }))

  const groups = [
    { title: "Lead & Client Alerts", items: [{ key: "newLead", label: "New lead received", desc: "Get notified when a new inquiry comes in" }, { key: "newMessage", label: "New message from client", desc: "In-app and email notification" }] },
    { title: "Visit Notifications", items: [{ key: "visitReminder", label: "Visit reminder (24 hrs before)", desc: "Reminder email 24 hours before a scheduled visit" }] },
    { title: "Business Updates", items: [{ key: "dealClosed", label: "Deal closed confirmation", desc: "Summary when a transaction is finalized" }, { key: "monthlyReport", label: "Monthly performance report", desc: "Auto-generated analytics summary" }, { key: "teamActivity", label: "Team activity summary", desc: "Weekly digest of team actions" }] },
    { title: "Delivery Channels", items: [{ key: "smsAlerts", label: "SMS alerts", desc: "Receive key alerts via SMS" }, { key: "emailDigest", label: "Daily email digest", desc: "Consolidated daily summary email" }] },
  ]

  return (
    <div style={{ maxWidth: 600 }}>
      {groups.map(g => (
        <div key={g.title} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: D.navyMid, letterSpacing: "0.06em", fontFamily: "var(--font-sans)", marginBottom: 12 }}>{g.title.toUpperCase()}</div>
          <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
            {g.items.map((item, i) => {
              const checked = prefs[item.key as keyof typeof prefs]
              return (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: i < g.items.length - 1 ? `1px solid ${D.border}` : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: D.navy, fontFamily: "var(--font-sans)" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)", marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <Toggle checked={checked} onChange={() => toggle(item.key as keyof typeof prefs)} />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function PaymentTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy, marginBottom: 16 }}>Bank Details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "span 2" }}><FLabel>Account Holder Name</FLabel><FInput placeholder="As per bank records" value="Vyas Real Estate Pvt. Ltd." onChange={() => {}} /></div>
          <div><FLabel>Account Number</FLabel><FInput placeholder="XXXX XXXX XXXX" value="4021 0012 3456 7890" onChange={() => {}} /></div>
          <div><FLabel>IFSC Code</FLabel><FInput placeholder="XXXXXX0000000" value="HDFC0001234" onChange={() => {}} /></div>
          <div style={{ gridColumn: "span 2" }}><FLabel>Bank Name</FLabel><FSelect value="HDFC Bank" onChange={() => {}} options={["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak"]} /></div>
        </div>
        <div style={{ marginTop: 16 }}><DBtn>Save Bank Details</DBtn></div>
      </div>
      <div style={{ backgroundColor: "#FFFBEB", borderRadius: 10, border: `1px solid #FDE68A`, padding: "14px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", fontFamily: "var(--font-sans)", marginBottom: 4 }}>⚠️ Secure Storage</div>
        <div style={{ fontSize: 12, color: "#78350F", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>Bank account details are encrypted and only used for commission payouts. Vyas Real Estate will never share this information.</div>
      </div>
    </div>
  )
}

function TeamTab() {
  const [inviteOpen, setInviteOpen] = useState(false)
  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <DBtn size="sm" icon={<Plus size={13} />} onClick={() => setInviteOpen(true)}>Invite Member</DBtn>
      </div>
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden", marginBottom: 20 }}>
        {TEAM.map((member, i) => (
          <div key={member.id} style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: i < TEAM.length - 1 ? `1px solid ${D.border}` : "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: D.navy, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 14, flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: D.white, fontFamily: "var(--font-sans)" }}>{member.initials}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: D.navy, fontFamily: "var(--font-sans)" }}>{member.name}</div>
              <div style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{member.email}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: member.role === "Admin" ? D.navy : D.navyMid, backgroundColor: member.role === "Admin" ? D.cream : D.creamDark, padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>{member.role}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: member.status === "active" ? D.success : D.muted, backgroundColor: member.status === "active" ? "#F0FDF4" : D.creamDark, padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>{member.status}</span>
              <button style={{ width: 28, height: 28, borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={13} color={D.alert} /></button>
            </div>
          </div>
        ))}
      </div>

      {inviteOpen && (
        <div onClick={() => setInviteOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: D.white, borderRadius: 12, width: 420, padding: "24px", boxShadow: "0 24px 64px rgba(15,23,42,0.2)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: D.navy, marginBottom: 16 }}>Invite Team Member</div>
            <div style={{ marginBottom: 14 }}><FLabel>Email Address</FLabel><FInput placeholder="colleague@vyasrealty.com" value="" onChange={() => {}} type="email" /></div>
            <div style={{ marginBottom: 20 }}><FLabel>Role</FLabel><FSelect value="" onChange={() => {}} options={["Agent", "Coordinator", "Admin"]} placeholder="Select role..." /></div>
            <div style={{ display: "flex", gap: 10 }}>
              <DBtn variant="secondary" fullWidth onClick={() => setInviteOpen(false)}>Cancel</DBtn>
              <DBtn fullWidth onClick={() => setInviteOpen(false)}>Send Invite</DBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SecurityTab() {
  const [sessions] = useState([
    { device: "Chrome · MacBook Pro", location: "Mumbai, IN", time: "Active now", current: true },
    { device: "Safari · iPhone 14 Pro", location: "Mumbai, IN", time: "2 hours ago", current: false },
    { device: "Chrome · Windows PC", location: "Delhi, IN", time: "3 days ago", current: false },
  ])
  return (
    <div style={{ maxWidth: 600 }}>
      {/* Change password */}
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy, marginBottom: 16 }}>Change Password</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
          <div><FLabel>Current Password</FLabel><FInput type="password" placeholder="Enter current password" value="" onChange={() => {}} /></div>
          <div><FLabel>New Password</FLabel><FInput type="password" placeholder="Min 8 characters" value="" onChange={() => {}} /></div>
          <div><FLabel>Confirm New Password</FLabel><FInput type="password" placeholder="Re-enter new password" value="" onChange={() => {}} /></div>
        </div>
        <DBtn>Update Password</DBtn>
      </div>

      {/* 2FA */}
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy, marginBottom: 4 }}>Two-Factor Authentication</div>
            <div style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>Add an extra layer of security to your account</div>
          </div>
          <DBtn size="sm">Enable 2FA</DBtn>
        </div>
      </div>

      {/* Active sessions */}
      <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${D.border}` }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy }}>Active Sessions</div>
        </div>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: i < sessions.length - 1 ? `1px solid ${D.border}` : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: D.navy, fontFamily: "var(--font-sans)", marginBottom: 2 }}>{s.device}</div>
              <div style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>{s.location} · {s.time}</div>
            </div>
            {s.current ? (
              <span style={{ fontSize: 11, fontWeight: 700, color: D.success, backgroundColor: "#F0FDF4", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>Current</span>
            ) : (
              <button style={{ fontSize: 11, color: D.alert, padding: "4px 10px", borderRadius: 5, border: `1px solid ${D.alert}`, backgroundColor: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Revoke</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashSettings({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState("profile")

  return (
    <DashLayout page="dash-settings" navigate={navigate} title="Settings">
      <div style={{ display: "flex", gap: 28 }}>
        {/* Left tab nav */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
            {TABS.map((t, i) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: i < TABS.length - 1 ? `1px solid ${D.border}` : "none", border: "none", backgroundColor: tab === t.id ? "#FDF3E3" : "transparent", cursor: "pointer", textAlign: "left", borderLeft: `3px solid ${tab === t.id ? D.gold : "transparent"}`, transition: "all 0.15s" }}>
                <span style={{ color: tab === t.id ? D.goldDark : D.muted }}>{t.icon}</span>
                <span style={{ fontSize: 13, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? D.navy : D.navyMid, fontFamily: "var(--font-sans)" }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1 }}>
          {tab === "profile" && <ProfileTab />}
          {tab === "company" && <CompanyTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "payment" && <PaymentTab />}
          {tab === "team" && <TeamTab />}
          {tab === "security" && <SecurityTab />}
        </div>
      </div>
    </DashLayout>
  )
}
