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
    date: "December 15, 2024",
    timeAgo: "2 days ago",
    title: "Introducing Animation Styles Library",
    description: "We're excited to launch our new Animation Styles Library! Choose from a curated collection of professional animation styles to make your content stand out. Whether you're creating mockup ads, product videos, or animated website demos, you'll find the perfect style to bring your content to life. Each style is optimized for social media, websites, and presentations.",
    isNew: true
  },
  {
    date: "December 10, 2024", 
    timeAgo: "7 days ago",
    title: "Enhanced Media Upload Support",
    description: "We've expanded our media upload capabilities to support all common image and video formats. Now you can easily upload your screenshots and screen recordings without worrying about compatibility. The new drag-and-drop interface makes the process even smoother. Plus, your exported videos are automatically optimized for sharing across any digital platform."
  },
  {
    date: "December 1, 2024",
    timeAgo: "16 days ago",
    title: "Transform Screenshots to Video Ads",
    description: "Introducing our core feature - transform your static screenshots and screen recordings into stunning video ads within seconds! No design skills needed. Perfect for creating beautiful mockup ads, product videos, and animated website demos. Save time and money while creating professional-quality content that engages your audience."
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
              New updates and improvements to Mocks Studio
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
