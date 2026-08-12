"use client"

import { useState } from "react"
import {
  Bell,
  Building2,
  Camera,
  CreditCard,
  Plus,
  Shield,
  Trash2,
  User,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import type {
  ActiveSession,
  BrokerTeamMember,
  NotificationKey,
} from "@/types"

const SETTINGS_TABS = [
  { value: "profile", label: "Profile", icon: User },
  { value: "company", label: "Company Info", icon: Building2 },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "payment", label: "Payment & Bank", icon: CreditCard },
  { value: "team", label: "Team Members", icon: Users },
  { value: "security", label: "Security", icon: Shield },
] as const

const BROKER_TEAM: BrokerTeamMember[] = [
  {
    id: "1",
    name: "Rajesh Vyas",
    role: "Admin",
    email: "rajesh@vyasrealty.com",
    status: "active",
    initials: "RV",
  },
  {
    id: "2",
    name: "Meera Shah",
    role: "Agent",
    email: "meera@vyasrealty.com",
    status: "active",
    initials: "MS",
  },
  {
    id: "3",
    name: "Amit Kulkarni",
    role: "Agent",
    email: "amit@vyasrealty.com",
    status: "active",
    initials: "AK",
  },
  {
    id: "4",
    name: "Neha Joshi",
    role: "Coordinator",
    email: "neha@vyasrealty.com",
    status: "inactive",
    initials: "NJ",
  },
]

const ACTIVE_SESSIONS: ActiveSession[] = [
  {
    device: "Chrome · MacBook Pro",
    location: "Mumbai, IN",
    time: "Active now",
    current: true,
  },
  {
    device: "Safari · iPhone 14 Pro",
    location: "Mumbai, IN",
    time: "2 hours ago",
    current: false,
  },
  {
    device: "Chrome · Windows PC",
    location: "Delhi, IN",
    time: "3 days ago",
    current: false,
  },
]

const NOTIFICATION_GROUPS = [
  {
    title: "Lead & Client Alerts",
    items: [
      {
        key: "newLead",
        label: "New lead received",
        desc: "Get notified when a new inquiry comes in",
      },
      {
        key: "newMessage",
        label: "New message from client",
        desc: "In-app and email notification",
      },
    ],
  },
  {
    title: "Visit Notifications",
    items: [
      {
        key: "visitReminder",
        label: "Visit reminder (24 hrs before)",
        desc: "Reminder email 24 hours before a scheduled visit",
      },
    ],
  },
  {
    title: "Business Updates",
    items: [
      {
        key: "dealClosed",
        label: "Deal closed confirmation",
        desc: "Summary when a transaction is finalized",
      },
      {
        key: "monthlyReport",
        label: "Monthly performance report",
        desc: "Auto-generated analytics summary",
      },
      {
        key: "teamActivity",
        label: "Team activity summary",
        desc: "Weekly digest of team actions",
      },
    ],
  },
  {
    title: "Delivery Channels",
    items: [
      {
        key: "smsAlerts",
        label: "SMS alerts",
        desc: "Receive key alerts via SMS",
      },
      {
        key: "emailDigest",
        label: "Daily email digest",
        desc: "Consolidated daily summary email",
      },
    ],
  },
] as const

function SettingSwitch({
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-border"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-0.5 left-0.5 block size-5 rounded-full bg-background shadow-sm transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  )
}

function ProfileTab() {
  const [form, setForm] = useState({
    name: "Rajesh Vyas",
    phone: "+91 98765 43210",
    email: "rajesh@vyasrealty.com",
    bio: "15+ years in Mumbai luxury real estate. RERA certified.",
    lang: "English",
    timezone: "IST (UTC+5:30)",
  })

  const handleSave = () => {
    toast.add({
      title: "Profile updated",
      description: "Your profile changes have been saved.",
      type: "success",
    })
  }

  return (
    <div className="max-w-[660px]">
      <Card className="mb-7 gap-0 border-border bg-muted/30 py-0">
        <CardContent className="flex items-center gap-5 px-6 py-5">
          <div className="relative">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                RV
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              size="icon-sm"
              className="absolute right-0 bottom-0 size-6.5 rounded-full border-2 border-background bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Camera className="size-3" />
            </Button>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              {form.name}
            </h3>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Administrator · Vyas Real Estate
            </p>
            <Button variant="outline" size="sm" className="mt-2 gap-1.5 text-xs">
              <Camera className="size-3" />
              Upload Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Language</Label>
          <Select
            value={form.lang}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, lang: value ?? "English" }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Marathi">Marathi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Timezone</Label>
          <Select
            value={form.timezone}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                timezone: value ?? "IST (UTC+5:30)",
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IST (UTC+5:30)">IST (UTC+5:30)</SelectItem>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="GMT">GMT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label>Bio</Label>
          <Textarea
            rows={3}
            value={form.bio}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, bio: event.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex gap-2.5">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button
          variant="outline"
          onClick={() =>
            setForm({
              name: "Rajesh Vyas",
              phone: "+91 98765 43210",
              email: "rajesh@vyasrealty.com",
              bio: "15+ years in Mumbai luxury real estate. RERA certified.",
              lang: "English",
              timezone: "IST (UTC+5:30)",
            })
          }
        >
          Discard
        </Button>
      </div>
    </div>
  )
}

