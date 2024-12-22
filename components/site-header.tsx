
'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link href="/" className="text-xl font-bold text-[#c8c2bd]">
          Mock Studio
        </Link>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-[#c8c2bd] hover:bg-gray-700 hover:text-[#fffaf6] border-none">Getting started</NavigationMenuTrigger>
              <NavigationMenuContent className='bg-black border-black'>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                  <li className="row-span-3 ">
                    <NavigationMenuLink asChild >
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#cfcfcf] to-[#000000] p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-[#fffaf6]">
                          Illuminated Text
                        </div>
                        <p className="text-sm leading-tight text-[#e7dfd6]">
                          Beautiful, glowing text for your next project.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6]`}>
                  <span className="text-[#c8c2bd]">Documentation</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6]`}>
                  <span className="text-[#c8c2bd]">About</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button 
          variant="outline" 
          className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
          onClick={() => window.location.href = '/login'}
        >
          Sign In
        </Button>
      </div>
    </header>
  )
}

function ListItem({ className = "", title, children, ...props }: { className?: string; title: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#c8c2bd]/10 hover:text-[#fffaf6] focus:bg-[#c8c2bd]/10 focus:text-[#fffaf6] ${className}`}
          {...props}
        >
          <div>
            <div className="text-sm font-medium leading-none text-[#fffaf6]">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-[#c8c2bd]">{children}</p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
}