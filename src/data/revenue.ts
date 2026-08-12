import type { Transaction } from "@/types"

export const transactions: Transaction[] = [
  {
    id: "TXN-1024",
    property: "Serenity Heights 3BHK",
    client: "Priya Mehta",
    type: "Sale",
    date: "Aug 10, 2026",
    amount: "₹2.8 Cr",
    commission: "₹5.6 L",
    status: "settled",
  },
  {
    id: "TXN-1023",
    property: "Greenwood Villa 4BHK",
    client: "Anita Desai",
    type: "Sale",
    date: "Aug 5, 2026",
    amount: "₹1.9 Cr",
    commission: "₹3.8 L",
    status: "settled",
  },
  {
    id: "TXN-1022",
    property: "Horizon Tower Suite",
    client: "Sameer Gupta",
    type: "Rental",
    date: "Jul 28, 2026",
    amount: "₹4.2 L/yr",
    commission: "₹42 K",
    status: "pending",
  },
  {
    id: "TXN-1021",
    property: "Azure Pool Villa 5BHK",
    client: "Sunita Kapoor",
    type: "Sale",
    date: "Jul 20, 2026",
    amount: "₹5.4 Cr",
    commission: "₹10.8 L",
    status: "settled",
  },
  {
    id: "TXN-1020",
    property: "Skyline Studio 1BHK",
    client: "Aryan Bose",
    type: "Sale",
    date: "Jul 15, 2026",
    amount: "₹72 L",
    commission: "₹1.4 L",
    status: "settled",
  },
  {
    id: "TXN-1019",
    property: "Lakeview Bungalow 6BHK",
    client: "Ritu Verma",
    type: "Sale",
    date: "Jul 10, 2026",
    amount: "₹8.5 Cr",
    commission: "₹17 L",
    status: "pending",
  },
  {
    id: "TXN-1018",
    property: "Emerald Residency 2BHK",
    client: "Dev Malhotra",
    type: "Sale",
    date: "Jun 28, 2026",
    amount: "₹1.1 Cr",
    commission: "₹2.2 L",
    status: "settled",
  },
  {
    id: "TXN-1017",
    property: "Priya Towers 3BHK",
    client: "Kavya Iyer",
    type: "Rental",
    date: "Jun 20, 2026",
    amount: "₹55 K/mo",
    commission: "₹55 K",
    status: "settled",
  },
]

export const revenueSummary = {
  totalRevenue: "₹38.6 L",
  revenueChange: "+18.4%",
  transactionCount: 36,
  transactionChange: "+7 vs last period",
  activeClients: 24,
  activeClientsChange: "+3",
  avgCommission: "₹2.1 L",
  avgCommissionChange: "-5.2%",
}

export const monthlyRevenueTrend = [
  { month: "Jan", revenue: 28, leads: 34 },
  { month: "Feb", revenue: 34, leads: 41 },
  { month: "Mar", revenue: 22, leads: 28 },
  { month: "Apr", revenue: 47, leads: 52 },
  { month: "May", revenue: 38, leads: 44 },
  { month: "Jun", revenue: 53, leads: 61 },
  { month: "Jul", revenue: 41, leads: 48 },
  { month: "Aug", revenue: 62, leads: 70 },
]

export const revenueByPropertyType = [
  { type: "Flats", revenue: 48.4, transactions: 12 },
  { type: "Villas", revenue: 32.1, transactions: 5 },
  { type: "Shops", revenue: 18.7, transactions: 8 },
  { type: "Plots", revenue: 11.2, transactions: 4 },
  { type: "Studios", revenue: 8.5, transactions: 7 },
]

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((transaction) => transaction.id === id)
}
