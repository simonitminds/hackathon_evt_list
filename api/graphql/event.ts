import { Event } from "nexus-prisma";
import {
  objectType,
  list,
  extendType,
  intArg,
  nonNull,
  inputObjectType,
} from "nexus";

export const event = objectType({
  name: Event.$name,
  description: "Holds all relevant information about an event",
  definition(t) {
    t.field(Event.id);
    t.field(Event.Description);
    t.field(Event.end);
    t.field(Event.start);
    t.field(Event.Description);
    t.field(Event.Title);
    t.field(Event.location);
    t.field(Event.keywords);
    t.field(Event.ai_image_style_tags);
    t.field("users", {
      type: list("User"),
      resolve: async (parent, args, ctx) => {
        const users = await ctx.db.userOnEvents.findMany({
          where: { user: { id: parent.id } },
          select: { user: true },
        });

        return users.map((u) => u.user);
      },
    });
  },
});

// create event args
const createEventArgs = inputObjectType({
  name: "createEventArgs",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.string("start");
    t.nonNull.string("end");
    t.int("location");
    t.nonNull.string("office");
    t.nonNull.list.nonNull.string("keywords");
    t.nonNull.list.nonNull.string("ai_image_keywords");
  },
});

export const queryies = extendType({
  type: "Query",
  definition(t) {
    // get all events
    t.field("events", {
      type: list("Event"),
      resolve: async (parent, args, ctx) => {
        return ctx.db.event.findMany();
      },
    });
    // get event by id
    t.field("event", {
      type: "Event",
      args: { id: nonNull(intArg()) },
      resolve: async (parent, { id }, ctx) => {
        return ctx.db.event.findFirst({
          where: { id },
        });
      },
    });
  },
});

export const mutations = extendType({
  type: "Mutation",
  definition(t) {
    // Create a new event
    t.field("createEvent", {
      type: "Event",
      args: { arg: nonNull(createEventArgs) },
      resolve: async (parent, { arg }, ctx) => {
        return ctx.db.event.create({
          data: {
            Title: arg.title,
            Description: arg.description,
            start: new Date(arg.start),
            end: new Date(arg.end),
            office: arg.office,
            ai_image_style_tags: { set: arg.ai_image_keywords },
            keywords: { set: arg.keywords },
          },
        });
      },
    });

    // update an event
    t.field("updateEvent", {
      type: "Event",
      args: {
        id: nonNull(intArg()),
        data: nonNull(createEventArgs),
      },
      resolve: async (parent, { id, data }, ctx) => {
        return ctx.db.event.update({
          where: { id },
          data: {
            Title: data.title,
            Description: data.description,

            start: new Date(data.start),
            end: new Date(data.end),

            office: data.office,
          },
        });
      },
    });
    // delete an event
    t.field("deleteEvent", {
      type: "Event",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (parent, { id }, ctx) => {
        return ctx.db.event.delete({
          where: { id },
        });
      },
    });
  },
});
