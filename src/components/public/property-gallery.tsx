"use client"

import Image from "next/image"
import { useState } from "react"
import { Camera, ChevronLeft, ChevronRight, Play, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const IMAGE_LABELS = [
  "Living Room",
  "Master Bedroom",
  "Bedroom 2",
  "Bathroom",
  "Kitchen",
  "Terrace View",
]

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const galleryImages = images.map((src, index) => ({
    src,
    label: IMAGE_LABELS[index] ?? `View ${index + 1}`,
    isVideo: index === images.length - 1 && images.length > 1,
  }))

  const current = galleryImages[active] ?? galleryImages[0]

  if (!current) {
    return null
  }

  return (
    <div className="bg-primary">
      <button
        type="button"
        className="relative block h-[520px] w-full cursor-pointer overflow-hidden"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open image gallery"
      >
        <Image
          src={current.src}
          alt={current.label}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {current.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
            <div className="flex size-[70px] items-center justify-center rounded-full bg-white/95 shadow-lg">
              <Play className="ml-1 size-[26px] fill-primary text-primary" />
            </div>
          </div>
        )}
        <div className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-md bg-primary/75 px-3 py-1.5 backdrop-blur-sm">
          <Camera className="size-3.5 text-white" />
          <span className="text-xs font-semibold text-white">
            {active + 1} / {galleryImages.length}
          </span>
        </div>
        {active > 0 && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute top-1/2 left-4 size-10 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
            onClick={(event) => {
              event.stopPropagation()
              setActive((index) => index - 1)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-[18px]" />
          </Button>
        )}
        {active < galleryImages.length - 1 && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute top-1/2 right-4 size-10 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
            onClick={(event) => {
              event.stopPropagation()
              setActive((index) => index + 1)
            }}
            aria-label="Next image"
          >
            <ChevronRight className="size-[18px]" />
          </Button>
        )}
      </button>

      <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-12 py-3 [scrollbar-width:none]">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative h-[76px] w-[120px] shrink-0 overflow-hidden rounded-[7px] border-2 transition-all",
              index === active
                ? "border-accent opacity-100"
                : "border-transparent opacity-65 hover:opacity-90"
            )}
            aria-label={`Show ${image.label}`}
          >
            <Image
              src={image.src}
              alt={image.label}
              fill
              className="object-cover"
              sizes="120px"
            />
            {image.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="size-3.5 fill-white text-white" />
              </div>
            )}
            <div className="absolute right-0 bottom-0 left-0 bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white uppercase">
              {image.label}
            </div>
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-[95vw] border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-[90vw]"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{title} gallery</DialogTitle>
          <div className="relative flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 z-10 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
            >
              <X className="size-[18px]" />
            </Button>
            <div className="relative h-[80vh] w-full max-w-[90vw]">
              <Image
                src={current.src}
                alt={current.label}
                fill
                className="rounded-lg object-contain"
                sizes="90vw"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
