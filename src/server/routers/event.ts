import {z} from 'zod';
import {procedure, router} from '../trpc';
import {Prisma} from '@prisma/client';
import prisma from "@/prismaClient";
import moment from "moment";
import {TRPCError} from "@trpc/server";

const EventValidator = Prisma.validator<Prisma.BurnerEventSelect>()({
  id: true,
  name: true,
  description: true,
  date: true
});

export const eventRouter = router({
  // Create new event
  create: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }))
    .mutation(async ({input, ctx}) => {
      const session = await ctx.session;
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: session?.user?.id
        },
      }).catch(() => {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create an event',
        })
      });

      return await prisma.burnerEvent.create({
        data: {
          date: moment().add(1, 'year').toDate(),
          description: input.description,
          name: input.name,
          ownerId: user.id,
        },
        select: EventValidator,
      }).catch(() => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'There was an error creating your event',
        })
      });
    }),
});

// export type definition of API
export type EventRouter = typeof eventRouter;
