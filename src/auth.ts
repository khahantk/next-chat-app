import NextAuth, { Session, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/db"
import { fetchUserByCredentials } from "@/db/queries/user"
import { authConfig } from "./auth.config"

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null
        }
        let user: User | null = null
        try {
          user= await fetchUserByCredentials(credentials.email as string, credentials.password as string )
          if (!user) {
            throw new Error("Invalid credentials.")
          }
          console.log({ user });
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
          }
        } catch (error: unknown) {
          console.log(error);
          
        }
        return null
      },
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // If there is an update, set the user name
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role
      }
      // Handle session updates
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }
      return token;
    },
  },
})
