import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); 
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/api/')) {
    req.headers.set('auth_security', token?.value || '');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
