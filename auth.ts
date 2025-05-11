import NextAuth from "next-auth"
import Figma from "next-auth/providers/figma"
import { db } from "./lib/db"
import { accounts, sessions, users, verificationTokens } from "@/lib/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  providers: [
    Figma({
      clientId: process.env.FIGMA_CLIENT_ID,
      clientSecret: process.env.FIGMA_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.onboardingCompleted = user.onboardingCompleted 
      }
      return token
    },

    session({ session, token }) {
      session.user.id = token.id as string
      session.user.onboardingCompleted = token.onboardingCompleted as boolean
      return session
    },

    authorized: async ({ auth }) => {
      return !!auth
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
})

export default auth
