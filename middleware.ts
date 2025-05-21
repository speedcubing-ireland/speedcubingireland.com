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

  if (request.nextUrl.pathname.endsWith('/link/adults')) {
    return NextResponse.redirect(process.env.ADULTS_LINK!, 302);
  }

  return NextResponse.next();
}
