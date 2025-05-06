import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionId = req.cookies.get('session_id');

  if (!sessionId) {
    // User not authenticated, redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Session exists, allow access
  return NextResponse.next();
}

// Match all protected routes here
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
