import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {GetServerSidePropsContext} from "next";

type SessionWithUser = Awaited<ReturnType<typeof getServerSession>> & {
  user: {
    id?: string
  }
}

// The user id was added in the next-auth session callback, we're just making typescript happy here
// See authOptions
export default async function getBetterServerSession(req?: GetServerSidePropsContext["req"], res?: GetServerSidePropsContext["res"]): Promise<SessionWithUser> {
  if (!req || !res) {
    return await getServerSession(authOptions) as SessionWithUser
  }
  return await getServerSession(req, res, authOptions) as SessionWithUser
}
