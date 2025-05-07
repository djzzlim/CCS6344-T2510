import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get('session_id')?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Validate session via API route
  const validateUrl = new URL('/api/auth/validate-session', req.url);
  validateUrl.searchParams.set('session_id', sessionId);

  const res = await fetch(validateUrl.toString());
  const { valid } = await res.json();

  if (!valid) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
