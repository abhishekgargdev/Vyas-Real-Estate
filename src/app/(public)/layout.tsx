import { Footer } from "@/components/shared/Footer"
import { Navbar } from "@/components/shared/Navbar"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-w-[1024px] overflow-x-auto bg-background">
      <Navbar />
      <main className="pt-[68px]">{children}</main>
      <Footer />
    </div>
  )
}
