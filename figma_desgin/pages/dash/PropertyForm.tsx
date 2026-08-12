import { useState } from "react"
import { Check, Upload, X, Image, Video, ChevronLeft, Plus } from "lucide-react"
import { DashLayout, D, FLabel, FInput, FSelect, FTextarea, DBtn } from "../../components/DashLayout"
import type { Page } from "../../shared"

const STEPS = ["Basic Info", "Details", "Media Upload", "Owner Info"]

const AMENITIES = [
  "Covered Parking", "Gymnasium", "Swimming Pool", "24/7 Security",
  "High-Speed Lift", "Landscaped Garden", "Broadband Ready", "Power Backup",
  "Clubhouse", "Intercom", "CCTV Surveillance", "Children Play Area",
  "Jogging Track", "Visitor Parking", "Rainwater Harvesting",
]

const MEDIA_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1758448511320-05d7d28f4298?w=200&h=140&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=200&h=140&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1663811396760-b6c84fa45ee9?w=200&h=140&fit=crop&auto=format",
]

function Stepper({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36, backgroundColor: D.white, borderRadius: 10, padding: "20px 32px", border: `1px solid ${D.border}` }}>
      {STEPS.map((label, i) => {
        const done = i < step, active = i === step
        return (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                backgroundColor: done ? D.success : active ? D.gold : D.creamDark,
                border: `2px solid ${done ? D.success : active ? D.goldDark : D.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: active ? "0 0 0 4px rgba(212,161,94,0.2)" : "none",
              }}>
                {done ? <Check size={16} color="#fff" strokeWidth={3} /> : (
                  <span style={{ fontSize: 13, fontWeight: 700, color: active ? D.navy : D.muted, fontFamily: "var(--font-sans)" }}>{i + 1}</span>
                )}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: done ? D.success : active ? D.navy : D.muted, fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>STEP {i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: done || active ? D.navy : D.muted, fontFamily: "var(--font-sans)" }}>{label}</div>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, backgroundColor: done ? D.success : D.border, margin: "0 16px", transition: "background 0.3s" }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Step1({ form, setForm }: { form: any; setForm: any }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ gridColumn: "1 / -1" }}>
        <FLabel>Property Title</FLabel>
        <FInput placeholder="e.g. Serenity Heights — 3BHK Apartment" value={form.title} onChange={v => setForm({ ...form, title: v })} />
      </div>
      <div>
        <FLabel>Property Type</FLabel>
        <FSelect value={form.type} onChange={v => setForm({ ...form, type: v })} options={["Flat", "Shop", "Villa", "Plot", "Studio", "Penthouse"]} placeholder="Select type..." />
      </div>
      <div>
        <FLabel>City / Location</FLabel>
        <FSelect value={form.location} onChange={v => setForm({ ...form, location: v })} options={["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Chennai"]} placeholder="Select city..." />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <FLabel>Full Address</FLabel>
        <FInput placeholder="Plot number, street, area, pincode" value={form.address} onChange={v => setForm({ ...form, address: v })} />
      </div>
      <div>
        <FLabel>Listing Price (₹)</FLabel>
        <FInput placeholder="e.g. 28000000" type="number" value={form.price} onChange={v => setForm({ ...form, price: v })} />
      </div>
      <div>
        <FLabel>Listing Status</FLabel>
        <FSelect value={form.status} onChange={v => setForm({ ...form, status: v })} options={["Ready to Move", "Under Construction", "New Launch", "Sold"]} placeholder="Select status..." />
      </div>
      <div>
        <FLabel>Possession Date</FLabel>
        <FInput type="date" value={form.possession} onChange={v => setForm({ ...form, possession: v })} />
      </div>
      <div>
        <FLabel>RERA Registration No.</FLabel>
        <FInput placeholder="e.g. P51800043210" value={form.rera} onChange={v => setForm({ ...form, rera: v })} />
      </div>
    </div>
  )
}

function Step2({ form, setForm }: { form: any; setForm: any }) {
  const toggleAmenity = (a: string) => {
    const s = new Set<string>(form.amenities)
    if (s.has(a)) s.delete(a); else s.add(a)
    setForm({ ...form, amenities: s })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <div>
          <FLabel>Total Area (sqft)</FLabel>
          <FInput placeholder="e.g. 1650" type="number" value={form.area} onChange={v => setForm({ ...form, area: v })} />
        </div>
        <div>
          <FLabel>Bedrooms</FLabel>
          <FSelect value={form.beds} onChange={v => setForm({ ...form, beds: v })} options={["Studio", "1", "2", "3", "4", "5", "6+"]} placeholder="Select..." />
        </div>
        <div>
          <FLabel>Bathrooms</FLabel>
          <FSelect value={form.baths} onChange={v => setForm({ ...form, baths: v })} options={["1", "2", "3", "4", "5", "6+"]} placeholder="Select..." />
        </div>
        <div>
          <FLabel>Furnishing</FLabel>
          <FSelect value={form.furnishing} onChange={v => setForm({ ...form, furnishing: v })} options={["Furnished", "Semi-Furnished", "Unfurnished"]} placeholder="Select..." />
        </div>
      </div>
      <div>
        <FLabel>Amenities</FLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 6 }}>
          {AMENITIES.map(a => {
            const checked = form.amenities instanceof Set ? form.amenities.has(a) : false
            return (
              <label key={a} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 10px", borderRadius: 7, border: `1px solid ${checked ? D.gold : D.border}`, backgroundColor: checked ? "#FDF3E3" : D.white, transition: "all 0.15s" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${checked ? D.gold : D.border}`, backgroundColor: checked ? D.gold : D.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}
                  onClick={() => toggleAmenity(a)}>
                  {checked && <Check size={10} color={D.navy} strokeWidth={3} />}
                </div>
                <span style={{ fontSize: 11, fontWeight: checked ? 600 : 400, color: checked ? D.goldDark : D.navyMid, fontFamily: "var(--font-sans)" }}>{a}</span>
              </label>
            )
          })}
        </div>
      </div>
      <div>
        <FLabel>Description</FLabel>
        <FTextarea placeholder="Write a detailed description of the property — highlights, features, nearby conveniences, building specs, RERA details..." value={form.description} onChange={v => setForm({ ...form, description: v })} rows={5} />
      </div>
      <div>
        <FLabel>Floor Number</FLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <FInput placeholder="e.g. 12" value={form.floor} onChange={v => setForm({ ...form, floor: v })} />
          <div>
            <FSelect value={form.facing} onChange={v => setForm({ ...form, facing: v })} options={["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]} placeholder="Property facing..." />
          </div>
          <div>
            <FSelect value={form.age} onChange={v => setForm({ ...form, age: v })} options={["New Construction", "0–5 years", "5–10 years", "10–20 years", "20+ years"]} placeholder="Property age..." />
          </div>
        </div>
      </div>
    </div>
  )
}

