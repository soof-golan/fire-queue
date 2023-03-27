import { initTRPC } from '@trpc/server';
import * as trpcNext from "@trpc/server/adapters/next";
import getBetterServerSession from "@/auth/getBetterServerSession";

// export API handler
// @see https://trpc.io/docs/api-handler
export function createContext({req, res}: trpcNext.CreateNextContextOptions) {
  const session = getBetterServerSession(req, res);
  return {
    session,
  }
}

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createContext>().create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
