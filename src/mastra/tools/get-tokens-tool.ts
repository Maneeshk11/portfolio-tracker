import { createTool } from "@mastra/core/tools";
import { AlchemySettings } from "alchemy-sdk";
import { Alchemy } from "alchemy-sdk";
import { Network } from "alchemy-sdk";
import { z } from "zod";

export const getTokensTool = createTool({
  id: "get-tokens",
  description: "Get tokens for a wallet address and chain id",
  inputSchema: z.object({
    walletAddress: z.string().describe("The wallet address to get tokens for"),
    chainId: z.string().describe("The chainId to get tokens for"),
  }),
  outputSchema: z.object({
    tokens: z.array(z.string()).describe("The tokens for the wallet address"),
  }),
  execute: async ({ context }) => {
    const tokens = await getTokens(
      context.walletAddress,
      Number(context.chainId)
    );
    return { tokens };
  },
});

function getNetwork(chainId: number) {
  switch (chainId) {
    case 1:
      return Network.ETH_MAINNET;
    case 11155111:
      return Network.ETH_SEPOLIA;
  }
}

const getTokens = async (walletAddress: string, chainId: number) => {
  try {
    // Check if network exists
    if (!getNetwork(chainId)) {
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
      network: getNetwork(chainId),
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