function CompanyTab() {
  const [form, setForm] = useState({
    name: "Vyas Real Estate Pvt. Ltd.",
    tagline: "Premium Properties, Trusted Service",
    address: "Ground Floor, Nariman Point, Mumbai 400021",
    rera: "MAHRERA-A-2009-001234",
    gst: "27AABCV1234D1Z5",
    website: "www.vyasrealty.com",
  })

  return (
    <div className="max-w-[660px]">
      <Card className="mb-6 gap-0 border-border bg-muted/30 py-0">
        <CardContent className="px-6 py-5">
          <Label>Company Logo</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex h-[60px] w-[100px] items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-sm font-bold text-accent">
                VYAS
              </span>
            </div>
            <div>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Camera className="size-3" />
                Upload Logo
              </Button>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                PNG or SVG, min 200×80px
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-2">
          <Label>Company Name</Label>
          <Input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label>Tagline</Label>
          <Input
            value={form.tagline}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, tagline: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label>Office Address</Label>
          <Textarea
            rows={2}
            value={form.address}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, address: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>RERA Number</Label>
          <Input
            value={form.rera}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, rera: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>GST Number</Label>
          <Input
            value={form.gst}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, gst: event.target.value }))
            }
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label>Website</Label>
          <Input
            value={form.website}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, website: event.target.value }))
            }
          />
        </div>
      </div>
      <Button
        onClick={() =>
          toast.add({
            title: "Company info saved",
            type: "success",
          })
        }
      >
        Save Company Info
      </Button>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState<Record<NotificationKey, boolean>>({
    newLead: true,
    visitReminder: true,
    dealClosed: true,
    newMessage: false,
    monthlyReport: true,
    teamActivity: false,
    smsAlerts: true,
    emailDigest: false,
  })

  const toggle = (key: NotificationKey) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="max-w-[600px]">
      {NOTIFICATION_GROUPS.map((group) => (
        <div key={group.title} className="mb-6">
          <h4 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
            {group.title}
          </h4>
          <Card className="gap-0 overflow-hidden py-0">
            {group.items.map((item, index) => (
              <div
                key={item.key}
                className={cn(
                  "flex items-center justify-between gap-4 px-4.5 py-3.5",
                  index < group.items.length - 1 && "border-b border-border"
                )}
              >
                <div>
                  <p className="text-[13px] font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <SettingSwitch
                  checked={prefs[item.key]}
                  onCheckedChange={() => toggle(item.key)}
                />
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  )
}

function PaymentTab() {
  const [form, setForm] = useState({
    accountHolder: "Vyas Real Estate Pvt. Ltd.",
    accountNumber: "4021 0012 3456 7890",
    ifsc: "HDFC0001234",
    bank: "HDFC Bank",
  })

  return (
    <div className="max-w-[600px]">
      <Card className="mb-5 gap-0 py-0">
        <CardHeader className="border-b border-border px-6 py-4">
          <CardTitle className="font-heading text-base font-semibold">
            Bank Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3.5 px-6 py-5 sm:grid-cols-2">
          <div className="grid gap-2 sm:col-span-2">
            <Label>Account Holder Name</Label>
            <Input
              placeholder="As per bank records"
              value={form.accountHolder}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  accountHolder: event.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Account Number</Label>
            <Input
              placeholder="XXXX XXXX XXXX"
              value={form.accountNumber}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  accountNumber: event.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>IFSC Code</Label>
            <Input
              placeholder="XXXXXX0000000"
              value={form.ifsc}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, ifsc: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Bank Name</Label>
            <Select
              value={form.bank}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, bank: value ?? "HDFC Bank" }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                <SelectItem value="SBI">SBI</SelectItem>
                <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                <SelectItem value="Kotak">Kotak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Button
              onClick={() =>
                toast.add({
                  title: "Bank details saved",
                  type: "success",
                })
              }
            >
              Save Bank Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-warning/30 bg-warning-bg px-4.5 py-3.5">
        <p className="text-xs font-bold text-warning">Secure Storage</p>
        <p className="mt-1 text-xs leading-relaxed text-warning/90">
          Bank account details are encrypted and only used for commission
          payouts. Vyas Real Estate will never share this information.
        </p>
      </div>
    </div>
  )
}

function TeamTab() {
  const [team, setTeam] = useState(BROKER_TEAM)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("")

  const handleInvite = () => {
    if (!inviteEmail || !inviteRole) {
      toast.add({
        title: "Missing fields",
        description: "Please enter an email and select a role.",
        type: "error",
      })
      return
    }

    setInviteOpen(false)
    setInviteEmail("")
    setInviteRole("")
    toast.add({
      title: "Invite sent",
      description: `Invitation sent to ${inviteEmail}`,
      type: "success",
    })
  }

  return (
    <div className="max-w-[680px]">
      <div className="mb-4 flex justify-end">
        <Button size="sm" className="gap-1.5" onClick={() => setInviteOpen(true)}>
          <Plus className="size-3.5" />
          Invite Member
        </Button>
      </div>

      <Card className="mb-5 gap-0 overflow-hidden py-0">
        {team.map((member, index) => (
          <div
            key={member.id}
            className={cn(
              "flex items-center gap-3.5 px-4.5 py-3.5",
              index < team.length - 1 && "border-b border-border"
            )}
          >
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                {member.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {member.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-full text-[11px] font-semibold",
                  member.role === "Admin"
                    ? "bg-muted text-foreground"
                    : "bg-muted/60 text-muted-foreground"
                )}
              >
                {member.role}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-full text-[11px] font-semibold capitalize",
                  member.status === "active"
                    ? "bg-success-bg text-success"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {member.status}
              </Badge>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="size-7 text-destructive hover:text-destructive"
                onClick={() =>
                  setTeam((prev) => prev.filter((item) => item.id !== member.id))
                }
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </Card>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="font-heading">Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3.5">
            <div className="grid gap-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="colleague@vyasrealty.com"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select
                value={inviteRole}
                onValueChange={(value) => setInviteRole(value ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  })

  return (
    <div className="max-w-[600px]">
      <Card className="mb-5 gap-0 py-0">
        <CardHeader className="border-b border-border px-6 py-4">
          <CardTitle className="font-heading text-base font-semibold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3.5 px-6 py-5">
          <div className="grid gap-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              placeholder="Enter current password"
              value={passwords.current}
              onChange={(event) =>
                setPasswords((prev) => ({ ...prev, current: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Min 8 characters"
              value={passwords.next}
              onChange={(event) =>
                setPasswords((prev) => ({ ...prev, next: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Re-enter new password"
              value={passwords.confirm}
              onChange={(event) =>
                setPasswords((prev) => ({ ...prev, confirm: event.target.value }))
              }
            />
          </div>
          <Button
            onClick={() =>
              toast.add({
                title: "Password updated",
                type: "success",
              })
            }
          >
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-5 gap-0 py-0">
        <CardContent className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Two-Factor Authentication
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button
            size="sm"
            onClick={() =>
              toast.add({
                title: "2FA setup",
                description: "Two-factor authentication setup will be available soon.",
                type: "info",
              })
            }
          >
            Enable 2FA
          </Button>
        </CardContent>
      </Card>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="border-b border-border px-5 py-3.5">
          <CardTitle className="font-heading text-base font-semibold">
            Active Sessions
          </CardTitle>
        </CardHeader>
        {ACTIVE_SESSIONS.map((session, index) => (
          <div
            key={session.device}
            className={cn(
              "flex items-center justify-between gap-4 px-5 py-3.5",
              index < ACTIVE_SESSIONS.length - 1 && "border-b border-border"
            )}
          >
            <div>
              <p className="text-[13px] font-medium text-foreground">
                {session.device}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {session.location} · {session.time}
              </p>
            </div>
            {session.current ? (
              <Badge
                variant="secondary"
                className="rounded-full bg-success-bg text-[11px] font-bold text-success"
              >
                Current
              </Badge>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-[11px] text-destructive hover:text-destructive"
                onClick={() =>
                  toast.add({
                    title: "Session revoked",
                    type: "info",
                  })
                }
              >
                Revoke
              </Button>
            )}
          </div>
        ))}
      </Card>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="flex flex-col gap-5 lg:flex-row lg:gap-7"
    >
      <Card className="w-full shrink-0 gap-0 overflow-hidden py-0 lg:w-[220px]">
        <TabsList
          variant="line"
          className="h-auto w-full flex-col items-stretch gap-0 rounded-none bg-transparent p-0"
        >
          {SETTINGS_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "h-auto w-full justify-start gap-2.5 rounded-none border-0 border-l-3 border-l-transparent px-4 py-3 text-[13px] font-normal data-active:border-l-accent data-active:bg-accent/10 data-active:font-semibold data-active:text-foreground data-active:shadow-none",
                "after:hidden"
              )}
            >
              <tab.icon className="size-3.5 shrink-0" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Card>

      <div className="min-w-0 flex-1">
        <TabsContent value="profile" className="mt-0">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="company" className="mt-0">
          <CompanyTab />
        </TabsContent>
        <TabsContent value="notifications" className="mt-0">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="payment" className="mt-0">
          <PaymentTab />
        </TabsContent>
        <TabsContent value="team" className="mt-0">
          <TeamTab />
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          <SecurityTab />
        </TabsContent>
      </div>
    </Tabs>
  )
}
