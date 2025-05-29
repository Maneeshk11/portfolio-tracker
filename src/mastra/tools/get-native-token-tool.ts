import { getConfig } from "@/lib/configs/wagmi";
import { Asset } from "@/lib/types";
import { createTool } from "@mastra/core";
import { formatUnits } from "viem";
import { getBalance } from "wagmi/actions";
import { z } from "zod";

export const getNativeTokenTool = createTool({
  id: "get-native-token",
  description: "Get native token (eth) for a wallet address and chain id",
  inputSchema: z.object({
    walletAddress: z
      .string()
      .describe("The wallet address to get native token for"),
    chainId: z.string().describe("The chainId to get tokens for"),
  }),
  outputSchema: z.object({
    token: z.custom<Asset>(),
  }),
  execute: async ({ context }) => {
    const tokens = await getNativeToken(
      context.walletAddress,
      Number(context.chainId)
    );
    return { token: tokens as unknown as Asset };
  },
});

const getNativeToken = async (walletAddress: string, chainId: number) => {
  const nativeEth = await getBalance(getConfig(), {
    address: walletAddress as `0x${string}`,
    chainId: chainId as 1 | 11155111,
  });
  return {
    address: "0x0000000000000000000000000000000000000000",
    name: "Ether",
    symbol: nativeEth.symbol,
    amount: formatUnits(nativeEth.value, nativeEth.decimals),
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  };
};
