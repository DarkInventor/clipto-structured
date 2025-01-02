// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { ChangelogDialog } from "./changelog-dialog";
// import { useState } from "react";
// import { UpcomingFeaturesDialog } from "./upcoming-features-dialog";

// export function SiteHeader() {
//   const [showChangelog, setShowChangelog] = useState(false);
//   const [showUpcomingFeatures, setUpcomingFeatures] = useState(false);
//   return (
//     <header className="fixed top-0 z-50 w-full bg-black/50 backdrop-blur-md">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="text-xl font-bold text-[#c8c2bd]">
//           Animator Studio
//         </Link>
//         <NavigationMenu className="hidden md:block">
//           <NavigationMenuList>
//             <NavigationMenuItem>
//               <NavigationMenuTrigger className="bg-transparent text-[#c8c2bd] hover:bg-gray-700 hover:text-[#fffaf6] border-none">
//                 Getting Started
//               </NavigationMenuTrigger>
//               <NavigationMenuContent className="bg-black border-black ">
//                 <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
//                   <li className="row-span-3 ">
//                     <NavigationMenuLink asChild>
//                       <a
//                         className="group relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] p-6 no-underline outline-none focus:shadow-md overflow-hidden"
//                         href="/#"
//                       >
//                         {/* Golden SVG Background */}
//                         <div className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
//                           <svg
//                             width="100%"
//                             height="100%"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <defs>
//                               <pattern
//                                 id="smallGrid"
//                                 width="10"
//                                 height="10"
//                                 patternUnits="userSpaceOnUse"
//                               >
//                                 <path
//                                   d="M 10 0 L 0 0 0 10"
//                                   fill="none"
//                                   stroke="rgba(255,215,0,0.3)"
//                                   strokeWidth="0.5"
//                                 />
//                               </pattern>
//                               <pattern
//                                 id="grid"
//                                 width="50"
//                                 height="50"
//                                 patternUnits="userSpaceOnUse"
//                               >
//                                 <rect
//                                   width="50"
//                                   height="50"
//                                   fill="url(#smallGrid)"
//                                 />
//                                 <path
//                                   d="M 50 0 L 0 0 0 50"
//                                   fill="none"
//                                   stroke="rgba(255,215,0,0.5)"
//                                   strokeWidth="1"
//                                 />
//                               </pattern>
//                             </defs>
//                             <rect
//                               width="100%"
//                               height="100%"
//                               fill="url(#grid)"
//                             />
//                           </svg>
//                         </div>

//                         {/* Animated golden circles */}
//                         <div className="absolute inset-0 overflow-hidden">
//                           <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-20 blur-xl animate-pulse"></div>
//                           <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-gradient-to-tl from-yellow-200 to-yellow-500 opacity-20 blur-xl animate-pulse"></div>
//                         </div>

//                         {/* Content */}
//                         <div className="relative z-10">
//                           <div className="mb-2 mt-4 text-lg font-medium text-[#e7dfd6]">
//                             Animator Studio
//                           </div>
//                           <p className="text-sm leading-tight text-[#bdc2c9]">
//                             Create Beautiful Animations In Seconds
//                           </p>
//                         </div>
//                       </a>
//                     </NavigationMenuLink>
//                   </li>
//                   <ListItem href="/#" title="Introduction">
//                     Learn how Animator Studio can transform your screenshots.
//                   </ListItem>
//                   <ListItem
//                     title="Upcoming Features"
//                     onClick={(e: { preventDefault: () => void }) => {
//                       e.preventDefault();
//                       setUpcomingFeatures(true);
//                     }}
//                   >
//                     Read our latest articles and updates about video ad
//                     creation.
//                   </ListItem>
//                   {/* <ListItem href="/changelog" title="Changelog">               
//                     Stay up to date with our latest features and improvements.
//                   </ListItem>                   */}
//                   <ListItem
//                     title="Changelog"
//                     onClick={(e: { preventDefault: () => void }) => {
//                       e.preventDefault();
//                       setShowChangelog(true);
//                     }}
//                   >
//                     Stay up to date with our latest features and improvements.
//                   </ListItem>
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <Link href="/#howitworks" legacyBehavior passHref>
//                 <NavigationMenuLink
//                   className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6] active:bg-gray-700 active:text-black focus:bg-gray-700 focus:text-black`}
//                   onClick={(e) => {
//                     const span = e.currentTarget.querySelector("span");
//                     if (span) span.style.color = "white";
//                   }}
//                 >
//                   <span className="text-[#c8c2bd]">How it Works?</span>
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem>

//             {/* <NavigationMenuItem>
//               <Link href="/#pricing" legacyBehavior passHref>
//                 <NavigationMenuLink 
//                   className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6] active:bg-gray-700 active:text-black focus:bg-gray-700 focus:text-black`}
//                   onClick={(e) => {
//                     const span = e.currentTarget.querySelector('span');
//                     if (span) span.style.color = 'white';
//                   }}
//                 >
//                   <span className="text-[#c8c2bd]">Pricing</span>
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem> */}
//             <NavigationMenuItem>
//               <Link href="/about" legacyBehavior passHref>
//                 <NavigationMenuLink
//                   className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6]`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowChangelog(true);
//                   }}
//                 >
//                   <span className="text-[#c8c2bd]">Changelog</span>
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>
//         <Button
//           variant="outline"
//           className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
//           onClick={() => (window.location.href = "/login")}
//         >
//           Sign In
//         </Button>
//       </div>
//       <UpcomingFeaturesDialog
//         open={showUpcomingFeatures}
//         onOpenChange={setUpcomingFeatures}
//       />
//       <ChangelogDialog open={showChangelog} onOpenChange={setShowChangelog} />
//     </header>
//   );
// }

