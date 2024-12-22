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

interface ChangelogEntry {
  date: string
  timeAgo: string
  title: string
  description: string
  isNew?: boolean
}

const changelogEntries: ChangelogEntry[] = [
  {
    date: "November 28, 2024",
    timeAgo: "24 days ago",
    title: "Speed Up Your Reddit Videos",
    description: "We've added a new feature to speed up your reddit videos. You can now speed up your videos by up to 2x. This is great for platforms like TikTok, Instagram, and youtube shorts where users scroll quickly and you want to keep their attention.",
    isNew: true
  },
  {
    date: "November 3, 2024",
    timeAgo: "about 2 months ago",
    title: "Introducing Our New Twitter Thread Template",
    description: "We're excited to announce the launch of our new Twitter Thread Video Template, a powerful feature designed to help you create compelling and engaging short-form video content for Twitter threads effortlessly. This new addition to our platform empowers users to craft visually appealing multi-tweet stories that captivate audiences and boost engagement."
  }
]

interface ChangelogDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
  }

export function ChangelogDialog({ open, onOpenChange }: ChangelogDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    
      <DialogContent className="max-w-2xl max-h-[80vh] border-zinc-800 bg-black p-0">
        <DialogClose className="absolute right-4 py-5 rounded-sm  z-40">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="bg-gradient-to-b from-zinc-900/50 to-black sticky top-0 z-10 p-6 pb-0 pt-10">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              Changelog
            </DialogTitle>
            <p className="text-zinc-400">
              New updates and improvements to Mock Studio
            </p>
          </DialogHeader>
        </div>
        <ScrollArea className="max-h-[60vh] px-6 pb-6">
          <div className="space-y-8 mt-8">
            {changelogEntries.map((entry, index) => (
              <div key={index} className="relative space-y-4 group">
                <div 
                  className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-500 to-transparent opacity-10 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-zinc-200">{entry.date}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-500">{entry.timeAgo}</span>
                    {entry.isNew && (
                      <>
                        <span className="text-zinc-600">·</span>
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-xs font-medium">
                          New
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                    {entry.title}
                  </h2>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  {entry.description}
                </p>
                {index !== changelogEntries.length - 1 && (
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

