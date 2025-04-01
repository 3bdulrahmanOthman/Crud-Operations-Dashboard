import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_ROUTES = ['/signin', '/signup'];
const DEFAULT_REDIRECT = '/';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    if (AUTH_ROUTES.includes(pathname)) {
      if (token) {
        const redirectUrl = req.nextUrl.searchParams.get('callbackUrl') || DEFAULT_REDIRECT;
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }
      return NextResponse.next();
    }

    // Role-based access control for admin routes (future use)
    // const userRole = token?.role || "guest";
    // if (req.nextUrl.pathname.startsWith("/admin") && userRole !== "admin") {
    //   return NextResponse.redirect(new URL("/unauthorized", req.url));
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return !AUTH_ROUTES.includes(req.nextUrl.pathname) ? !!token : true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
  ],
};