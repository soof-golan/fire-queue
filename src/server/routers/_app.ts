import {procedure, router} from '../trpc';
import {eventRouter} from "@/server/routers/event";

export const appRouter = router({
  // Create new event
  healthcheck: procedure.query(() => 'yay!'),
  event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
