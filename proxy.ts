// import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login","/register"]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  // const cookieStore =  await cookies()
  // const accessToken = cookieStore.get("accessToken")?.value;

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken? jwt.decode(accessToken) as JwtPayload : null;

  let userRole = null;

  if (decodedToken) {
    userRole = decodedToken.role;
  }

  //user is not logged in and trying to access login or register page, redirect to dashboard
  if(accessToken && AUTH_ROUTES.includes(pathname)){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  else if(userRole === "ADMIN"){
    return NextResponse.redirect(new URL('/admin-dashboard', request.url))
  }
  else if(userRole === "AUTHOR"){
    return NextResponse.redirect(new URL('/author-dashboard', request.url))
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
