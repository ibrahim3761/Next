import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore =  await cookies()
  // const accessToken = cookieStore.get("accessToken")?.value;

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let userRole = null;

  if (!decodedToken?.success) {
    // token has expired or is invalid. clear the cookie
    cookieStore.delete("accessToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodedToken?.success && decodedToken.data) {
    userRole = (decodedToken.data as JwtPayload).role;
  }

  //user is not logged in and trying to access login or register page, redirect to dashboard
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Authenticated pages are accessible only if the user is logged in, otherwise redirect to login page
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Athorization check for dashboard routes based on user role
  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  //   return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*',
    // '/author-dashboard/:path*',
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
