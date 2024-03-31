import { verifyRequestOrigin } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/posts/:code+/:page+',
};

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(`/posts/${process.env.EUROS_CODE}/`)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.endsWith('/link/kids')) {
    return NextResponse.redirect(process.env.KIDS_LINK!, 302);
  }

  if (request.nextUrl.pathname.endsWith('/link/youths')) {
    return NextResponse.redirect(process.env.YOUTHS_LINK!, 302);
  }

  if (request.nextUrl.pathname.endsWith('/link/adults')) {
    return NextResponse.redirect(process.env.ADULTS_LINK!, 302);
  }

  if (request.method === 'GET') {
    return NextResponse.next();
  }

  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host');
  if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
