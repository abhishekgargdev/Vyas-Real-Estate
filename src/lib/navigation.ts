const PROPERTY_DETAIL_PATTERN = /^\/properties\/[^/]+$/

export function isPublicNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  if (href === "/listings") {
    return pathname === "/listings" || PROPERTY_DETAIL_PATTERN.test(pathname)
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function isBrokerNavActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function isCustomerNavActive(
  pathname: string,
  href: string,
  hash = ""
): boolean {
  if (href === "/portal#preferences") {
    return pathname === "/portal" && hash === "#preferences"
  }
  if (href === "/portal") {
    return pathname === "/portal" && hash !== "#preferences"
  }
  if (href === "/listings") {
    return pathname === "/listings" || PROPERTY_DETAIL_PATTERN.test(pathname)
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getBrokerPageTitle(
  pathname: string,
  titles: { prefix: string; title: string }[]
): string {
  const match = [...titles]
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(
      ({ prefix }) =>
        pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  return match?.title ?? "Dashboard"
}
