import { Location, User } from "nexus-prisma";

import {
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
export const user = objectType({
  name: "User",
  description: "Holds all relevant information about a user",
  definition(t) {
    t.field(User.id);
  },
});

export const userMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("UserCreate", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        name: stringArg(),
      },
      resolve: async (parent, { email, name }, ctx) => {
        return ctx.db.user.create({
          data: {
            email: email,
            name: name,
          },
        });
      },
    });
    t.field("EventJoin", {
      type: "Event",
      args: {
        eventId: nonNull(intArg()),
        userId: nonNull(intArg()),
      },
      resolve: async (parent, { eventId, userId }, ctx) => {
        const user_onEvent = await ctx.db.userOnEvents.create({
          data: {
            eventId: eventId,
            userId: userId,
          },
          include: {
            event: true,
          },
        });
        return user_onEvent.event;
      },
    });
    t.field("EventLeave", {
      type: "Event",
      args: {
        eventId: nonNull(intArg()),
        userId: nonNull(intArg()),
      },
      resolve: async (parent, { eventId, userId }, ctx) => {
        const user_onEvent = await ctx.db.userOnEvents.delete({
          where: {
            eventId_userId: {
              eventId: eventId,
              userId: userId,
            },
          },
          include: {
            event: true,
          },
        });
        return user_onEvent.event;
      },
    });
  },
});

export const userQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("users", {
      type: nonNull(list(nonNull("User"))),
      resolve: async (parent, args, ctx) => {
        return ctx.db.user.findMany();
      },
    });
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (parent, { id }, ctx) => {
        return ctx.db.user.findFirst({ where: { id: id } });
      },
    });
  },
});
