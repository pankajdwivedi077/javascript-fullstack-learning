// define proteched route -> /profile, /post, /create

// import { proxy } from "next/server";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {

  const pathName = request.nextUrl.pathname
 const hasSession = 
    request.cookies.has("better-auth.session_token") || 
    request.cookies.has("__Secure-better-auth.session_token");

  const isAuthRoute = pathName === "/auth";
if (!hasSession && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 2. Logged in + trying to access the login page
  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile', 
    '/post/create', 
    '/post/edit/:path*',
    '/auth' 
  ],
};