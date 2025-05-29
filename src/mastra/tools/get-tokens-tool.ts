import { createTool } from "@mastra/core/tools";
import { Alchemy } from "alchemy-sdk";
import { Network, AlchemySettings } from "alchemy-sdk";
import { formatUnits } from "viem";
import { z } from "zod";
import { Asset } from "@/lib/types";

export const getTokensTool = createTool({
  id: "get-tokens",
  description: "Get tokens for a wallet address and chain id",
  outputSchema: z.object({
    tokens: z.array(z.custom<Asset>()),
  }),
  execute: async ({ runtimeContext }) => {
    const tokens = await getTokens(
      runtimeContext.get("address"),
      runtimeContext.get("chainId")
    );
    return { tokens: tokens as unknown as Asset[] };
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

    return tokens.tokens.map(
      (token) =>
        ({
          address: token.contractAddress as `0x${string}`,
          name: token.name,
          symbol: token.symbol,
          amount: formatUnits(
            BigInt(token.rawBalance ?? 0),
            Number(token.decimals)
          ),
          image: token.logo,
        } as Asset)
    ) as Asset[];
  } catch (error) {
    console.error("Error in getTokens:", error);
    return [];
  }
};
