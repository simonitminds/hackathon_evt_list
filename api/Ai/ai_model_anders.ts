import { OpenAI } from "openai";

import { OpenAI as langchainOpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Prisma, PrismaClient } from "@prisma/client";

type DELETE = {
  _count: Prisma.EventCountAggregateOutputType | null;
  _avg: Prisma.EventAvgAggregateOutputType | null;
  _sum: Prisma.EventSumAggregateOutputType | null;
  _min: Prisma.EventMinAggregateOutputType | null;
  _max: Prisma.EventMaxAggregateOutputType | null;
};
type Event = Pick<
  Prisma.EventGroupByOutputType,
  | "Description"
  | "Title"
  | "keywords"
  | "ai_image_style_tags"
  | "ai_description"
>;

export class AIGenerationService {
  private language: string;

  private openAI: OpenAI;

  private langchain_OpenAI: langchainOpenAI;

  constructor(language: string = "danish", key: string = "") {
    this.openAI = new OpenAI({
      apiKey: key,
    });

    this.langchain_OpenAI = new langchainOpenAI({
      temperature: 0.5,
      openAIApiKey: key,
    });

    this.language = language;
  }

  private generateDALLEImageURLFromPrompt(
    prompt: string
  ): Promise<string | undefined> {
    let URLPromise = this.openAI.images
      .generate({
        prompt: prompt,
        n: 1,
        response_format: "url", //'b64_json'
        size: "1024x1024",
      })
      .then((data) => {
        return data.data[0].url;
      });

    return URLPromise;
  }

  private createConcisePromptFromEvent(
    keywords: string[],
    ai_image_keywords: string[]
  ): string {
    return keywords.concat(ai_image_keywords).join(" ");
  }

  public async generateImageURLBasedOnConcisePrompt(
    event: Event
  ): Promise<string | undefined> {
    return this.generateDALLEImageURLFromPrompt(
      this.createConcisePromptFromEvent(
        event.keywords,
        event.ai_image_style_tags
      )
    );
  }

  private generateHumanlikeImagePromptFromEvent(event: Event): Promise<string> {
    const imagePromptPromptList = `Keywords: ${event.keywords.join(
      ", "
    )}. Style: ${event.ai_image_style_tags.join(", ")}"`;
    const humanLanguagePromptPrompt =
      "Generate an image prompt for the following: " + imagePromptPromptList;

    return this.langchain_OpenAI.call(humanLanguagePromptPrompt);
  }

  public generateImageURLBasedOnHumanlikePrompt(
    event: Event
  ): Promise<string | undefined> {
    return this.generateHumanlikeImagePromptFromEvent(event).then(
      (generatedImagePrompt) => {
        return this.generateDALLEImageURLFromPrompt(generatedImagePrompt);
      }
    );
  }

  public generateEventDescriptionFromEvent(event: Event): Promise<string> {
    return this.langchain_OpenAI.call(
      `Generate a 5-10 sentence event description in ${
        this.language
      } based on the title '${
        event.Title
      }' and the following keywords: ${event.keywords.join(", ")}`
    );
  }

  public async generateEventSummary(event: Event): Promise<string> {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 250 });

    const docs = await textSplitter.createDocuments([
      event.ai_description || event.Description,
    ]);

    const summerizeChain = loadSummarizationChain(this.langchain_OpenAI, {
      type: "map_reduce",
    });
    const summary = await summerizeChain.call({
      input_documents: docs,
    });

    return summary.text;
  }

  public async generateHypeMessageForEvent(event: Event): Promise<string> {
    let summary = await this.generateEventSummary(event);

    const template = `Lav en kort og sej påmindelse så folk tilmelder sig til denne kommende begivenhed: ${summary}`;
    return this.langchain_OpenAI.call(template);
  }
}
