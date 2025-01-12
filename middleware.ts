// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Atau localStorage jika di sisi client
  const url = req.nextUrl.clone();

  // Cek jika request adalah ke API backend
  if (url.pathname.startsWith('/api/')) {
    // Tambahkan header `auth_security` ke permintaan
    req.headers.set('auth_security', token?.value || '');
  }

  return NextResponse.next();
}

// Tentukan route yang akan diproses middleware
export const config = {
  matcher: ['/api/:path*'], // Middleware ini hanya berlaku untuk route `/api/...`
};
