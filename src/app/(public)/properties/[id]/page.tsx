import { notFound } from "next/navigation"

import { PropertyDetailView } from "@/components/public/property-detail-view"
import { getPropertyById, properties } from "@/data/properties"

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }))
}

export default async function PropertyDetailPage({
  params,
}: PageProps<"/properties/[id]">) {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  const similarProperties = properties
    .filter(
      (item) =>
        item.id !== property.id &&
        (item.city === property.city || item.type === property.type)
    )
    .slice(0, 4)

  const fallbackSimilar = properties
    .filter(
      (item) =>
        item.id !== property.id &&
        !similarProperties.some((similar) => similar.id === item.id)
    )
    .slice(0, 4 - similarProperties.length)

  return (
    <PropertyDetailView
      property={property}
      similarProperties={[...similarProperties, ...fallbackSimilar]}
    />
  )
}
