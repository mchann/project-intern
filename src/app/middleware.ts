import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;


    if (pathname === "/login" && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    //  Proteksi Role Mentor 
    if (pathname.startsWith("/dashboard/mentor") && token?.role !== "MENTOR") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname === "/login") {
          return true; 
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*", "/login"],
};