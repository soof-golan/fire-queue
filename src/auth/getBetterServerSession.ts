import { getServerSession } from "next-auth";
import { authOptions, sessionCallback } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";

// The user id was added in the next-auth session callback, we're just making typescript happy here
// See authOptions
export default async function getBetterServerSession(
  req?: GetServerSidePropsContext["req"],
  res?: GetServerSidePropsContext["res"]
): Promise<ReturnType<typeof sessionCallback> | null> {
  if (!req || !res) {
    return await getServerSession(authOptions);
  }
  return await getServerSession(req, res, authOptions);
}
