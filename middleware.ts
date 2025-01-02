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




import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rename the existing middleware function to authMiddleware
async function authMiddleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  // List of routes that should always be accessible
  // Added /blog and /blog/* to public routes
  const publicRoutes = ['/', '/login', '/register', '/blog']
  const alwaysAccessibleRoutes = [...publicRoutes, '/api/success-stripe']

  // Check if the current route should always be accessible
  // Also check if the path starts with /blog to allow all blog routes
  if (alwaysAccessibleRoutes.includes(request.nextUrl.pathname) || 
      request.nextUrl.pathname.startsWith('/blog/') ||
      request.nextUrl.pathname.startsWith('/tags/')) {
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

// New combined middleware function
export async function middleware(req: NextRequest) {
  const engyneSubdomain = "animator"
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host");

  if (!hostname) {
    return new Response(null, {
      status: 400,
      statusText: "No hostname found in request headers",
    });
  }

  // Engyne blog logic
  if (pathname === "/engyne-sitemap.xml") {
    return NextResponse.rewrite(new URL(pathname, `https://${engyneSubdomain}.engyne.page`))
  }

  if (pathname.startsWith("/blog") || pathname.startsWith("/tags")) {
    return NextResponse.rewrite(new URL(pathname, `https://${engyneSubdomain}.engyne.page`))
  }

  if (pathname.startsWith("/_engyne")) {
    return NextResponse.rewrite(new URL(pathname, `https://${engyneSubdomain}.engyne.page`))
  }

  // If not handled by Engyne blog logic, proceed with auth middleware
  return authMiddleware(req)
}

// Updated config to include both matchers
export const config = {
  matcher: [
    '/engyne-sitemap.xml',
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/((?!_next|api|[\\w-]+\\.\\w+).*)'
  ],
}

