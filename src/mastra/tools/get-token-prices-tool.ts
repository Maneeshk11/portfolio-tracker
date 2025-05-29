import { createTool } from "@mastra/core";
import axios from "axios";
import { z } from "zod";

export const getTokenPricesTool = createTool({
  id: "get-token-prices",
  description:
    "Get the prices of a list of tokens in USD. Input is an array of token symbols. Output is an object mapping each token symbol to its price in USD.",
  inputSchema: z.object({
    tokens: z.array(z.string()),
  }),
  outputSchema: z.object({
    prices: z.record(z.string(), z.number()),
  }),
  execute: async ({ context }) => {
    const prices = await getTokenPrices(context.tokens);
    return { prices };
  },
});

const getTokenPrices = async (currencySymbols: string[]) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?symbols=${currencySymbols.join(
      ","
    )}&vs_currencies=usd`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  // Return an object mapping each currency ID to its price
  const priceMap: Record<string, number> = {};
  Object.keys(data).forEach((key) => {
    priceMap[key] = data[key].usd;
  });
  return priceMap;
};

export default getTokenPrices;
