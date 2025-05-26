import { openai } from "@ai-sdk/openai";
import { AlchemySettings, Network } from "alchemy-sdk";
import { streamText, tool } from "ai";
import { Alchemy } from "alchemy-sdk";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, address, chainId } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      getTokens: tool({
        description: `Get the tokens for a given wallet address '${address}' and chainId '${chainId}'. Only return the names of the tokens as a list, and nothing else.`,
        parameters: z.object({
          walletAddress: z.string(),
          chainIdTool: z.number(),
        }),
        execute: async ({ walletAddress, chainIdTool }) => {
          try {
            const assets = await getTokens(
              String(walletAddress),
              Number(chainIdTool)
            );
            return { tokens: assets };
          } catch (error) {
            console.error("Error fetching tokens:", error);
            return { tokens: [], error: "Failed to fetch tokens" };
          }
        },
      }),
      answerQuestion: tool({
        description: `Answer a question about the given tokens or wallet address '${address}' and chainId '${chainId}'. Only return the answer, and nothing else.`,
        parameters: z.object({
          tokens: z.array(z.string()),
        }),
        execute: async ({ tokens }) => {
          return { answer: "This is a test answer" + tokens.join(", ") };
        },
      }),
    },
    maxSteps: 3,
    system: `You are a helpful assistant that can answer questions about the wallet. You can use the getTokens tool to get the tokens for a given wallet address '${address}' and chainId '${chainId}'. You can also use the answerQuestion tool to answer questions about the given tokens. You can only use the answerQuestion tool if you have the tokens for the given wallet address. You can only use the getTokens tool if you have the wallet address for the given wallet address.`,
  });

  return result.toDataStreamResponse();
}

const networkMap: Record<number, Network> = {
  1: Network.ETH_MAINNET,
  11155111: Network.ETH_SEPOLIA,
};

const getTokens = async (walletAddress: string, chainId: number) => {
  try {
    // Check if network exists
    if (!networkMap[chainId]) {
      console.error(`Network for chainId ${chainId} not supported`);
      return [];
    }

    // Check if API key exists
    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
      console.error("Alchemy API key is missing");
      return [];
    }

    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: networkMap[chainId],
      connectionInfoOverrides: {
        skipFetchSetup: true,
      },
    } as AlchemySettings;

    const alchemy = new Alchemy(config);
    const tokens = await alchemy.core.getTokensForOwner(walletAddress);

    return tokens.tokens.map((token) => token.name) as string[];
  } catch (error) {
    console.error("Error in getTokens:", error);
    return [];
  }
};
