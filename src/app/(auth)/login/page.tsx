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
import { isAuthRole, type AuthRole } from "@/types"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<AuthRole>("broker")
  const [form, setForm] = useState({ email: "", password: "" })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(role === "broker" ? "/dashboard" : "/portal")
  }

  return (
    <Card className="w-full max-w-[420px] gap-0 py-0 shadow-md">
      <CardContent className="px-8 py-8">
        <div className="mb-6 text-center">
          <h1 className="font-heading mb-1.5 text-2xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your Vyas account
          </p>
        </div>

        <Tabs
          value={role}
          onValueChange={(value) => {
            if (isAuthRole(value)) setRole(value)
          }}
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
              Access your dashboard, manage listings, and track client visits.
            </p>
          </TabsContent>
          <TabsContent value="customer">
            <p className="mb-4 text-xs text-muted-foreground">
              View saved properties, scheduled visits, and your purchase journey.
            </p>
          </TabsContent>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
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
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  className="text-xs text-accent-foreground hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="login-password"
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
            <Button type="submit" className="w-full font-bold">
              Sign In as {role === "broker" ? "Broker" : "Customer"}
            </Button>
          </form>
        </Tabs>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-accent-foreground hover:underline"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
