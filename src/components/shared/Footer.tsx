"use client"

import Link from "next/link"
import { useState } from "react"
import {
  AtSign,
  Building2,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Rss,
  Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/listings" },
  { label: "Contact Us", href: "/contact" },
] as const

const contactItems = [
  { icon: Phone, text: "+91 98210 00000" },
  { icon: Mail, text: "hello@vyasrealty.in" },
  { icon: MapPin, text: "14B, Nariman Point,\nMumbai — 400 021" },
] as const

const socialIcons = [AtSign, Share2, LinkIcon, Rss] as const

const legalLinks = ["Privacy Policy", "Terms of Use", "RERA Disclosures"] as const

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="mt-24 bg-primary">
      <div className="mx-auto max-w-[1440px] px-12 pt-[72px]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 border-b border-white/7 pb-16">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-accent">
                <Building2 className="size-[18px] text-primary" />
              </div>
              <div>
                <div className="font-heading text-base font-bold text-white">
                  Vyas Real Estate
                </div>
                <div className="text-[9px] tracking-[0.1em] text-white/30 uppercase">
                  Verified · Trusted · Transparent
                </div>
              </div>
            </Link>
            <p className="mb-6 max-w-[300px] text-[13px] leading-relaxed text-white/40">
              India&apos;s most trusted real estate brokerage — connecting buyers,
              sellers and investors across 12 cities since 2007.
            </p>
            <div className="flex gap-2.5">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex size-[34px] items-center justify-center rounded-md border border-white/10 text-white/45 transition-colors hover:text-white/70"
                  aria-label="Social link"
                >
                  <Icon className="size-[15px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 text-[11px] font-bold tracking-[0.1em] text-white/28 uppercase">
              Quick Links
            </div>
            {quickLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="mb-2.5 block text-left text-[13px] text-white/50 transition-colors hover:text-white/70"
              >
                {label}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-5 text-[11px] font-bold tracking-[0.1em] text-white/28 uppercase">
              Contact
            </div>
            {contactItems.map(({ icon: Icon, text }) => (
              <div key={text} className="mb-3.5 flex items-start gap-2.5">
                <Icon className="mt-0.5 size-[13px] shrink-0 text-accent" />
                <span className="text-[13px] leading-relaxed whitespace-pre-line text-white/50">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-5 text-[11px] font-bold tracking-[0.1em] text-white/28 uppercase">
              Newsletter
            </div>
            <p className="mb-[18px] text-[13px] leading-relaxed text-white/40">
              Get new listings, market insights, and property news delivered
              weekly.
            </p>
            <div className="flex flex-col gap-2.5">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-auto border-white/10 bg-white/5 px-3.5 py-[11px] text-[13px] text-white placeholder:text-white/30"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-5">
          <span className="text-xs text-white/22">
            © 2025 Vyas Real Estate Pvt. Ltd. All rights reserved.
          </span>
          <div className="flex gap-6">
            {legalLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-white/22 transition-colors hover:text-white/40"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
