import { Location, User } from "nexus-prisma";

import { objectType } from "nexus";
export const user = objectType({
  name: "User",
  description: "Holds all relevant information about a user",
  definition(t) {
    t.field(User.id);
  },
});
