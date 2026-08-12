import { CustomerNav } from "@/components/customer/CustomerNav"

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      <main className="mx-auto max-w-[1200px] px-6 py-8 lg:px-8">
        {children}
      </main>
    </div>
  )
}
