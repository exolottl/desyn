import { auth } from "@/auth"

export default auth(async (req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname !== "/login") {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(loginUrl);
    }
  }

  if (req.auth && !req.auth.user.onboardingCompleted) {
    if (req.nextUrl.pathname !== "/onboarding") {
      const onboardingUrl = new URL("/onboarding", req.nextUrl.origin);
      return Response.redirect(onboardingUrl);
    }
  }
  
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], 
};

