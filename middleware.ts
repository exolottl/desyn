import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const userId = req.auth?.user.id;

  if (!userId && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const user = await db
    .selectDistinct({
      onboardingCompleted: users.onboardingCompleted,
    })
    .from(users)
    .where(eq(users.id, userId as string))
    .limit(1);

  if (!user || user.length === 0) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const { onboardingCompleted } = user[0];

  if (!onboardingCompleted && req.nextUrl.pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

