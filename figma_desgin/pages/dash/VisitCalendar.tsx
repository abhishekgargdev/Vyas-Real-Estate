import { useState } from "react"
import { Plus, X, ChevronLeft, ChevronRight, Clock, Phone, Check, RotateCcw, MapPin, User } from "lucide-react"
import { DashLayout, D, FLabel, FInput, FSelect, FTextarea, DBtn } from "../../components/DashLayout"
import type { Page } from "../../shared"

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

type Visit = { id: string; client: string; property: string; time: string; type: "site-visit"|"follow-up"|"handover"; day: number; month: number; year: number; phone: string; notes: string; status: "pending"|"completed"|"cancelled" }

const VISITS: Visit[] = [
  { id: "V001", client: "Priya Mehta", property: "Serenity Heights 3BHK", time: "10:00 AM", type: "site-visit", day: 12, month: 8, year: 2026, phone: "+91 98210 34567", notes: "Sea-view unit preferred.", status: "pending" },
  { id: "V002", client: "Rohan Sharma", property: "Park Avenue Studio", time: "12:30 PM", type: "follow-up", day: 12, month: 8, year: 2026, phone: "+91 97300 12456", notes: "Budget discussion.", status: "pending" },
  { id: "V003", client: "Sunita Kapoor", property: "Emerald Coast Duplex", time: "3:00 PM", type: "site-visit", day: 14, month: 8, year: 2026, phone: "+91 99900 22222", notes: "NRI — video call if needed.", status: "pending" },
  { id: "V004", client: "Vikram Nair", property: "Horizon Tower 2BHK", time: "11:00 AM", type: "handover", day: 16, month: 8, year: 2026, phone: "+91 90000 11111", notes: "Final walkthrough.", status: "pending" },
  { id: "V005", client: "Aryan Bose", property: "Skyline Studio 1BHK", time: "5:30 PM", type: "site-visit", day: 18, month: 8, year: 2026, phone: "+91 88800 33333", notes: "Investment purpose.", status: "pending" },
  { id: "V006", client: "Kavya Iyer", property: "Priya Towers 3BHK", time: "10:30 AM", type: "follow-up", day: 20, month: 8, year: 2026, phone: "+91 77700 44444", notes: "", status: "pending" },
  { id: "V007", client: "Sameer Gupta", property: "Grand Residences 4BHK", time: "2:00 PM", type: "site-visit", day: 12, month: 8, year: 2026, phone: "+91 66600 55555", notes: "Premium segment.", status: "completed" },
]

const TYPE_COLORS: Record<string, string> = { "site-visit": D.gold, "follow-up": "#7C3AED", "handover": D.success }
const TYPE_LABELS: Record<string, string> = { "site-visit": "Site Visit", "follow-up": "Follow-up", "handover": "Handover" }

function getDaysInMonth(month: number, year: number) { return new Date(year, month, 0).getDate() }
function getFirstDayOfMonth(month: number, year: number) { return new Date(year, month - 1, 1).getDay() }

function AddVisitModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ client: "", property: "", date: "", time: "", type: "", notes: "" })
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: D.white, borderRadius: 12, width: 500, boxShadow: "0 24px 64px rgba(15,23,42,0.2)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: D.navy }}>Schedule Visit</div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={13} color={D.muted} /></button>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div style={{ gridColumn: "span 2" }}><FLabel>Client</FLabel><FSelect value={form.client} onChange={v => setForm({ ...form, client: v })} options={["Priya Mehta", "Rohan Sharma", "Sunita Kapoor", "Vikram Nair"]} placeholder="Select client..." /></div>
            <div style={{ gridColumn: "span 2" }}><FLabel>Property</FLabel><FSelect value={form.property} onChange={v => setForm({ ...form, property: v })} options={["Serenity Heights 3BHK", "Park Avenue Studio", "Greenwood Villa 4BHK"]} placeholder="Select property..." /></div>
            <div><FLabel>Date</FLabel><FInput type="date" value={form.date} onChange={v => setForm({ ...form, date: v })} /></div>
            <div><FLabel>Time</FLabel><FInput type="time" value={form.time} onChange={v => setForm({ ...form, time: v })} /></div>
            <div style={{ gridColumn: "span 2" }}><FLabel>Visit Type</FLabel><FSelect value={form.type} onChange={v => setForm({ ...form, type: v })} options={["Site Visit", "Follow-up", "Handover"]} placeholder="Select type..." /></div>
          </div>
          <FLabel>Notes</FLabel><FTextarea placeholder="Special instructions..." value={form.notes} onChange={v => setForm({ ...form, notes: v })} rows={2} />
        </div>
        <div style={{ padding: "14px 24px 20px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <DBtn variant="secondary" onClick={onClose}>Cancel</DBtn>
          <DBtn onClick={onClose}>Schedule Visit</DBtn>
        </div>
      </div>
    </div>
  )
}

