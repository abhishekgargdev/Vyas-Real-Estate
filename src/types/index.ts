export type PropertyType = "Flat" | "Villa" | "Shop" | "Studio"

export type PropertyStatus =
  | "ready"
  | "under-construction"
  | "new-launch"
  | "sold"

export type Furnishing = "furnished" | "semi-furnished" | "unfurnished"

export interface Property {
  id: string
  title: string
  location: string
  city: string
  address?: string
  price: number
  priceLabel: string
  pricePerSqft?: string
  beds: number
  baths: number
  area: string
  type: PropertyType
  status: PropertyStatus
  furnishing: Furnishing
  images: string[]
  thumbnail: string
  liked: boolean
  featured: boolean
  listedDate: string
  description?: string
  reraId?: string
}

export type ClientStatus =
  | "new"
  | "contacted"
  | "visit-scheduled"
  | "negotiation"
  | "closed"
  | "lost"

export interface Client {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  location: string
  propertyInterest: string
  propertyType: string
  budget: string
  status: ClientStatus
  lastContact: string
  visitDate: string
  notes: string
  dealValue?: string
}

export type VisitType = "site-visit" | "follow-up" | "handover"

export type VisitStatus = "pending" | "completed" | "cancelled" | "upcoming"

export interface Visit {
  id: string
  client: string
  property: string
  location?: string
  time: string
  date: string
  day: number
  month: number
  year: number
  type: VisitType
  phone: string
  broker?: string
  notes: string
  status: VisitStatus
  confirmed?: boolean
}

export type TransactionType = "Sale" | "Rental"

export type TransactionStatus = "settled" | "pending"

export interface Transaction {
  id: string
  property: string
  client: string
  type: TransactionType
  date: string
  amount: string
  commission: string
  status: TransactionStatus
}

export interface TeamMember {
  id: string
  name: string
  role: string
  city: string
  email?: string
  deals: string
  dealsCount?: number
  image: string
  initials?: string
  status?: "active" | "inactive"
}

export interface Testimonial {
  id: string
  name: string
  role: string
  photo: string
  review: string
  rating: number
  property: string
}

export type AuthRole = "broker" | "customer"

export function isAuthRole(
  value: string | null | undefined
): value is AuthRole {
  return value === "broker" || value === "customer"
}

export interface CustomerEnquiryEntry {
  propertyMatch: string
  status: ClientStatus
  date: string
}

export interface CustomerEnquiry {
  id: string
  property: Property
  status: ClientStatus
  date: string
}

export type NotificationKey =
  | "newLead"
  | "visitReminder"
  | "dealClosed"
  | "newMessage"
  | "monthlyReport"
  | "teamActivity"
  | "smsAlerts"
  | "emailDigest"

export type BrokerTeamStatus = "active" | "inactive"

export interface BrokerTeamMember {
  id: string
  name: string
  role: string
  email: string
  status: BrokerTeamStatus
  initials: string
}

export interface ActiveSession {
  device: string
  location: string
  time: string
  current: boolean
}

export interface PropertyFormState {
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
