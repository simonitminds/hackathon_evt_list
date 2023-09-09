import { PrismaClient } from "@prisma/client";
import { AIGenerationService } from "./Ai/ai_model_anders";

export interface ContextType {
  db: PrismaClient;
  ai_client: AIGenerationService;
}
