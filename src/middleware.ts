import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define public paths that don't require authentication
const PUBLIC_PATHS = ["/", "/login", "/register"];

function isPublicPath(pathname: string) {
  // Extract subpath from locale-aware routes like /en/login or /es/register
  const localeAwareRegex = /^\/([a-z]{2}(?:-[A-Z]{2})?)?(\/.*)?$/;
  const match = pathname.match(localeAwareRegex);
  const subPath = match?.[2] || "/"; // Use match[2] to get the actual subpath

  // Check if the subpath is in the list of public paths
  return PUBLIC_PATHS.includes(subPath);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip authenticaion for public paths
  if (isPublicPath(pathname)) {
    return createMiddleware(routing)(request);
  }

  // Retrive session token form cookies
  // const token = await getToken({ req: request });
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isAuth = !!token;

  if (!isAuth) {
    // Redirect unauthenticaed users to locale-aware login page
    // Preserve original destination using callbackUrl
    const locale = pathname.split("/")[1]; // e.g. 'en'
    const redirectUrl = new URL(`/${locale}/login`, request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    // return Response.redirect(new URL("/login", request.url));
    return Response.redirect(redirectUrl);
  }

  // Run next-intl middleware for locale handling
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - those starting with `/api`, `/trpc`, `/_next`, or `/_vercel`
    // - those containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|static|favicon.ico).*)",

    // Match all pathnames within `{/:locale}/users`
    "/([\\w-]+)?/users/(.+)",

    "/dashboard/:path*",
    "/room/:path*",
  ],
};
