// api/index.ts
import { PrismaClient } from "@prisma/client";
import { server } from "./server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ContextType } from "./context";

const context: ContextType = {
  db: new PrismaClient(),
};

const port = process.env.PORT || 4000;
startStandaloneServer(server, {
  context: async () => context,
  listen: { port: Number(port), host: "0.0.0.0" },
}).then((e) => console.log(e));
