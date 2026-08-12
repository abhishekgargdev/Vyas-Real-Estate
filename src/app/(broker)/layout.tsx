import { DashLayout } from "@/components/broker/DashLayout"

export default function BrokerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashLayout>{children}</DashLayout>
}
