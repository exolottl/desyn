import { auth } from "@/auth"
import { db } from "./lib/db"
import { eq } from "drizzle-orm"
import { users } from "./lib/schema"

export default auth(async (req) => {
 if (!req.auth && req.nextUrl.pathname !== "/login") {
   const newUrl = new URL("/login", req.nextUrl.origin)
   return Response.redirect(newUrl)
 }
 
 if (!req.auth) return

 const userId = req.auth.user.id
 
 const user = await db.select({
   onboardingCompleted: users.onboardingCompleted
 })
 .from(users)
 .where(eq(users.id, userId))
 .get()
 
  console.log(user)
 if (!user?.onboardingCompleted) {
   if (req.nextUrl.pathname !== "/onboarding") {
     const newUrl = new URL("/onboarding", req.nextUrl.origin)
     return Response.redirect(newUrl)
   }
 }
})

export const config = {
 matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
