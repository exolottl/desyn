import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default auth(async (req) => {
  // Ensure the user is authenticated
  if (!req.auth) {
    // If not authenticated, redirect to login
    if (req.nextUrl.pathname !== "/login") {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(loginUrl);
    }
  }

  // Retrieve the session and user ID
  const session = await auth();
  const userId = session?.user.id;

  // If no session or no user ID, return unauthorized
  if (!userId) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  const user = await db.selectDistinct({
    onboardingCompleted: users.onboardingCompleted
  }).from(users).where(eq(users.id, userId)).limit(1);
  console.log(user)
  if (!user[0]) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  const onboardingCompleted = user[0].onboardingCompleted;

  if (!onboardingCompleted && req.nextUrl.pathname !== "/onboarding") {
    const onboardingUrl = new URL("/onboarding", req.nextUrl.origin);
    return Response.redirect(onboardingUrl);
  }

});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude static files and API routes
};

