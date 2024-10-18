import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

enum Route {
  Signals = "/signals",
  AskAboutStock = "/ask-about-stock",
  Auth = "/auth",
  SignIn = "/auth/login",
  Home = "/",
  Admin = "/admin",
  AdminApi = "/api/admin",
  AccessTrackApi = "/api/operations/trackAccess",
  SignalsApi = "/api/signals",
}

const PROTECTED_ROUTES = [
  Route.Signals,
  Route.AskAboutStock,
  Route.Admin,
  Route.SignalsApi,
];

const LANGUAGES = ["en", "ar"];
const LANGUAGE_COOKIE_NAME = "preferred_language";

const ADMIN_API_ROUTES = ["/api/admin"];

export default withAuth(
  async function middleware(request: NextRequest) {
    try {
      const pathname = request.nextUrl.pathname;
      const isAuth = await getToken({ req: request });
      const userRole = isAuth?.role;

      // Handle admin API routes
      if (ADMIN_API_ROUTES.some((route) => pathname.startsWith(route))) {
        if (!isAuth || userRole !== "admin") {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.next();
      }

      // Extract the language from the URL (assumes the language comes first in the path)
      const langPrefix = pathname.split("/")[1];

      // Check if the path starts with a supported language
      if (!pathname.startsWith("/api") && !pathname.startsWith("/admin")) {
        if (!LANGUAGES.includes(langPrefix)) {
          // If no language, redirect to default language (e.g., "en")

          const languageCookie = request.cookies.get(LANGUAGE_COOKIE_NAME);
          const preferredLanguage = languageCookie
            ? languageCookie.value
            : "ar";

          // Redirect to the preferred language
          const preferredLangUrl = new URL(
            `/${preferredLanguage}${pathname}`,
            request.url
          );
          return NextResponse.redirect(preferredLangUrl);
        }
      }

      const isAuthRoute = pathname.startsWith("/" + langPrefix + Route.Auth);
      const isProtected = PROTECTED_ROUTES.some(
        (route) =>
          pathname.startsWith("/" + langPrefix + route) ||
          pathname.startsWith(route)
      );
      const isAdminRoute = pathname.startsWith(Route.Admin);

      if (isAuthRoute && isAuth) {
        return NextResponse.redirect(
          new URL("/" + langPrefix + Route.Home, request.url)
        );
      }

      if (!isAuth && isProtected) {
        // Allow access to trackAccess API route
        if (pathname === Route.AccessTrackApi) {
          return NextResponse.next();
        }
        let lang = langPrefix;
        if (langPrefix === "admin") {
          lang = "ar";
        }
        const loginUrl = new URL("/" + lang + Route.SignIn, request.url);
        loginUrl.searchParams.set(
          "message",
          `${
            langPrefix === "ar"
              ? "يرجى تسجيل الدخول للوصول إلى هذه الصفحة."
              : "Please log in to access this page"
          }`
        );
        return NextResponse.redirect(loginUrl);
      }
      if (isAdminRoute && (!isAuth || userRole !== "admin")) {
        return NextResponse.redirect(new URL("/en" + Route.Home, request.url));
      }
      if (isAdminRoute && isAuth && userRole === "admin") {
        return NextResponse.next();
      }
      if (
        (isAdminRoute || pathname.startsWith(Route.AdminApi)) &&
        (!isAuth || userRole !== "admin")
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (
        pathname.startsWith("/" + langPrefix + "/ask-about-stock/") &&
        isAuth
      ) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/operations/trackAccess`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid: isAuth.id }),
          }
        );

        if (res.status === 403) {
          return NextResponse.redirect(
            new URL("/" + langPrefix + "/access-limit-reached", request.url)
          );
        }
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next|api|static|public|.*\\..*).*)", // Match all routes except those that begin with `_next`, `api`, or serve static files
    "/api/:path*", // Explicitly include API routes for middleware processing
    "/admin/:path*",
  ],
};
