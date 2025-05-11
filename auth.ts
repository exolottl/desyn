import NextAuth from "next-auth"
import Figma from "next-auth/providers/figma"
import { db } from "./lib/db"
import { accounts, sessions, users, verificationTokens } from "@/lib/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Figma],
})
