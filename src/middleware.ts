import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminRoutes, protectedRoutes, authRoutes } from "./routes";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub?: string;
  scopes?: string[];
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { nextUrl } = req;

  const isAuthenticated = !!accessToken;

  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  let userRoles: string[] = [];

  // if (!isAuthenticated && refreshToken) {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Cookie: `refreshToken=${refreshToken}`,
  //         },
  //         credentials: "include",
  //       }
  //     );

  //     if (response.ok) {
  //       console.log(response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     return NextResponse.redirect(new URL("/", nextUrl));
  //   }
  // }

  if (isAuthenticated) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(accessToken);
      userRoles = decodedToken?.scopes || [];

      // if user is trying to access admin route without ADMIN role
      if (isAdminRoute && !userRoles.includes("ADMIN")) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // if user already authenticated and trying to access login page
      if (isAuthRoute) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  } else {
    // if user is not authenticated and trying to access protected route
    if (isProtectedRoute) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
  return null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
