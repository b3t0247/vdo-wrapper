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

/**
 * Type guard to ensure a string is a valid locale.
 * Prevents TypeScript errors when comparing cookie or browser values.
 */
function isValidLocale(
  locale: string,
): locale is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(locale);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * Locale persistence enhancement:
   * If the current pathname does not include a locale prefix (e.g. /en or /es),
   * attempt to read the user's preferred locale from cookies.
   * If not found, fall back to browser language via Accept-Language header.
   * Redirect to the locale-prefixed version of the current path.
   */
  const localePrefixRegex = /^\/(en|es)(\/|$)/;
  const hasLocalePrefix = localePrefixRegex.test(pathname);

  if (!hasLocalePrefix) {
    const cookieLocale = request.cookies.get("preferredLocale")?.value;
    const browserLocale = request.headers
      .get("accept-language")
      ?.split(",")[0]
      ?.split("-")[0]
      ?.toLowerCase();

    let resolvedLocale: (typeof routing.locales)[number] =
      routing.defaultLocale;

    if (cookieLocale && isValidLocale(cookieLocale)) {
      resolvedLocale = cookieLocale;
    } else if (browserLocale && isValidLocale(browserLocale)) {
      resolvedLocale = browserLocale;
    }

    const redirectUrl = new URL(`/${resolvedLocale}${pathname}`, request.url);
    return Response.redirect(redirectUrl);
  }

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
  // if (process.env.NODE_ENV !== "production") {
  //   console.log(
  //     "[Middleware] Session token cookie:",
  //     request.cookies.get("next-auth.session-token"),
  //   );
  //   console.log("[Middleware] Decoded token:", token);
  // }
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
