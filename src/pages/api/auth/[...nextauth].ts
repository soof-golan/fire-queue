import NextAuth, { AuthOptions, Session, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prismaClient";
import _ from "lodash";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

type SessionCallbackOptions = {
  session: Session;
  user: User | AdapterUser;
  token: JWT;
};

type UserWithId = Session["user"] & { id: string };

interface SessionWithUserId extends Session {
  user: UserWithId;
}

const a = 112;

export function sessionCallback({
  session,
  user,
}: SessionCallbackOptions): SessionWithUserId {
  if (session?.user && user) {
    return _.merge({}, session, { user: { id: user.id } });
  }
  return session as SessionWithUserId;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: sessionCallback,
  },
};

export default NextAuth(authOptions);
