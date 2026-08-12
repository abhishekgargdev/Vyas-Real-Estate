import { clients } from "@/data/clients"
import { properties } from "@/data/properties"
import { visits } from "@/data/visits"
import type { Client, ClientStatus, Property, Visit } from "@/types"

export const CURRENT_CUSTOMER_NAME = "Priya Mehta"

const ENQUIRY_ENTRIES: {
  propertyMatch: string
  status: ClientStatus
  date: string
}[] = [
  { propertyMatch: "Serenity Heights", status: "negotiation", date: "Aug 8" },
  { propertyMatch: "Greenwood", status: "visit-scheduled", date: "Aug 10" },
  { propertyMatch: "Park Avenue", status: "contacted", date: "Aug 11" },
]

export const SAVED_PROPERTY_IDS = ["5", "6", "7"]

export interface CustomerEnquiry {
  id: string
  property: Property
  status: ClientStatus
  date: string
}

function findPropertyByPartialTitle(match: string): Property | undefined {
  return properties.find((property) =>
    property.title.toLowerCase().includes(match.toLowerCase())
  )
}

export function getCurrentCustomer(): Client {
  const customer = clients.find((client) => client.name === CURRENT_CUSTOMER_NAME)
  if (!customer) {
    throw new Error(`Customer not found: ${CURRENT_CUSTOMER_NAME}`)
  }
  return customer
}

export function getCustomerEnquiries(): CustomerEnquiry[] {
  return ENQUIRY_ENTRIES.map((entry, index) => {
    const property = findPropertyByPartialTitle(entry.propertyMatch)
    if (!property) {
      throw new Error(`Property not found for enquiry: ${entry.propertyMatch}`)
    }
    return {
      id: `E00${index + 1}`,
      property,
      status: entry.status,
      date: entry.date,
    }
  })
}

export function getCustomerSavedProperties(): Property[] {
  return SAVED_PROPERTY_IDS.map((id) => properties.find((property) => property.id === id))
    .filter((property): property is Property => property !== undefined)
}

export function getCustomerVisits(): Visit[] {
  return visits.filter((visit) => visit.client === CURRENT_CUSTOMER_NAME)
}

export function getUpcomingCustomerVisits(): Visit[] {
  return getCustomerVisits().filter(
    (visit) => visit.status === "pending" || visit.status === "upcoming"
  )
}
