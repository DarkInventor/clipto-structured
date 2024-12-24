'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Sparkles, X } from 'lucide-react'

interface UpcomingFeature {
  date: string
  title: string
  description: string
  isNew?: boolean
}

const upcomingFeatures: UpcomingFeature[] = [
  {
    date: "Next week",
    title: "Long Duration Video Animations",
    description: "Create stunning video animations lasting 10, 30, or 60 seconds. Perfect for more in-depth product demonstrations, explainer videos, and engaging social media content.",
    isNew: true
  },
  {
    date: "Next week",
    title: "Enhanced Text Customization",
    description: "Unleash your creativity with an expanded selection of text styles, colors, and font families. Make your videos truly unique and on-brand.",
    isNew: true
  },
  {
    date: "In 2 weeks",
    title: "AI Voice Overs with Script Generation",
    description: "Elevate your videos with AI-generated voice overs. Our smart system will even help you craft the perfect script to accompany your visuals.",
  },
  {
    date: "In 1 month",
    title: "Advanced Animation Presets",
    description: "Choose from a library of professionally designed animation presets to quickly create eye-catching videos for various purposes and platforms.",
  },
  {
    date: "In 2 months",
    title: "Collaborative Editing Features",
    description: "Work seamlessly with your team. Share projects, leave comments, and collaborate in real-time to create amazing videos together.",
  }
]

interface UpcomingFeaturesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpcomingFeaturesDialog({ open, onOpenChange }: UpcomingFeaturesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] border-zinc-800 bg-black p-0">
        <DialogClose className="absolute right-4 py-5 rounded-sm z-40">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="bg-gradient-to-b from-zinc-900/50 to-black sticky top-0 z-10 p-6 pb-0 pt-10">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              Upcoming Features
            </DialogTitle>
            <p className="text-zinc-400">
              Exciting new features coming soon to Mock Studio
            </p>
          </DialogHeader>
        </div>
        <ScrollArea className="max-h-[60vh] px-6 pb-6">
          <div className="space-y-8 mt-8">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="relative space-y-4 group">
                <div 
                  className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-muted-foreground">{feature.date}</span>
                    {feature.isNew && (
                      <span className="bg-blue-500/10 text-muted-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
                {index !== upcomingFeatures.length - 1 && (
                  <Separator className="mt-8 bg-zinc-800" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

