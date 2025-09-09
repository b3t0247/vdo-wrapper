import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Public routes that bypass authentication checks.
// These are matched after locale extraction (e.g. /en/login → /login).
const PUBLIC_PATHS = ["/", "/login", "/register"];

/**
 * Determines if the current pathname matches a public route.
 * Supports locale-prefixed paths like /en/login or /es/register.
 * Extracts the subpath (e.g. "/login") for comparison against PUBLIC_PATHS.
 */
function isPublicPath(pathname: string): boolean {
  const localeAwareRegex = /^\/([a-z]{2}(?:-[A-Z]{2})?)?(\/.*)?$/;
  const match = pathname.match(localeAwareRegex);
  const subPath = match?.[2] || "/";
  return PUBLIC_PATHS.includes(subPath);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public paths without authentication
  if (isPublicPath(pathname)) {
    return createMiddleware(routing)(request);
  }

  // Attempt to retrieve the session token from cookies.
  // `secureCookie: true` ensures compatibility with HTTPS-only environments like Vercel.
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: true,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  // Development-only logging for debugging session token
  if (process.env.NODE_ENV !== "production") {
    console.log(
      "[Middleware] Session token cookie:",
      request.cookies.get("next-auth.session-token"),
    );
    console.log("[Middleware] Decoded token:", token);
  }
  // console.log("Cookies:", request.cookies.getAll());
  // console.log("AUTH_SECRET:", process.env.AUTH_SECRET);
  const isAuth = !!token;

  if (!isAuth) {
    // Redirect unauthenticated users to locale-aware login page
    const locale = pathname.split("/")[1] ?? routing.defaultLocale;
    const redirectUrl = new URL(`/${locale}/login`, request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return Response.redirect(redirectUrl);
  }

  // Apply next-intl middleware for locale routing
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    // Match all routes except:
    // - API endpoints (`/api`, `/trpc`)
    // - Static assets (`/_next`, `/_vercel`, `favicon.ico`)
    // - Any file-like paths (e.g. `.svg`, `.js`)
    "/((?!api|_next|_vercel|static|favicon.ico).*)",

    // Protect locale-aware routes that require authentication
    "/([\\w-]+)?/dashboard/:path*",
    "/([\\w-]+)?/room/:path*",
    "/([\\w-]+)?/users/:path*",
  ],
};
