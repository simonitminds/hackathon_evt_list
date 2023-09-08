import { Event, Location, User } from 'nexus-prisma'

import { list, objectType } from 'nexus'



export const location = objectType({
  name: Location.$name,
  description: "Holds all relevant information about a location",
  definition(t) {
    t.field(Location.id);
    t.field(Location.office);
  }
})

export const user = objectType({
  name: "User",
  description: "Holds all relevant information about a user",
  definition(t) {
    t.field(User.id);
  }
})


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
    t.field("users", {
      type: list("User"),
      resolve: async (parent, args, ctx) => {
        const users = await ctx.db.userOnEvents.findMany({
          where: { user: { id: parent.id } }, select: { user: true }
        })

        return users.map(u => u.user)
      }
    });
  }
})
