"use client"

import Image from "next/image"
import { useState } from "react"
import { AtSign, Link as LinkIcon, Mail, Share2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { TeamMember } from "@/types"

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden py-0 transition-all",
        hovered ? "border-accent shadow-md" : "shadow-sm"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-60 overflow-hidden bg-muted">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={cn(
            "object-cover object-top transition-transform duration-300",
            hovered && "scale-105"
          )}
          sizes="360px"
        />
        <div className="absolute top-3 right-3 rounded bg-primary/80 px-2.5 py-1 backdrop-blur-sm">
          <Badge
            variant="outline"
            className="border-transparent bg-transparent p-0 text-[11px] font-bold text-accent"
          >
            {member.deals}
          </Badge>
        </div>
      </div>

      <CardContent className="px-5 pt-4.5 pb-5">
        <h3 className="section-title mb-1">
          {member.name}
        </h3>
        <p className="mb-1 text-xs font-semibold text-accent">{member.role}</p>
        <p className="mb-4 text-xs text-muted-foreground">{member.city}</p>

        <div className="flex gap-2">
          {[AtSign, Share2, LinkIcon].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className={cn(
                "flex size-[30px] items-center justify-center rounded-md border transition-colors",
                hovered
                  ? "border-accent text-accent"
                  : "border-border text-muted-foreground"
              )}
              aria-label="Social link"
            >
              <Icon className="size-[13px]" />
            </a>
          ))}
          <Button
            variant={hovered ? "default" : "secondary"}
            size="sm"
            className="h-[30px] flex-1 gap-1 text-[11px] font-bold"
            nativeButton={false}
            render={
              <a
                href={member.email ? `mailto:${member.email}` : "#"}
                className="flex items-center justify-center gap-1"
              />
            }
          >
            <Mail className="size-3" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
