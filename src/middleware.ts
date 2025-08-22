import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Paths that don't require authentication
const PUBLIC_PATHS = ["/", "/login", "/register"];

/**
 * Checks if the current pathname matches a public route.
 * Supports locale-prefixed paths like /en/login or /es/register.
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

  // Check for a valid session token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

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
    // Match all pathnames except:
    // - those starting with `/api`, `/trpc`, `/_next`, or `/_vercel`
    // - those containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|static|favicon.ico).*)",

    // Locale-aware protected routes
    "/([\\w-]+)?/dashboard/:path*",
    "/([\\w-]+)?/room/:path*",
    "/([\\w-]+)?/users/:path*",
  ],
};
