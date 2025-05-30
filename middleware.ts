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
//     isBlogRoute: pathname.startsWith('/blog') || pathname.startsWith('/tags')
//   })

//   // Check if this is a blog route or other Engyne-related route
//   if (pathname.startsWith('/blog') || 
//       pathname.startsWith('/tags') || 
//       pathname === '/engyne-sitemap.xml' || 
//       pathname.startsWith('/_engyne')) {
    
//     // Remove the initial path segment (e.g., '/blog') and construct the Engyne URL
//     const pathWithoutPrefix = pathname.replace(/^\/(?:blog|tags|_engyne)/, '')
//     const finalPath = pathWithoutPrefix || '/' // Use '/' if pathWithoutPrefix is empty
//     const engyneUrl = new URL(finalPath, ENGYNE_URL)
    
//     // Add any query parameters from the original request
//     engyneUrl.search = request.nextUrl.search
    
//     console.log('Redirecting to:', engyneUrl.toString())
//     return NextResponse.rewrite(engyneUrl)
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
//     isBlogRoute: pathname.startsWith('/blog') || pathname.startsWith('/tags')
//   })

//   // Check if this is a blog route or other Engyne-related route
//   if (pathname.startsWith('/blog') || 
//       pathname.startsWith('/tags') || 
//       pathname === '/engyne-sitemap.xml' || 
//       pathname.startsWith('/_engyne')) {
    
//     // Remove the initial path segment (e.g., '/blog') and construct the Engyne URL
//     const pathWithoutPrefix = pathname.replace(/^\/(?:blog|tags|_engyne)/, '')
//     const finalPath = pathWithoutPrefix || '/' // Use '/' if pathWithoutPrefix is empty
//     const engyneUrl = new URL(finalPath, ENGYNE_URL)
    
//     // Add any query parameters from the original request
//     engyneUrl.search = request.nextUrl.search
    
//     console.log('Redirecting to:', engyneUrl.toString())
//     return NextResponse.rewrite(engyneUrl)
//   }

//   // Handle non-blog-prefixed URLs by adding /blog prefix
//   if (!pathname.startsWith('/blog') && 
//       !pathname.startsWith('/_next') && 
//       !pathname.startsWith('/api') && 
//       !pathname.includes('.')) {
//     return NextResponse.redirect(new URL(`/blog${pathname}`, request.url))
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

  // Check if this is a blog-related route
  if (pathname.startsWith('/blog') || 
      pathname.startsWith('/tags') || 
      pathname === '/engyne-sitemap.xml' || 
      pathname.startsWith('/_engyne')) {
    
    // Remove the initial path segment (e.g., '/blog') and construct the Engyne URL
    const pathWithoutPrefix = pathname.replace(/^\/(?:blog|tags|_engyne)/, '')
    const finalPath = pathWithoutPrefix || '/' // Use '/' if pathWithoutPrefix is empty
    const engyneUrl = new URL(finalPath, ENGYNE_URL)
    
    // Add any query parameters from the original request
    engyneUrl.search = request.nextUrl.search
    
    console.log('Rewriting to:', engyneUrl.toString())
    return NextResponse.rewrite(engyneUrl)
  }

  // Handle blog URLs without '/blog' prefix
  if (!pathname.startsWith('/blog') && 
      !pathname.startsWith('/_next') && 
      !pathname.startsWith('/api') && 
      !pathname.includes('.') &&
      request.headers.get('referer')?.includes('/blog')) {
    const newUrl = new URL(`/blog${pathname}`, request.url)
    console.log('Redirecting to:', newUrl.toString())
    return NextResponse.redirect(newUrl)
  }

  // Check if the current route should always be accessible
  if (alwaysAccessibleRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Special case for redirecting from /api/success-stripe to /mockup-home
  if (pathname === '/mockup-home' && request.headers.get('referer')?.includes('/api/success-stripe')) {
    return NextResponse.next()
  }

  if (session) {
    // User is authenticated
    if (publicRoutes.includes(pathname)) {
      // Redirect to mockup-home if trying to access public pages while authenticated
      return NextResponse.redirect(new URL('/mockup-home', request.url))
    }
    // For all other routes, allow access
    return NextResponse.next()
  } 
  else {
    // User is not authenticated, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

