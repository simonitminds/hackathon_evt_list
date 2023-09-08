import { Location, User } from "nexus-prisma";

import { objectType } from "nexus";

export const location = objectType({
  name: Location.$name,
  description: "Holds all relevant information about a location",
  definition(t) {
    t.field(Location.id);
    t.field(Location.office);
  },
});

export const user = objectType({
  name: "User",
  description: "Holds all relevant information about a user",
  definition(t) {
    t.field(User.id);
  },
});
