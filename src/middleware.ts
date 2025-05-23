// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get('session_id')?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Validate session and get role
  const validateUrl = new URL('/api/auth/validate-session', req.url);
  validateUrl.searchParams.set('session_id', sessionId);

  const res = await fetch(validateUrl.toString());
  const { valid, role } = await res.json();

  if (!valid) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const path = req.nextUrl.pathname;

  // Redirect from /dashboard to /accounts for customers
  if (path === '/dashboard' && role === 'customer') {
    return NextResponse.redirect(new URL('/accounts', req.url));
  }

  // Protect /admin/* for admin only
  if (path.startsWith('/admin') && role !== 'Admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Protect /officer/* for officer only
  if (path.startsWith('/officer') && role !== 'Officer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Protect /account* /accounts* /details* /history* /payments* /profile* /settings* /transfers* for customer only
  const customerPaths = [
    '/account',
    '/accounts',
    '/details',
    '/history',
    '/payments',
    '/profile',
    '/settings',
    '/transfers',
    '/dashboard',
  ];
  if (customerPaths.some(p => path.startsWith(p)) && role !== 'Customer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

// Apply to all relevant routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/officer/:path*',
    '/account/:path*',
    '/accounts/:path*',  // Ensure this is matched
    '/details/:path*',
    '/history/:path*',
    '/payments/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/transfers/:path*',
    '/dashboard/:path*',  // Optional — includes dashboard
  ],
};