export default function VisitCalendar({ navigate }: { navigate: (p: Page) => void }) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [addOpen, setAddOpen] = useState(false)
  const [visits, setVisits] = useState(VISITS)

  const daysInMonth = getDaysInMonth(month, year)
  const firstDay = getFirstDayOfMonth(month, year)

  const visitsForDay = (day: number) => visits.filter(v => v.day === day && v.month === month && v.year === year)
  const todayVisits = visitsForDay(selectedDay)

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const markComplete = (id: string) => setVisits(prev => prev.map(v => v.id === id ? { ...v, status: "completed" } : v))
  const cancelVisit = (id: string) => setVisits(prev => prev.map(v => v.id === id ? { ...v, status: "cancelled" } : v))

  return (
    <DashLayout page="calendar" navigate={navigate} title="Visit Calendar">
      <div style={{ display: "flex", gap: 20 }}>
        {/* Calendar */}
        <div style={{ flex: 1 }}>
          {/* Header */}
          <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={14} color={D.navy} /></button>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: D.navy }}>{MONTHS[month - 1]} {year}</div>
              <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={14} color={D.navy} /></button>
            </div>

            {/* Days header */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: `1px solid ${D.border}` }}>
              {DAYS.map(d => (
                <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 11, fontWeight: 700, color: D.muted, fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} style={{ height: 90, borderRight: `1px solid ${D.border}`, borderBottom: `1px solid ${D.border}` }} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const dayVisits = visitsForDay(day)
                const isToday = day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear()
                const isSelected = day === selectedDay
                const col = (firstDay + i) % 7
                return (
                  <div key={day} onClick={() => setSelectedDay(day)}
                    style={{ height: 90, padding: "8px", borderRight: col < 6 ? `1px solid ${D.border}` : "none", borderBottom: `1px solid ${D.border}`, cursor: "pointer", backgroundColor: isSelected ? "#FDF9F3" : "transparent", position: "relative" }}
                    onMouseEnter={e => !isSelected && ((e.currentTarget as HTMLElement).style.backgroundColor = D.creamDark)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = isSelected ? "#FDF9F3" : "transparent")}
                  >
                    <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: isToday ? D.navy : "transparent", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? D.white : D.navy, fontFamily: "var(--font-sans)" }}>{day}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {dayVisits.slice(0, 2).map(v => (
                        <div key={v.id} style={{ fontSize: 9, fontWeight: 600, color: "#fff", backgroundColor: TYPE_COLORS[v.type], borderRadius: 3, padding: "1px 5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "var(--font-sans)" }}>{v.time}</div>
                      ))}
                      {dayVisits.length > 2 && (
                        <div style={{ fontSize: 9, color: D.muted, fontFamily: "var(--font-sans)" }}>+{dayVisits.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 14, padding: "12px 16px", backgroundColor: D.white, borderRadius: 8, border: `1px solid ${D.border}` }}>
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }} />
                <span style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>{TYPE_LABELS[type]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel: Today's Visits */}
        <div style={{ width: 300, flexShrink: 0 }}>
          <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: D.navy }}>
                  {selectedDay === today.getDate() && month === today.getMonth() + 1 ? "Today's" : `${MONTHS[month-1]} ${selectedDay}`} Visits
                </div>
                <div style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>{todayVisits.length} scheduled</div>
              </div>
              <DBtn size="sm" icon={<Plus size={12} />} onClick={() => setAddOpen(true)}>Add</DBtn>
            </div>

            <div style={{ maxHeight: 520, overflowY: "auto" }}>
              {todayVisits.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
                  <div style={{ fontSize: 13, color: D.muted, fontFamily: "var(--font-sans)" }}>No visits for this day</div>
                </div>
              ) : (
                todayVisits.map(visit => (
                  <div key={visit.id} style={{ padding: "14px 16px", borderBottom: `1px solid ${D.border}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: TYPE_COLORS[visit.type] }} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: TYPE_COLORS[visit.type], fontFamily: "var(--font-sans)" }}>{TYPE_LABELS[visit.type].toUpperCase()}</span>
                        </div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: D.navy }}>{visit.client}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                          <MapPin size={10} color={D.muted} />
                          <span style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>{visit.property}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                        <Clock size={11} color={D.gold} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: D.navy, fontFamily: "var(--font-sans)" }}>{visit.time}</span>
                      </div>
                    </div>

                    {visit.status === "completed" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: D.success, fontFamily: "var(--font-sans)" }}>
                        <Check size={12} /> Completed
                      </div>
                    ) : visit.status === "cancelled" ? (
                      <div style={{ fontSize: 11, color: D.alert, fontFamily: "var(--font-sans)" }}>Cancelled</div>
                    ) : (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => markComplete(visit.id)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "5px 8px", borderRadius: 5, border: `1px solid ${D.success}`, backgroundColor: "transparent", cursor: "pointer", color: D.success, fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                          <Check size={11} /> Done
                        </button>
                        <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "5px 8px", borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer", color: D.muted, fontSize: 11, fontFamily: "var(--font-sans)" }}>
                          <RotateCcw size={11} /> Reschedule
                        </button>
                        <button style={{ width: 30, display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", borderRadius: 5, border: `1px solid ${D.border}`, backgroundColor: "transparent", cursor: "pointer" }}>
                          <Phone size={11} color={D.gold} />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Monthly summary */}
          <div style={{ marginTop: 16, backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "14px 16px" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600, color: D.navy, marginBottom: 12 }}>Month Overview</div>
            {[
              { label: "Total scheduled", value: visits.filter(v => v.month === month && v.year === year).length, color: D.navy },
              { label: "Completed", value: visits.filter(v => v.month === month && v.year === year && v.status === "completed").length, color: D.success },
              { label: "Pending", value: visits.filter(v => v.month === month && v.year === year && v.status === "pending").length, color: D.gold },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>{item.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: item.color, fontFamily: "var(--font-sans)" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {addOpen && <AddVisitModal onClose={() => setAddOpen(false)} />}
    </DashLayout>
  )
}
