"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Check,
  ChevronLeft,
  Image as ImageIcon,
  Plus,
  Upload,
  Video,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { teamMembers } from "@/data/team"
import { cn } from "@/lib/utils"

const STEPS = ["Basic Info", "Details", "Media Upload", "Owner Info"] as const

const STEP_DESCRIPTIONS = [
  "Fill in the core listing details.",
  "Specify property specs and amenities.",
  "Upload high-quality images and video.",
  "Link the property owner and assign a broker.",
] as const

const AMENITIES = [
  "Covered Parking",
  "Gymnasium",
  "Swimming Pool",
  "24/7 Security",
  "High-Speed Lift",
  "Landscaped Garden",
  "Broadband Ready",
  "Power Backup",
  "Clubhouse",
  "Intercom",
  "CCTV Surveillance",
  "Children Play Area",
  "Jogging Track",
  "Visitor Parking",
  "Rainwater Harvesting",
] as const

const MEDIA_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1758448511320-05d7d28f4298?w=200&h=140&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=200&h=140&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1663811396760-b6c84fa45ee9?w=200&h=140&fit=crop&auto=format",
] as const

interface PropertyFormState {
  title: string
  type: string
  city: string
  address: string
  price: string
  status: string
  possession: string
  rera: string
  area: string
  beds: string
  baths: string
  furnishing: string
  amenities: Set<string>
  description: string
  floor: string
  facing: string
  age: string
  videoUrl: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  ownerType: string
  ownerNotes: string
  broker: string
}

const initialFormState: PropertyFormState = {
  title: "",
  type: "",
  city: "",
  address: "",
  price: "",
  status: "",
  possession: "",
  rera: "",
  area: "",
  beds: "",
  baths: "",
  furnishing: "",
  amenities: new Set(),
  description: "",
  floor: "",
  facing: "",
  age: "",
  videoUrl: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
  ownerType: "",
  ownerNotes: "",
  broker: "",
}

