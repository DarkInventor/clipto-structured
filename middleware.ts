// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   const session = request.cookies.get('session')?.value

//   // Create response
//   const response = NextResponse.next()

//   if (session) {
//     // User has a session cookie, assume they're authenticated
//     if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
//       // Redirect to mockup-home if trying to access auth pages
//       return NextResponse.redirect(new URL('/mockup-home', request.url))
//     }
//   } else {
//     // User is not authenticated
//     if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register' && request.nextUrl.pathname !== '/') {
//       // Redirect to login if trying to access protected routes
//       return NextResponse.redirect(new URL('/login', request.url))
//     }
//   }

//   return response
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }






import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  // List of routes that should always be accessible
  const publicRoutes = ['/', '/login', '/register']
  const alwaysAccessibleRoutes = [...publicRoutes, '/api/success-stripe']

  // Check if the current route should always be accessible
  if (alwaysAccessibleRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Special case for redirecting from /api/success-stripe to /mockup-home
  if (request.nextUrl.pathname === '/mockup-home' && request.headers.get('referer')?.includes('/api/success-stripe')) {
    return NextResponse.next()
  }

  if (session) {
    // User is authenticated
    if (publicRoutes.includes(request.nextUrl.pathname)) {
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
