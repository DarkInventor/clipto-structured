
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
              <NavigationMenuTrigger className="bg-transparent text-[#c8c2bd] hover:bg-gray-700 hover:text-[#fffaf6] border-none">Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent className='bg-black border-black '>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                  <li className="row-span-3 ">
                    <NavigationMenuLink asChild >
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#cfcfcf] to-[#000000] p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-[#fffaf6]">
                          Mock Studio
                        </div>
                        <p className="text-sm leading-tight text-[#e7dfd6]">
                          Transform Screenshots Into Stunning Video Ads In Seconds
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/intro" title="Introduction">
                    Learn how Mock Studio can transform your screenshots.
                  </ListItem>
                  <ListItem href="/blog" title="Blog">
                    Read our latest articles and updates about video ad creation.
                  </ListItem>
                  <ListItem href="/changelog" title="Changelog">
                    Stay up to date with our latest features and improvements.
                  </ListItem>                  
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <Link href="/#howitworks" legacyBehavior passHref>
              <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6] active:bg-gray-700 active:text-black focus:bg-gray-700 focus:text-black`}
                  onClick={(e) => {
                    const span = e.currentTarget.querySelector('span');
                    if (span) span.style.color = 'white';
                  }}
                >
                  <span className="text-[#c8c2bd]">How it Works?</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
           
            <NavigationMenuItem>
              <Link href="/#pricing" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6] active:bg-gray-700 active:text-black focus:bg-gray-700 focus:text-black`}
                  onClick={(e) => {
                    const span = e.currentTarget.querySelector('span');
                    if (span) span.style.color = 'white';
                  }}
                >
                  <span className="text-[#c8c2bd]">Pricing</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6]`}>
                  <span className="text-[#c8c2bd]">Changelog</span>
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