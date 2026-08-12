"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  Target,
} from "lucide-react"

import {
  GoldDivider,
  SectionLabel,
} from "@/components/public/section-label"
import { TeamMemberCard } from "@/components/public/team-member-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { teamMembers } from "@/data/team"
import { cn } from "@/lib/utils"

const headerStats = [
  { value: "1,460+", label: "Active Listings" },
  { value: "3,200+", label: "Families Served" },
  { value: "12", label: "Cities" },
] as const

const storyStats = [
  { value: "2007", label: "Founded" },
  { value: "200+", label: "Certified Agents" },
  { value: "₹4,200 Cr+", label: "Transactions" },
] as const

const milestones = [
  {
    year: "2007",
    title: "Founded",
    body: "Arjun Vyas opens a 2-person brokerage in Nariman Point, Mumbai.",
  },
  {
    year: "2010",
    title: "100 Deals",
    body: "Hit our first 100-transaction milestone. Expanded to Bandra & Juhu markets.",
  },
  {
    year: "2013",
    title: "Delhi Launch",
    body: "Opened the Delhi NCR office, marking our first expansion outside Maharashtra.",
  },
  {
    year: "2016",
    title: "RERA Pioneer",
    body: "Among the first brokerages to fully integrate RERA compliance across all listings.",
  },
  {
    year: "2019",
    title: "₹1,000 Cr Transactions",
    body: "Crossed ₹1,000 Cr in total transacted value across residential and commercial.",
  },
  {
    year: "2022",
    title: "6 Cities",
    body: "Now operating in Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, and Chennai.",
  },
  {
    year: "2025",
    title: "3,200+ Families",
    body: "Surpassed 3,200 families served. Launching NRI Property Desk nationwide.",
  },
] as const

