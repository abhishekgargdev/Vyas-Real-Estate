"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Briefcase, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AuthRole = "broker" | "customer"

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<AuthRole>("broker")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(role === "broker" ? "/dashboard" : "/portal")
  }

  return (
    <Card className="w-full max-w-[420px] gap-0 py-0 shadow-md">
      <CardContent className="px-8 py-8">
        <div className="mb-6 text-center">
          <h1 className="font-heading mb-1.5 text-2xl font-bold text-foreground">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join Vyas Real Estate today
          </p>
        </div>

        <Tabs
          value={role}
          onValueChange={(value) => setRole(value as AuthRole)}
          className="gap-5"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="broker" className="gap-1.5">
              <Briefcase className="size-3.5" />
              Broker
            </TabsTrigger>
            <TabsTrigger value="customer" className="gap-1.5">
              <User className="size-3.5" />
              Customer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="broker">
            <p className="mb-4 text-xs text-muted-foreground">
              Register as a broker to list properties and manage your client
              pipeline.
            </p>
          </TabsContent>
          <TabsContent value="customer">
            <p className="mb-4 text-xs text-muted-foreground">
              Create a customer account to save properties and book site visits.
            </p>
          </TabsContent>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="e.g. Priya Mehta"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-email">Email Address</Label>
              <Input
                id="signup-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-phone">Phone Number</Label>
              <Input
                id="signup-phone"
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="+91 98210 00000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-confirm">Confirm Password</Label>
              <Input
                id="signup-confirm"
                type="password"
                value={form.confirmPassword}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full font-bold">
              Create {role === "broker" ? "Broker" : "Customer"} Account
            </Button>
          </form>
        </Tabs>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-accent-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
