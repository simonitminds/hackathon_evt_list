import { Location } from "nexus-prisma";
import {
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

export const location = objectType({
  name: Location.$name,
  description: "Holds all relevant information about a location",
  definition(t) {
    t.field(Location.id);
    t.field(Location.office);
  },
});

export const locationQierues = extendType({
  type: "Query",
  definition(t) {
    t.field("locations", {
      type: list("Location"),
      resolve: async (parent, args, ctx) => {
        return ctx.db.location.findMany();
      },
    });
    t.field("location", {
      type: "Location",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (parent, { id }, ctx) => {
        return ctx.db.location.findFirst({ where: { id: id } });
      },
    });
  },
});

export const locationMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("LocationCreate", {
      type: "Location",
      args: {
        office: nonNull(stringArg()),
      },
      resolve: async (parent, { office }, ctx) => {
        return ctx.db.location.create({
          data: {
            office: office,
          },
        });
      },
    });
    t.field("LocationDelete", {
      type: "Location",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (parent, { id }, ctx) => {
        return ctx.db.location.delete({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
