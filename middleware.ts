// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   const session = request.cookies.get('session')?.value

//   // List of routes that should always be accessible
//   const publicRoutes = ['/', '/login', '/register']
//   const alwaysAccessibleRoutes = [...publicRoutes, '/api/success-stripe']

//   // Check if the current route should always be accessible
//   if (alwaysAccessibleRoutes.includes(request.nextUrl.pathname)) {
//     return NextResponse.next()
//   }

//   // Special case for redirecting from /api/success-stripe to /mockup-home
//   if (request.nextUrl.pathname === '/mockup-home' && request.headers.get('referer')?.includes('/api/success-stripe')) {
//     return NextResponse.next()
//   }

//   if (session) {
//     // User is authenticated
//     if (publicRoutes.includes(request.nextUrl.pathname)) {
//       // Redirect to mockup-home if trying to access public pages while authenticated
//       return NextResponse.redirect(new URL('/mockup-home', request.url))
//     }
//     // For all other routes, allow access
//     return NextResponse.next()
//   } 
//   else {
//     // User is not authenticated, redirect to login
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// }






// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const ENGYNE_URL = "https://animator.engyne.page"

// export async function middleware(request: NextRequest) {
//   const session = request.cookies.get('session')?.value
//   const { pathname } = request.nextUrl
//   const hostname = request.headers.get("host")

//   // List of routes that should always be accessible
//   const publicRoutes = ['/', '/login', '/register']
//   const blogRoutes = ['/blog', '/tags', '/engyne-sitemap.xml', '/_engyne']
//   const alwaysAccessibleRoutes = [...publicRoutes, '/api/success-stripe', ...blogRoutes]

//   console.log('Request:', {
//     pathname,
//     hostname,
//     isBlogRoute: pathname.startsWith('/blog')
//   })

//   // Check if this is a blog route
//   if (pathname.startsWith('/blog') || pathname.startsWith('/tags')) {
//     // Rewrite to the full Engyne URL
//     const rewriteUrl = new URL(pathname, ENGYNE_URL)
//     console.log('Rewriting to:', rewriteUrl.toString())
//     return NextResponse.rewrite(rewriteUrl)
//   }

//   // Rest of authentication logic
//   if (alwaysAccessibleRoutes.includes(pathname)) {
//     return NextResponse.next()
//   }

//   if (pathname === '/mockup-home' && request.headers.get('referer')?.includes('/api/success-stripe')) {
//     return NextResponse.next()
//   }

//   if (session) {
//     if (publicRoutes.includes(pathname)) {
//       return NextResponse.redirect(new URL('/mockup-home', request.url))
//     }
//     return NextResponse.next()
//   } 
//   else {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|api/success-stripe).*)',
//   ],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ENGYNE_URL = "https://animator.engyne.page"

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl
  const hostname = request.headers.get("host")

  // List of routes that should always be accessible
  const publicRoutes = ['/', '/login', '/register']
  const blogRoutes = ['/blog', '/tags', '/engyne-sitemap.xml', '/_engyne']
  const alwaysAccessibleRoutes = [...publicRoutes, '/api/success-stripe', ...blogRoutes]

  console.log('Request:', {
    pathname,
    hostname,
    isBlogRoute: pathname.startsWith('/blog') || pathname.startsWith('/tags')
  })

  // Check if this is a blog route or other Engyne-related route
  if (pathname.startsWith('/blog') || 
      pathname.startsWith('/tags') || 
      pathname === '/engyne-sitemap.xml' || 
      pathname.startsWith('/_engyne')) {
    // Construct the full Engyne URL
    const engyneUrl = new URL(pathname, ENGYNE_URL)
    console.log('Redirecting to:', engyneUrl.toString())
    
    // Use NextResponse.redirect with the full URL string
    return NextResponse.redirect(engyneUrl.toString())
  }

  // Rest of authentication logic
  if (alwaysAccessibleRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (pathname === '/mockup-home' && request.headers.get('referer')?.includes('/api/success-stripe')) {
    return NextResponse.next()
  }

  if (session) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/mockup-home', request.url))
    }
    return NextResponse.next()
  } 
  else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/success-stripe).*)',
  ],
}