// function ListItem({
//   className = "",
//   title,
//   children,
//   ...props
// }: {
//   className?: string;
//   title: string;
//   children: React.ReactNode;
//   [key: string]: any;
// }) {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#c8c2bd]/10 hover:text-[#fffaf6] focus:bg-[#c8c2bd]/10 focus:text-[#fffaf6] ${className}`}
//           {...props}
//         >
//           <div>
//             <div className="text-sm font-medium leading-none text-[#fffaf6]">
//               {title}
//             </div>
//             <p className="line-clamp-2 text-sm leading-snug text-[#c8c2bd]">
//               {children}
//             </p>
//           </div>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// }
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
import { ChangelogDialog } from "./changelog-dialog"
import { useState, useEffect } from 'react'
import { UpcomingFeaturesDialog } from './upcoming-features-dialog'
import SiteBanner from './site-banner'
import { Menu } from 'lucide-react'

export function SiteHeader() {
  const [showChangelog, setShowChangelog] = useState(false)
  const [showUpcomingFeatures, setUpcomingFeatures] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ease-in-out ${showBanner ? 'translate-y-0' : '-translate-y-full'}`}>
        <SiteBanner />
      </div>
      <header className={`fixed left-0 right-0 z-50 w-full bg-black/50 backdrop-blur-md transition-all duration-300 ease-in-out ${showBanner ? 'top-12' : 'top-0'}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-[#c8c2bd]">
            Animator Studio
          </Link>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#c8c2bd]"
            >
              <Menu />
            </Button>
          </div>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[#c8c2bd] hover:bg-gray-700 hover:text-[#fffaf6] border-none">Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent className='bg-black border-black'>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="group relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] p-6 no-underline outline-none focus:shadow-md overflow-hidden"
                          href="/#"
                        >
                          {/* Golden SVG Background */}
                          <div className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="0.5" />
                                </pattern>
                                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                  <rect width="50" height="50" fill="url(#smallGrid)" />
                                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                          </div>

                          {/* Animated golden circles */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-20 blur-xl animate-pulse"></div>
                            <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-gradient-to-tl from-yellow-200 to-yellow-500 opacity-20 blur-xl animate-pulse"></div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div className="mb-2 mt-4 text-lg font-medium text-[#e7dfd6]">
                              Animator Studio
                            </div>
                            <p className="text-sm leading-tight text-[#bdc2c9]">
                              Create Beautiful Animations In Seconds
                            </p>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/#" title="Introduction">
                      Learn how Animator Studio can transform your screenshots.
                    </ListItem>
                    <ListItem title="Upcoming Features" onClick={(e: { preventDefault: () => void} ) => {
                      e.preventDefault()
                      setUpcomingFeatures(true)
                    } }>
                      Read our latest articles and updates about video ad creation.
                    </ListItem>
                    <ListItem title="Changelog" onClick={(e: { preventDefault: () => void} ) => {
                      e.preventDefault()
                      setShowChangelog(true)
                    } }>
                      Stay up to date with our latest features and improvements.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#howitworks" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6] active:bg-gray-700 active:text-black focus:bg-gray-700 focus:text-black`}
                    onClick={(e) => {
                      const span = e.currentTarget.querySelector('span')
                      if (span) span.style.color = 'white'
                    } }
                  >
                    <span className="text-[#c8c2bd]">How it Works?</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-700 hover:text-[#fffaf6]`}
                    onClick={(e) => {
                      e.preventDefault()
                      setShowChangelog(true)
                    } }
                  >
                    <span className="text-[#c8c2bd]">Changelog</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="outline"
            className="hidden md:inline-flex text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
            onClick={() => window.location.href = '/login'}
          >
            Sign In
          </Button>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-black/90 backdrop-blur-md`}>
          <nav className="px-4 py-2">
            <Link href="/#" className="block py-2 text-[#c8c2bd]">Getting Started</Link>
            <Link href="/#howitworks" className="block py-2 text-[#c8c2bd]">How it Works?</Link>
            <button onClick={() => setShowChangelog(true)} className="block w-full text-left py-2 text-[#c8c2bd]">Changelog</button>
            <Button
              variant="outline"
              className="w-full mt-2 text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
              onClick={() => window.location.href = '/login'}
            >
              Sign In
            </Button>
          </nav>
        </div>
      </header>
      <UpcomingFeaturesDialog
        open={showUpcomingFeatures}
        onOpenChange={setUpcomingFeatures} />
      <ChangelogDialog
        open={showChangelog}
        onOpenChange={setShowChangelog} />
    </>
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

