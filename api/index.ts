// api/index.ts
import { PrismaClient } from "@prisma/client";
import { server } from "./server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ContextType } from "./context";
import { AIGenerationService } from "./Ai/ai_model_anders";

const db = new PrismaClient();
const api_key = process.env.OPEN_AI_API_KEY;
if (!api_key) throw new Error("No API key found for OpenAI");

const context: ContextType = {
  db,
  ai_client: new AIGenerationService("danish", api_key),
};

const port = process.env.PORT || 4000;
startStandaloneServer(server, {
  context: async () => context,
  listen: { port: Number(port), host: "0.0.0.0" },
}).then((e) => console.log(e));
