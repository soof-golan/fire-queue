import "server-only";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

type SessionWithUser = Awaited<ReturnType<typeof getServerSession>> & {
  user: {
    id?: string
  }
}

// The user id was added in the next-auth session callback, we're just making typescript happy here
// See authOptions
export default async function getBetterServerSession(): Promise<SessionWithUser> {

  return await getServerSession(authOptions) as SessionWithUser
}