function Step3({ form, setForm }: { form: any; setForm: any }) {
  const [dragOver, setDragOver] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Image upload */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy }}>Property Images</div>
            <div style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", marginTop: 2 }}>Upload up to 20 images. First image becomes the cover. Drag to reorder.</div>
          </div>
          <DBtn size="sm" variant="secondary" icon={<Plus size={13} />}>Add Images</DBtn>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false) }}
          style={{ border: `2px dashed ${dragOver ? D.gold : D.border}`, borderRadius: 10, padding: "32px 24px", textAlign: "center", backgroundColor: dragOver ? "#FDF9F3" : D.cream, marginBottom: 16, transition: "all 0.15s", cursor: "pointer" }}>
          <Upload size={28} color={dragOver ? D.gold : D.muted} style={{ marginBottom: 10 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: dragOver ? D.goldDark : D.navyMid, fontFamily: "var(--font-sans)", marginBottom: 4 }}>Drop images here or click to browse</div>
          <div style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)" }}>JPG, PNG, WebP — Max 5MB each</div>
        </div>

        {/* Uploaded previews */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {MEDIA_PLACEHOLDERS.map((src, i) => (
            <div key={i} style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/3", backgroundColor: D.creamDark, border: i === 0 ? `2px solid ${D.gold}` : `1px solid ${D.border}` }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {i === 0 && (
                <div style={{ position: "absolute", top: 6, left: 6, backgroundColor: D.gold, borderRadius: 4, padding: "2px 7px", fontSize: 9, fontWeight: 700, color: D.navy, fontFamily: "var(--font-sans)" }}>COVER</div>
              )}
              <button style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.55)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={11} color="#fff" />
              </button>
            </div>
          ))}
          {/* Empty slot */}
          <div style={{ borderRadius: 8, aspectRatio: "4/3", border: `2px dashed ${D.border}`, backgroundColor: D.cream, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Plus size={20} color={D.muted} />
          </div>
        </div>
      </div>

      {/* Video upload */}
      <div style={{ borderTop: `1px solid ${D.border}`, paddingTop: 24 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: D.navy, marginBottom: 4 }}>Property Video / Walkthrough</div>
        <div style={{ fontSize: 12, color: D.muted, fontFamily: "var(--font-sans)", marginBottom: 14 }}>Optionally upload a walkthrough video or paste a YouTube/Vimeo URL.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ border: `2px dashed ${D.border}`, borderRadius: 10, padding: "28px 20px", textAlign: "center", backgroundColor: D.cream, cursor: "pointer" }}>
            <Video size={26} color={D.muted} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: D.navyMid, fontFamily: "var(--font-sans)", marginBottom: 3 }}>Upload Video File</div>
            <div style={{ fontSize: 11, color: D.muted, fontFamily: "var(--font-sans)" }}>MP4, MOV — Max 200MB</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <FLabel>YouTube / Vimeo URL</FLabel>
              <FInput placeholder="https://youtube.com/watch?v=..." />
            </div>
            {/* Video thumb preview */}
            <div style={{ borderRadius: 8, overflow: "hidden", height: 100, backgroundColor: D.navyLight, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image size={24} color="rgba(255,255,255,0.2)" />
              <div style={{ position: "absolute", bottom: 6, left: 6, fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)" }}>Video thumbnail will appear here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step4({ form, setForm }: { form: any; setForm: any }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ padding: "14px 18px", borderRadius: 8, backgroundColor: "#FDF3E3", border: `1px solid rgba(212,161,94,0.3)`, marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: D.goldDark, fontFamily: "var(--font-sans)" }}>Owner / Client Association</div>
          <div style={{ fontSize: 12, color: D.navyMid, fontFamily: "var(--font-sans)", marginTop: 2 }}>Link this property to an existing client/owner or add new contact details.</div>
        </div>
      </div>
      <div>
        <FLabel>Owner Full Name</FLabel>
        <FInput placeholder="e.g. Rajesh Mehta" value={form.ownerName} onChange={v => setForm({ ...form, ownerName: v })} />
      </div>
      <div>
        <FLabel>Owner Phone</FLabel>
        <FInput placeholder="+91 98210 00000" type="tel" value={form.ownerPhone} onChange={v => setForm({ ...form, ownerPhone: v })} />
      </div>
      <div>
        <FLabel>Owner Email</FLabel>
        <FInput placeholder="owner@email.com" type="email" value={form.ownerEmail} onChange={v => setForm({ ...form, ownerEmail: v })} />
      </div>
      <div>
        <FLabel>Owner Type</FLabel>
        <FSelect value={form.ownerType} onChange={v => setForm({ ...form, ownerType: v })} options={["Individual", "Builder", "Corporate", "NRI"]} placeholder="Select type..." />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <FLabel>Additional Notes</FLabel>
        <FTextarea placeholder="Any notes about the owner, deal terms, or special instructions for the team..." value={form.ownerNotes} onChange={v => setForm({ ...form, ownerNotes: v })} rows={3} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <FLabel>Assign To Broker</FLabel>
        <FSelect value={form.broker} onChange={v => setForm({ ...form, broker: v })} options={["Meera Krishnan", "Rahul Oberoi", "Nisha Kapoor", "Dev Malhotra", "Vikram Joshi"]} placeholder="Assign to team member..." />
      </div>
    </div>
  )
}

export default function PropertyForm({ navigate }: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    title: "", type: "", location: "", address: "", price: "", status: "", possession: "", rera: "",
    area: "", beds: "", baths: "", furnishing: "", amenities: new Set<string>(), description: "", floor: "", facing: "", age: "",
    ownerName: "", ownerPhone: "", ownerEmail: "", ownerType: "", ownerNotes: "", broker: "",
  })
  const [saved, setSaved] = useState(false)

  const isEdit = false

  return (
    <DashLayout page="properties" navigate={navigate} title={isEdit ? "Edit Property" : "Add New Property"}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Back */}
        <button onClick={() => navigate("properties")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: D.muted, fontFamily: "var(--font-sans)", background: "none", border: "none", cursor: "pointer", marginBottom: 20, padding: 0 }}>
          <ChevronLeft size={15} /> Back to Properties
        </button>

        <Stepper step={step} />

        <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "28px 32px", marginBottom: 20 }}>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${D.border}` }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: D.navy }}>{STEPS[step]}</div>
            <div style={{ fontSize: 13, color: D.muted, fontFamily: "var(--font-sans)", marginTop: 2 }}>
              {["Fill in the core listing details.", "Specify property specs and amenities.", "Upload high-quality images and video.", "Link the property owner and assign a broker."][step]}
            </div>
          </div>
          {step === 0 && <Step1 form={form} setForm={setForm} />}
          {step === 1 && <Step2 form={form} setForm={setForm} />}
          {step === 2 && <Step3 form={form} setForm={setForm} />}
          {step === 3 && <Step4 form={form} setForm={setForm} />}
        </div>

        {/* Action bar */}
        <div style={{ backgroundColor: D.white, borderRadius: 10, border: `1px solid ${D.border}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 0 && <DBtn variant="secondary" icon={<ChevronLeft size={14} />} onClick={() => setStep(s => s - 1)}>Previous</DBtn>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {saved && <span style={{ fontSize: 12, color: D.success, fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 5 }}><Check size={13} /> Draft saved</span>}
            <DBtn variant="ghost" onClick={() => setSaved(true)}>Save Draft</DBtn>
            {step < STEPS.length - 1 ? (
              <DBtn onClick={() => setStep(s => s + 1)}>Continue to {STEPS[step + 1]}</DBtn>
            ) : (
              <DBtn icon={<Check size={14} />} onClick={() => navigate("properties")}>Publish Listing</DBtn>
            )}
          </div>
        </div>
      </div>
    </DashLayout>
  )
}