function PropertyFormStepper({ step }: { step: number }) {
  return (
    <Card className="mb-5 gap-0 py-0">
      <CardContent className="flex items-center px-8 py-5">
        {STEPS.map((label, index) => {
          const done = index < step
          const active = index === step

          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-bold transition-colors",
                    done && "border-success bg-success text-white",
                    active &&
                      "border-accent bg-accent text-primary shadow-[0_0_0_4px_rgba(212,161,94,0.2)]",
                    !done &&
                      !active &&
                      "border-border bg-muted text-muted-foreground"
                  )}
                >
                  {done ? <Check className="size-4" strokeWidth={3} /> : index + 1}
                </div>
                <div>
                  <div
                    className={cn(
                      "text-[11px] font-bold tracking-wide uppercase",
                      done && "text-success",
                      active && "text-foreground",
                      !done && !active && "text-muted-foreground"
                    )}
                  >
                    Step {index + 1}
                  </div>
                  <div
                    className={cn(
                      "text-[13px]",
                      active || done
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </div>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-0.5 flex-1 transition-colors",
                    done ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default function NewPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<PropertyFormState>(initialFormState)
  const [draftSaved, setDraftSaved] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const toggleAmenity = (amenity: string) => {
    setForm((current) => {
      const amenities = new Set(current.amenities)
      if (amenities.has(amenity)) {
        amenities.delete(amenity)
      } else {
        amenities.add(amenity)
      }
      return { ...current, amenities }
    })
  }

  const saveDraft = () => {
    setDraftSaved(true)
    toast.add({
      type: "success",
      title: "Draft saved",
      description: "Your property listing draft has been saved locally.",
    })
  }

  const publishListing = () => {
    toast.add({
      type: "success",
      title: "Property published!",
      description: "The listing is now live in your property catalog.",
    })
    router.push("/properties")
  }

  return (
    <div className="mx-auto max-w-[900px]">
      <Link
        href="/properties"
        className="mb-5 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to Properties
      </Link>

      <PropertyFormStepper step={step} />

      <Card className="mb-5 gap-0 py-0">
        <CardContent className="px-8 py-7">
          <div className="mb-6 border-b border-border pb-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {STEPS[step]}
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {STEP_DESCRIPTIONS[step]}
            </p>
          </div>

          {step === 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g. Serenity Heights — 3BHK Apartment"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Property Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, type: value ?? "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["Flat", "Shop", "Villa", "Studio"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>City / Location</Label>
                <Select
                  value={form.city}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, city: value ?? "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Mumbai",
                      "Delhi NCR",
                      "Bengaluru",
                      "Pune",
                      "Hyderabad",
                      "Chennai",
                    ].map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  placeholder="Plot number, street, area, pincode"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price">Listing Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  placeholder="e.g. 28000000"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Listing Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, status: value ?? "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Ready to Move",
                      "Under Construction",
                      "New Launch",
                      "Sold",
                    ].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="possession">Possession Date</Label>
                <Input
                  id="possession"
                  type="date"
                  value={form.possession}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      possession: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rera">RERA Registration No.</Label>
                <Input
                  id="rera"
                  value={form.rera}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      rera: event.target.value,
                    }))
                  }
                  placeholder="e.g. P51800043210"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="space-y-1.5">
                  <Label htmlFor="area">Total Area (sqft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={form.area}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        area: event.target.value,
                      }))
                    }
                    placeholder="e.g. 1650"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Bedrooms</Label>
                  <Select
                    value={form.beds}
                    onValueChange={(value) =>
                      setForm((current) => ({ ...current, beds: value ?? "" }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["Studio", "1", "2", "3", "4", "5", "6+"].map((bed) => (
                        <SelectItem key={bed} value={bed}>
                          {bed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Bathrooms</Label>
                  <Select
                    value={form.baths}
                    onValueChange={(value) =>
                      setForm((current) => ({ ...current, baths: value ?? "" }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5", "6+"].map((bath) => (
                        <SelectItem key={bath} value={bath}>
                          {bath}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Furnishing</Label>
                  <Select
                    value={form.furnishing}
                    onValueChange={(value) =>
                      setForm((current) => ({
                        ...current,
                        furnishing: value ?? "",
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["Furnished", "Semi-Furnished", "Unfurnished"].map(
                        (option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {AMENITIES.map((amenity) => {
                    const checked = form.amenities.has(amenity)
                    return (
                      <label
                        key={amenity}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-2 text-[11px] transition-colors",
                          checked
                            ? "border-accent bg-accent/10 font-semibold text-accent-foreground"
                            : "border-border text-foreground/80"
                        )}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        {amenity}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Write a detailed description of the property..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="floor">Floor Number</Label>
                  <Input
                    id="floor"
                    value={form.floor}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        floor: event.target.value,
                      }))
                    }
                    placeholder="e.g. 12"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Property Facing</Label>
                  <Select
                    value={form.facing}
                    onValueChange={(value) =>
                      setForm((current) => ({ ...current, facing: value ?? "" }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Property facing..." />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "North",
                        "South",
                        "East",
                        "West",
                        "North-East",
                        "North-West",
                        "South-East",
                        "South-West",
                      ].map((facing) => (
                        <SelectItem key={facing} value={facing}>
                          {facing}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Property Age</Label>
                  <Select
                    value={form.age}
                    onValueChange={(value) =>
                      setForm((current) => ({ ...current, age: value ?? "" }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Property age..." />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "New Construction",
                        "0–5 years",
                        "5–10 years",
                        "10–20 years",
                        "20+ years",
                      ].map((age) => (
                        <SelectItem key={age} value={age}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-7">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      Property Images
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Upload up to 20 images. First image becomes the cover.
                    </p>
                  </div>
                  <Button type="button" variant="outline" size="sm" className="gap-1.5">
                    <Plus className="size-3.5" />
                    Add Images
                  </Button>
                </div>

                <div
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(event) => {
                    event.preventDefault()
                    setDragOver(false)
                  }}
                  className={cn(
                    "mb-4 rounded-[10px] border-2 border-dashed px-6 py-8 text-center transition-colors",
                    dragOver
                      ? "border-accent bg-accent/5"
                      : "border-border bg-muted/40"
                  )}
                >
                  <Upload
                    className={cn(
                      "mx-auto mb-2.5 size-7",
                      dragOver ? "text-accent" : "text-muted-foreground"
                    )}
                  />
                  <p className="text-sm font-semibold text-foreground/80">
                    Drop images here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, WebP — Max 5MB each
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {MEDIA_PLACEHOLDERS.map((src, index) => (
                    <div
                      key={src}
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted",
                        index === 0 ? "border-accent border-2" : "border-border"
                      )}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                      {index === 0 && (
                        <span className="absolute top-1.5 left-1.5 rounded bg-accent px-1.5 py-0.5 text-[9px] font-bold text-primary">
                          COVER
                        </span>
                      )}
                      <button
                        type="button"
                        className="absolute top-1 right-1 flex size-[22px] items-center justify-center rounded-full bg-black/55"
                        aria-label="Remove image"
                      >
                        <X className="size-2.5 text-white" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40"
                    aria-label="Add image slot"
                  >
                    <Plus className="size-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-heading mb-1 text-base font-semibold">
                  Property Video / Walkthrough
                </h3>
                <p className="mb-3.5 text-xs text-muted-foreground">
                  Optionally upload a walkthrough video or paste a YouTube/Vimeo
                  URL.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-[10px] border-2 border-dashed border-border bg-muted/40 px-5 py-7 text-center">
                    <Video className="mx-auto mb-2 size-6 text-muted-foreground" />
                    <p className="text-[13px] font-semibold text-foreground/80">
                      Upload Video File
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      MP4, MOV — Max 200MB
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="video-url">YouTube / Vimeo URL</Label>
                      <Input
                        id="video-url"
                        value={form.videoUrl}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            videoUrl: event.target.value,
                          }))
                        }
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <div className="relative flex h-[100px] items-center justify-center overflow-hidden rounded-lg bg-primary">
                      <ImageIcon className="size-6 text-white/20" />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] text-white/40">
                        Video thumbnail will appear here
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3.5">
                <p className="text-[13px] font-semibold text-accent-foreground">
                  Owner / Client Association
                </p>
                <p className="text-xs text-foreground/80">
                  Link this property to an existing client/owner or add new
                  contact details.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="owner-name">Owner Full Name</Label>
                <Input
                  id="owner-name"
                  value={form.ownerName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      ownerName: event.target.value,
                    }))
                  }
                  placeholder="e.g. Rajesh Mehta"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="owner-phone">Owner Phone</Label>
                <Input
                  id="owner-phone"
                  type="tel"
                  value={form.ownerPhone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      ownerPhone: event.target.value,
                    }))
                  }
                  placeholder="+91 98210 00000"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="owner-email">Owner Email</Label>
                <Input
                  id="owner-email"
                  type="email"
                  value={form.ownerEmail}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      ownerEmail: event.target.value,
                    }))
                  }
                  placeholder="owner@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Owner Type</Label>
                <Select
                  value={form.ownerType}
                  onValueChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      ownerType: value ?? "",
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["Individual", "Builder", "Corporate", "NRI"].map(
                      (type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="owner-notes">Additional Notes</Label>
                <Textarea
                  id="owner-notes"
                  rows={3}
                  value={form.ownerNotes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      ownerNotes: event.target.value,
                    }))
                  }
                  placeholder="Any notes about the owner, deal terms, or special instructions..."
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <Label>Assign To Broker</Label>
                <Select
                  value={form.broker}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, broker: value ?? "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Assign to team member..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div>
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                className="gap-1.5"
                onClick={() => setStep((current) => current - 1)}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            {draftSaved && (
              <span className="flex items-center gap-1 text-xs text-success">
                <Check className="size-3.5" />
                Draft saved
              </span>
            )}
            <Button type="button" variant="ghost" onClick={saveDraft}>
              Save Draft
            </Button>
            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={() => setStep((current) => current + 1)}
              >
                Continue to {STEPS[step + 1]}
              </Button>
            ) : (
              <Button type="button" className="gap-1.5" onClick={publishListing}>
                <Check className="size-4" />
                Publish Listing
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
