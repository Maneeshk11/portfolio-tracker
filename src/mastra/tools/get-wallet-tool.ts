import { createTool } from "@mastra/core/tools";

import { z } from "zod";

export const getWalletTool = createTool({
  id: "get-wallet",
  description: "Get the wallet address and chainId for the current wallet",
  inputSchema: z.object({}),
  outputSchema: z.object({
    walletAddress: z
      .string()
      .describe("The wallet address to get the wallet for"),
    chainId: z.string().describe("The chainId for the current wallet"),
  }),
  execute: async ({ runtimeContext }) => {
    return {
      walletAddress: runtimeContext.get("address") as `0x${string}`,
      chainId: runtimeContext.get("chainId") as string,
    };
  },
});