function AboutPageHeader() {
  return (
    <section className="bg-primary py-16 pb-[72px]">
      <div className="mx-auto max-w-[1440px] px-12">
        <nav className="mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-[13px] text-white/50 transition-colors hover:text-white/70"
          >
            Home
          </Link>
          <ChevronRight className="size-[13px] text-white/30" />
          <span className="text-[13px] font-medium text-accent">About Us</span>
        </nav>

        <div className="flex items-end justify-between">
          <div>
            <GoldDivider />
            <h1 className="font-heading mt-1.5 mb-3.5 text-[52px] leading-[1.1] font-bold text-white">
              About Us
            </h1>
            <p className="max-w-[520px] text-base leading-relaxed text-white/55">
              Eighteen years of trust, transparency, and thousands of families
              finding their perfect home.
            </p>
          </div>
          <div className="flex gap-8 text-right">
            {headerStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-4xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs tracking-wide text-white/45">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function OurStory() {
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-[1440px] px-12">
        <div className="grid grid-cols-2 items-center gap-20">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-heading mt-1.5 mb-6 text-[40px] leading-tight font-bold text-foreground">
              Built on Trust,
              <br />
              Driven by Results
            </h2>
            <p className="mb-4.5 text-[15px] leading-relaxed text-foreground/80">
              Vyas Real Estate was founded in 2007 by Arjun Vyas, a
              first-generation broker from Mumbai with a single conviction: that
              buying or selling property should never feel opaque or stressful.
            </p>
            <p className="mb-4.5 text-[15px] leading-relaxed text-foreground/80">
              What began as a two-person operation in a modest Nariman Point
              office has grown into a 200-person network spanning Mumbai, Delhi
              NCR, Bengaluru, Pune, Hyderabad, and Chennai — handling everything
              from first-time flat purchases to large-scale commercial
              acquisitions.
            </p>
            <p className="mb-9 text-[15px] leading-relaxed text-foreground/80">
              Every property we represent has been physically verified and
              RERA-checked. Every agent in our network is certified, trained, and
              held to the same standard of honesty that built our name.
            </p>
            <div className="flex gap-8">
              {storyStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-[28px] font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1780733066519-df99b3123d30?w=800&h=600&fit=crop&auto=format"
                alt="Vyas team consulting with clients"
                fill
                className="object-cover"
                sizes="(max-width: 1440px) 50vw, 600px"
              />
            </div>
            <Card className="absolute -bottom-6 -left-6 gap-0 border-0 bg-primary px-6 shadow-lg">
              <CardContent className="py-5">
                <div className="font-heading text-[32px] font-bold text-accent">
                  18
                </div>
                <div className="mt-0.5 text-xs tracking-wide text-white/60 uppercase">
                  Years of Excellence
                </div>
              </CardContent>
            </Card>
            <div className="absolute top-6 -right-3 h-20 w-1 rounded-sm bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionVision() {
  return (
    <section className="bg-card pb-24">
      <div className="mx-auto max-w-[1440px] px-12">
        <div className="grid grid-cols-2 gap-6">
          <Card className="relative overflow-hidden border-0 bg-primary py-12">
            <div className="pointer-events-none absolute -top-8 -right-8 size-[140px] rounded-full border border-accent/15" />
            <div className="pointer-events-none absolute -top-15 -right-15 size-[200px] rounded-full border border-accent/8" />
            <CardContent className="relative px-11">
              <div className="mb-6 flex size-[52px] items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Target className="size-[26px]" />
              </div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
                Our Mission
              </p>
              <h3 className="font-heading mb-4.5 text-[28px] leading-tight font-bold text-white">
                Making Every Property Transaction Honest
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                To provide every buyer, seller, and investor with verified
                information, certified expertise, and end-to-end support —
                eliminating the friction, opacity, and anxiety that has
                historically defined real estate transactions in India.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border border-accent/20 bg-accent/10 py-12">
            <div className="pointer-events-none absolute -top-8 -right-8 size-[140px] rounded-full border border-accent/20" />
            <div className="pointer-events-none absolute -top-15 -right-15 size-[200px] rounded-full border border-accent/10" />
            <CardContent className="relative px-11">
              <div className="mb-6 flex size-[52px] items-center justify-center rounded-xl bg-accent text-primary">
                <Eye className="size-[26px]" />
              </div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.12em] text-accent-foreground uppercase">
                Our Vision
              </p>
              <h3 className="font-heading mb-4.5 text-[28px] leading-tight font-bold text-foreground">
                India&apos;s Most Trusted Property Marketplace
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                To become the definitive real estate partner for Indian families
                and investors — expanding to 25 cities by 2028 while maintaining
                the same commitment to verification, transparency, and
                client-first service that earned us our reputation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function TeamGrid() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-[1440px] px-12">
        <div className="mb-16 text-center">
          <GoldDivider center />
          <span className="text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
            Meet the Team
          </span>
          <h2 className="font-heading mt-2.5 mb-3.5 text-[40px] leading-[1.15] font-bold text-foreground">
            The Experts Behind Every Deal
          </h2>
          <p className="mx-auto max-w-[500px] text-[15px] leading-relaxed text-muted-foreground">
            Our certified brokers bring deep local knowledge, decades of combined
            experience, and a genuine commitment to your interests.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const [active, setActive] = useState(milestones.length - 1)

  return (
    <section className="overflow-hidden bg-card py-24">
      <div className="mx-auto max-w-[1440px] px-12">
        <div className="mb-16 text-center">
          <GoldDivider center />
          <span className="text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
            Our Journey
          </span>
          <h2 className="font-heading mt-2.5 text-[40px] leading-[1.15] font-bold text-foreground">
            18 Years of Milestones
          </h2>
        </div>

        <div className="relative pb-15">
          <div className="absolute top-5 right-0 left-0 h-0.5 bg-border" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-accent transition-[width] duration-300"
            style={{
              width: `${(active / (milestones.length - 1)) * 100}%`,
            }}
          />

          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))`,
            }}
          >
            {milestones.map((milestone, index) => {
              const isActive = index === active
              const isPast = index <= active

              return (
                <button
                  key={milestone.year}
                  type="button"
                  onClick={() => setActive(index)}
                  className="flex cursor-pointer flex-col items-center border-0 bg-transparent p-0"
                >
                  <div
                    className={cn(
                      "relative z-1 flex items-center justify-center rounded-full transition-all duration-250",
                      isActive
                        ? "-mt-3.5 size-11 border-[3px] border-accent bg-accent shadow-[0_0_0_6px_rgba(212,161,94,0.2)]"
                        : isPast
                          ? "mt-3 size-4 border-2 border-foreground/60 bg-foreground/60"
                          : "mt-3 size-4 border-2 border-border bg-border"
                    )}
                  >
                    {isActive ? (
                      <div className="size-2.5 rounded-full bg-primary" />
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "font-heading mt-3 font-bold transition-all",
                      isActive
                        ? "text-base text-accent"
                        : isPast
                          ? "text-[13px] text-foreground/70"
                          : "text-[13px] text-muted-foreground"
                    )}
                  >
                    {milestone.year}
                  </div>

                  <div
                    className={cn(
                      "mt-3 max-w-[140px] rounded-lg px-3 py-3.5 text-center transition-all",
                      isActive ? "border border-primary bg-primary" : "border border-transparent"
                    )}
                  >
                    <div
                      className={cn(
                        "text-xs font-bold",
                        isActive ? "mb-1.5 text-white" : "text-foreground/70"
                      )}
                    >
                      {milestone.title}
                    </div>
                    {isActive ? (
                      <p className="text-[11px] leading-relaxed text-white/60">
                        {milestone.body}
                      </p>
                    ) : null}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-12 pb-24">
      <Card className="flex-row items-center justify-between gap-15 border border-border bg-muted/50 px-20 py-16 shadow-sm">
        <CardContent className="px-0">
          <GoldDivider />
          <span className="text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
            Ready to Start?
          </span>
          <h2 className="font-heading mt-2.5 mb-3.5 text-[38px] leading-tight font-bold text-foreground">
            Get in Touch with
            <br />
            Our Team Today
          </h2>
          <p className="max-w-[460px] text-[15px] leading-relaxed text-muted-foreground">
            Whether you&apos;re buying, selling, or investing — our certified
            brokers are ready to guide you every step of the way. No pressure,
            no commissions, just honest advice.
          </p>
        </CardContent>

        <div className="flex shrink-0 flex-col gap-3 px-6">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/contact" />}
          >
            Contact Us
            <ArrowRight className="size-4" />
          </Button>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4.5 py-2.5">
              <Phone className="size-3.5 text-accent" />
              <span className="text-[13px] font-semibold text-foreground">
                +91 98210 00000
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4.5 py-2.5">
              <Mail className="size-3.5 text-accent" />
              <span className="text-[13px] font-semibold text-foreground">
                hello@vyasrealty.in
              </span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <AboutPageHeader />
      <OurStory />
      <MissionVision />
      <TeamGrid />
      <Timeline />
      <AboutCta />
    </>
  )
}
