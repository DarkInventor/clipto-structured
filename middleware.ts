import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  // Create response
  const response = NextResponse.next()

  if (session) {
    // User has a session cookie, assume they're authenticated
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
      // Redirect to mockup-home if trying to access auth pages
      return NextResponse.redirect(new URL('/mockup-home', request.url))
    }
  } else {
    // User is not authenticated
    if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register' && request.nextUrl.pathname !== '/') {
      // Redirect to login if trying to access protected routes
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

    