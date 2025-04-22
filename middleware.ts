import { type NextRequest, NextResponse } from 'next/server';

import { defaultLocale, locales } from '@/shared/lib/i18n';
import { updateSession } from '@/shared/lib/supabaseMiddleware';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const getLocale = (request: NextRequest): string => {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const localeList = [...locales];

  return match(languages, localeList, defaultLocale);
};

// Check if the path is a route handler (ends with /route)
const isRouteHandler = (pathname: string): boolean => {
  // Remove query parameters for checking
  const path = pathname.split('?')[0];
  // Check if it's an API route or ends with a segment that would match a route.ts file
  return path.includes('/api/') || path.split('/').pop() === 'posts';
};

export async function middleware(request: NextRequest) {
  await updateSession(request);

  const { pathname } = request.nextUrl;

  // Skip locale redirect for route handlers
  if (isRouteHandler(pathname)) {
    return NextResponse.next();
  }

  // Check if the pathname contains restricted routes
  const restrictedRoutes = ['/user', '/error-handling'];
  const isRestrictedRoute = restrictedRoutes.some((route) => pathname.includes(route));

  if (isRestrictedRoute) {
    // Redirect to home page
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
