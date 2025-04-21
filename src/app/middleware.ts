import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("token")?.value; // Read token from cookies
  const token = localStorage.getItem("userToken")

  // If the user is not authenticated and tries to access a protected route, redirect to login
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"], // Apply to protected routes
};
