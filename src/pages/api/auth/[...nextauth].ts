import NextAuth, {AuthOptions} from "next-auth"
import EmailProvider from "next-auth/providers/email"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "@/prismaClient";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  callbacks: {
    session: async ({session, user}) => {
      if (session?.user && user) {
        // This add session.user.id
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id
          }
        }
      }
      return session
    },
  }
};

export default NextAuth(authOptions)


